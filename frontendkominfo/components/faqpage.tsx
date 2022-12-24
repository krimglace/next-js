import React, { useEffect, useState } from "react";

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'

import axios from 'axios'
import { parse } from 'node-html-parser';
import { DOMParser } from 'DOMParser'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import swal from 'sweetalert';

const bearer = `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
const Faqpage = ({showpullpage}) => {

	const [showFaqpage,setshowFaqpage ] = useState()
	const [showFaqLarge,setshowFaqLarge ] = useState()
	const [showFaqContent,setshowFaqContent ] = useState()
	const [showFaqTitle,setshowFaqTitle ] = useState()

	let displayData, displayDataLarge, displayDataPage, displayDataTitle
	function pullJson(){
		const uniqData = [...showpullpage.reduce((map, obj) => map.set(obj.category, obj), new Map()).values()]
				
		displayData = uniqData.map(function(todo) {
			return(
				<option key={todo.id} value={todo.category}>{todo.category}</option>
			)
		})
		setshowFaqpage(displayData)
	}
	function pullLarge(){
		swal({
	        title: "Loading ...",
	        text: "Silahkan tunggu sebentar",
	        timer: 1500,
	        
	    });
		const uniqData2 = [...showpullpage.reduce((map, obj) => map.set(obj.category, obj), new Map()).values()]
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
	}
	function clickFaq(value){
		document.querySelector(`#answer${value}`).classList.toggle('d-none')
	}
	function pullPage(category){
		swal({
        title: "Loading ...",
        text: "Silahkan tunggu sebentar",
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
					<div className="bg-gray p-3 qna mb-2 rounded" key={todo.id}>
						<div className="d-flex align-items-center">
							<div className="questions float-start col-lg-11 col-md-10 col-9">
								<strong>{todo.question}</strong>
							</div>
							<div onClick={() => clickFaq(todo.id)} className="float-end showanswer col-lg-1 col-md-2 col-3 text-end">
								<FontAwesomeIcon className="text-secondary qnaanswer" icon={faPlusCircle} />
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
	}
	function pullTitle(titleId){
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
	}
	useEffect(() => {
		pullJson();
		pullLarge();
		pullPage('Login')
		pullTitle('Login')
	}, [])

	return(
		<>
			<div className="mt-5 mb-5">
	 			<div className="d-lg-none d-md-none">
	 				<select
						className="form-control"
						onChange={(e) => {
							const selectedCategory = e.target.value;
							pullPage(selectedCategory);
							pullTitle(selectedCategory);
						}}>
						{showFaqpage}
					</select>
				</div>
				<div className="">
					<div className="sidefaq float-start col-3 bg-info">
						<div className="ps-3 pe-3 pb-4 pt-4">
							<h5><strong>Kategori Pertanyaan</strong></h5>
							{showFaqLarge}
						</div>
					</div>
					<div className="float-start col-lg-8 col-12 col-md-8 ms-md-4 ms-lg-4 mt-3">
						{showFaqTitle}
						{showFaqContent}
					</div>
					<div className="clearfix" />
				</div>
	 		</div>
		</>
	)

	
}
export default Faqpage;
