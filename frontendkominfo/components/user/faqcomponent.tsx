import React, { useEffect, useState } from "react";

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'

import axios from 'axios'
import { parse } from 'node-html-parser';
import { DOMParser } from 'DOMParser'
import {useForm} from 'react-hook-form';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faAngleRight, faSearch, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import swal from 'sweetalert';

const Faqcomponent = () => {

	const [showFaqpage,setshowFaqpage ] = useState()
	const [showFaqLarge,setshowFaqLarge ] = useState()
	const [showFaqContent,setshowFaqContent ] = useState()
	const [showFaqTitle,setshowFaqTitle ] = useState()

	const apiUrl = `${process.env.NEXT_PUBLIC_API_SITE}/api/faq?primary=1`;

	const bearer = `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
	let displayData, displayDataLarge, displayDataPage, displayDataTitle

	const { handleSubmit, register, formState: { errors } } = useForm();

	function pullJson(){
		fetch(apiUrl, {
			method: "GET",
			headers: {
				'accept': 'application/json',
				'Authorization': bearer,
				'X-CSRF-TOKEN': ''
			}
		})
		.then(response => response.json())
		.then(responseData => {
				const uniqData = [...responseData.data.reduce((map, obj) => map.set(obj.category, obj), new Map()).values()]
				// console.log(uniqData)
				displayData = uniqData.map(function(todo) {
				return(
					<option key={todo.id} value={todo.category} items={todo.id}>{todo.category}</option>
				)
			})
			setshowFaqpage(displayData)
		})
	}
	function pullPage(category, cari){
		console.log(cari)
		if(cari == '' || cari == undefined){
			swal({
				title: "Loading ...",
				text: "Silahkan tunggu sebentar",
				showSpinner: true,
				timer: 1500,
				
			});
			var api = `${process.env.NEXT_PUBLIC_API_SITE}/api/faq?category=`+category;
			fetch(api, {
				method: "GET",
				headers: {
					'accept': 'application/json',
					'Authorization': bearer,
					'X-CSRF-TOKEN': ''
				}
			})
			.then(response => response.json())
			.then(responseDataPage => {
				displayDataPage = responseDataPage.data.map(function(todo) {
					let htmlstring = todo.answer;
					const parser = new DOMParser();
					const doc = parser.parseFromString(htmlstring, 'text/html');
					let question = 'question'

					return(
						<div className="bg-white p-3 qna mb-2 border rounded border-dark" key={todo.id}>
							<div className="d-flex align-items-center">
								<div className="questions float-start col-lg-11 col-md-10 col-9">
									<strong>{todo.question}</strong>
								</div>
								<div className="float-end showanswer col-lg-1 col-md-2 col-3 text-end">
									<FontAwesomeIcon id={`plusfaq${todo.id}`} onClick={() => clickFaq(todo.id)} className="text-secondary qnaanswer" icon={faPlusCircle} />
									<FontAwesomeIcon id={`minusfaq${todo.id}`} onClick={() => clickCloseFaq(todo.id)} className="text-secondary qnaanswer d-none" icon={faCircleMinus} />
								</div>
								<div className="clearfix" />
							</div>
							<div id={`answer${todo.id}`} className="answer d-none mt-1">
								{doc.documentElement.textContent}
							</div>
			      		</div>
					)
				})
				setshowFaqContent(displayDataPage)
			})
		} else {
			swal({
				title: "Loading ...",
				text: "Silahkan tunggu sebentar",
				showSpinner: true,
				timer: 2000,
				
			});
			var api = `${process.env.NEXT_PUBLIC_API_SITE}/api/faq?search=`+cari;
			const datasearch = fetch(api, {
				method: "GET",
				headers: {
					'accept': 'application/json',
					'Authorization': bearer,
					'X-CSRF-TOKEN': ''
				}
			})
			.then(response => response.json())
			.then(responseDataPage => {
				if(responseDataPage.data.length > 0){
					displayDataPage = responseDataPage.data.map(function(todo) {
						let htmlstring = todo.answer;
						const parser = new DOMParser();
						const doc = parser.parseFromString(htmlstring, 'text/html');
						let question = 'question'

						return(
							<div className="bg-white p-3 qna mb-2 border rounded border-dark" key={todo.id}>
								<div className="d-flex align-items-center">
									<div className="questions float-start col-lg-11 col-md-10 col-9">
										<strong>{todo.question}</strong>
									</div>
									<div className="float-end showanswer col-lg-1 col-md-2 col-3 text-end">
										<FontAwesomeIcon id={`plusfaq${todo.id}`} onClick={() => clickFaq(todo.id)} className="text-secondary qnaanswer" icon={faPlusCircle} />
										<FontAwesomeIcon id={`minusfaq${todo.id}`} onClick={() => clickCloseFaq(todo.id)} className="text-secondary qnaanswer d-none" icon={faCircleMinus} />
									</div>
									<div className="clearfix" />
								</div>
								<div id={`answer${todo.id}`} className="answer d-none mt-1">
									{doc.documentElement.textContent}
								</div>
				      		</div>
						)
					})
				} else{
					swal({
				        title: "No Data",
				        text: "Data yang anda cari tidak ditemukan",
				        icon: "error",
				        timer: 3000,
				        
				      }).then(next => {
				        pullPage('Login', undefined)
				        pullTitle('Login', undefined)
				      });
				}
				setshowFaqContent(displayDataPage)
			})
		}
	}
	function clickFaq(value){
		document.querySelector(`#answer${value}`).classList.remove('d-none')
		document.querySelector(`#plusfaq${value}`).classList.add('d-none')
		document.querySelector(`#minusfaq${value}`).classList.remove('d-none')
	}
	function clickCloseFaq(value){
		document.querySelector(`#answer${value}`).classList.add('d-none')
		document.querySelector(`#plusfaq${value}`).classList.remove('d-none')
		document.querySelector(`#minusfaq${value}`).classList.add('d-none')	
	}
	function pullLarge(){
		swal({
	        title: "Loading ...",
	        text: "Silahkan tunggu sebentar",
	        showSpinner: true,
	        timer: 1500,
	        
	      });
		fetch(apiUrl, {
			method: "GET",
			headers: {
				'accept': 'application/json',
				'Authorization': bearer,
				'X-CSRF-TOKEN': ''
			}
		})
		.then(response => response.json())
		.then(responseDataLarge => {
			const uniqData2 = [...responseDataLarge.data.reduce((map, obj) => map.set(obj.category, obj), new Map()).values()]
				displayDataLarge = uniqData2.map(function(todo) {
				return(
					<div key={todo.id}>
						<button onClick={() => {pullPage(todo.category); pullTitle(todo.category)}} className="kategorifaq text-start btn btn-info text-primary btn-outline-light mb-2 p-2 form-control">
							{todo.category}
							<FontAwesomeIcon className="float-end icon mt-1" icon={faAngleRight} />
							<div className="clearfix" />
						</button>
					</div>
				)
			})
			setshowFaqLarge(displayDataLarge)
			// console.log(uniqData2)
		})
	}
	function pullTitle(titleId, cari){
		if(cari == '' || cari == undefined){
			var api = `${process.env.NEXT_PUBLIC_API_SITE}/api/faq?category=`+titleId;
			fetch(api, {
				method: "GET",
				headers: {
					'accept': 'application/json',
					'Authorization': bearer,
					'X-CSRF-TOKEN': ''
				}
			})
			.then(response => response.json())
			.then(responseDataTitle => {
				const uniqData3 = [...responseDataTitle.data.reduce((map, obj) => map.set(obj.category, obj), new Map()).values()]
				// console.log(uniqData3)
				displayDataTitle = uniqData3.map(function(todo) {
					return(
						<div key={todo.id} className="mb-3">
							<h5><strong>{todo.category}</strong></h5>
						</div>
					)
				})
					setshowFaqTitle(displayDataTitle)
			})
		} else {
			displayDataTitle = ''
			setshowFaqTitle(displayDataTitle)
		}
	}
	useEffect(() => {
		pullJson();
		pullPage('Login', undefined)
		pullLarge()
		pullTitle('Login', undefined)
	}, [])

	const onSubmit = async (event) => {
		pullPage('', event.searchticket)
		pullTitle('', event.searchticket)
	}
	return(
		<>
			<div className="mt-5 p-2">
				<div className="d-flex flex-column align-items-center justify-content-center mt-4">
					<h5><strong>Halo, ada yang bisa kami bantu?</strong></h5>
					<form className="col-lg-5 col-md-5 col-12 formdash" onSubmit={handleSubmit(onSubmit)}>
				        <div className="form-group mb-2">
				          <div className="input-group">
				            <input required
				              {...register("searchticket")}
				              name="searchticket"
				              type="search"
				              placeholder="Cari Halaman Bantuan Bantuan"
				              className="form-control"
				            />
				            <button type="submit" className="searchbuttondash input-group-text bg-light"><FontAwesomeIcon icon={faSearch} className="searchdash" /></button>
				          </div>
				        </div>
				    </form>
				</div>
				<div className="d-lg-none d-md-none">
				<br />
					<select
						className="form-control"
						onChange={(e) => {
							const selectedCategory = e.target.value;
							const cari = '';
							pullPage({selectedCategory, cari});
							pullTitle({selectedCategory, cari});
						}}>
						{showFaqpage}
					</select>
				</div>
				<div className="sidefaq faquser rounded me-3 float-start col-3 bg-info">
						<div className="ps-3 pe-3 pb-4 pt-4">
							<h5><strong>Kategori Pertanyaan</strong></h5>
							{showFaqLarge}
						</div>
					</div>
				<div className="">
					<div className="float-start col-lg-8 col-md-8 col-12 mt-3">
						{showFaqTitle}
						{showFaqContent}
					</div>
					<div className="clearfix" />
				</div>
			</div>
		</>

	)

	
}
export default Faqcomponent;
