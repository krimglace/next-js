import React, { useEffect, useState } from "react";

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import swal from 'sweetalert';
import { parse } from 'node-html-parser';
import { DOMParser } from 'DOMParser'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCircle, faArrowRight, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";


const LayananlandingResponsive = ({forlayananpulljson, forpullCekfaq, forpullCekfavorite}) => {

	const [showLayananLandingResponsive,setshowLayananLandingResponsive ] = useState([])
	const [showLayananPage,setshowLayananPage ] = useState([])
	const [showFaq,setshowFaq ] = useState()
	const [showTitle,setshowTitle ] = useState()
	const [showDescription, setshowDescription] = useState();
	const [showButton, setshowButton] = useState()
	const [showTitleButton, setshowTitleButton] = useState()
	const [showLayananFavorite, setshowLayananFavorite] = useState();

	const apiUrl2 = `${process.env.NEXT_PUBLIC_API_SITE}/api/layanan`;
	const bearer = `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
	
	let displayData, displayDataPage, displayDataFaq, displayTitle, displayButton, displayDataFavorite
	function pullJson(){
		displayData = forlayananpulljson.map(function(todo) {
			const imageUrl = `${process.env.NEXT_PUBLIC_API_SITE}/menu/`
			let htmlstring = todo.description;
			const parser = new DOMParser();
			const doc = parser.parseFromString(htmlstring, 'text/html');
			if(doc.documentElement == null){
					kalimat = todo.description
				} else {
					kalimat = doc.documentElement.textContent;
				}

			return(
				<button key={todo.id} onClick={() => {pullPage(todo.id);pullTitle(todo.id);pullButton(todo.id)}} className="btn-light btn ms-2 me-2 mt-1 mb-1">
			        <div className="button-carous p-3 mb-2 text-start">
		            <a >
		            {
		            	todo.icon === null || todo.icon === '' || todo.icon === undefined ? 
		            	<img src="/logo.png" alt="" className="col-lg-2 col-12 float-lg-start text-start me-3" /> : 
		            	<img src={imageUrl + todo.icon} alt={todo.icon} className="col-lg-2 col-12 float-lg-start text-start me-3" />
		            }
		            <br className="d-lg-none" />
		            <div className="float-lg-start col-lg-8 col-12 text-carous">
		            	<h6><strong>{todo.title}</strong></h6>
		                {kalimat.substr(0, 45)} . . .
		            </div>
		            <div className="clearfix" />
		            </a>
		            </div>
			      </button>
			)
		})
		// console.log(responseData.data)
		setshowLayananLandingResponsive(displayData)
	}
	
	function pullCekCarous(){
	    const carous = document.querySelector('#carousel-css');
	    const carousPrev = document.querySelectorAll('.wrapper i');

	    let isDragStart = false, prevPageX, prevScrollLeft;
	    let firstImageWidth = 298 + 10

	    carousPrev.forEach(icon => {
	      icon.addEventListener("click", () => {
	        carous.scrollLeft += icon.id == "left" ? -firstImageWidth : firstImageWidth;
	      })
	    })
	}
	function pullPage(parent){
		swal({
	        title: "Loading ...",
	        text: "Silahkan tunggu sebentar",
	       
	        timer: 1000,
	        
	      });
		var api = apiUrl2+"?parent="+parent+"&limit=4";
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
				let kalimat2
				const imageUrl = `${process.env.NEXT_PUBLIC_API_SITE}/menu/`
				let htmlstring2 = todo.description;	
				const parser2 = new DOMParser();
				const doc2 = parser2.parseFromString(htmlstring2, 'text/html');
				if(doc2.documentElement == null){
					kalimat2 = todo.description
				} else {
					kalimat2 = doc2.documentElement.textContent;
				}
				return(

					<div className="float-start col-lg-3 col-6" key={todo.id}>
		                <div className="h-88-card laycard rounded border m-1 m-lg-2 pb-2">
		                  <div className="text-center pt-3 pb-3 bg-info rounded-top">
		                  {
			            	todo.icon === null || todo.icon === '' || todo.icon === undefined ? 
			            	<img src="/logo.png" alt="" className="w-lg-100 w-25 m-4" /> : 
		                    <img src={`${process.env.NEXT_PUBLIC_API_SITE}/menu/${todo.icon}`}  className="w-lg-100 w-25 m-4" alt={todo.icon} />
			            }
		                  </div>
		                  <div className="me-2 ms-2 mt-1">
		                    <h5 className="text-blue mb-2 mt-1"><strong>{todo.title}</strong></h5>
		                    <p className="mb-4">{kalimat2.substr(0, 45)} . . .</p>
		                    <div className="link-des p-2">
		                    	<hr className="mb-lg-4 mb-md-4 mb-1" />
			                    <div className="float-start col-12 detail-pelayanan col-lg-5 mt-lg-3">
			                      <a href={`/layanan/detail?id=${todo.id}`} className="text-decoration-none">Lihat Detail</a>
			                    </div>
			                    <div className="float-end col-12 col-lg-7 mt-sm-2">
			                      <a href={todo.url} className="text-light link-kunjungi-pelayanan bg-blue rounded-pill btn">Kunjungi <FontAwesomeIcon className="arrow-kunjungi" icon={faArrowRight} /></a>
			                    </div>
			                    <div className="clearfix" />
			                </div>
		                  </div>
		                </div>
		            </div>
				)
			})
			setshowLayananPage(displayDataPage)
		})
	}
	function pullTitle(titleId){
		var apiTitle = apiUrl2+"/"+titleId;
		fetch(apiTitle, {
			method: "GET",
			headers: {
				'accept': 'application/json',
				'Authorization': bearer,
				'X-CSRF-TOKEN': ''
			}
		})
		.then(response => response.json())
		.then(responseDataTitle => {
				
				const layananTitle = responseDataTitle.data

			setshowTitle(layananTitle.title)
			setshowDescription(layananTitle.description)
		})
	}
	function pullButton(buttonId){
		var apiButton = apiUrl2+"/"+buttonId;
		fetch(apiButton, {
			method: "GET",
			headers: {
				'accept': 'application/json',
				'Authorization': bearer,
				'X-CSRF-TOKEN': ''
			}
		})
		.then(response => response.json())
		.then(responseDataButton => {
				
				const layananButton = responseDataButton.data

			setshowButton(layananButton.id)
			setshowTitleButton(layananButton.title)
		})
	}
	function pullFaq(){
		displayDataFaq = forpullCekfaq.map(function(todo) {
			return(
			<tr key={todo.id}>
                <th><FontAwesomeIcon className="mb-3 me-3 dots text-secondary me-lg-3 me-md-3" icon={faCircle} /></th>
                <td className="text-light me-2"><p>{todo.question}</p></td>
            </tr>
			)
		})

		setshowFaq(displayDataFaq)
	}
	function pullFavorit(){
		displayDataFavorite = forpullCekfavorite.map(function(todo) {
			let kalimat2
			const imageUrl = `${process.env.NEXT_PUBLIC_API_SITE}/menu/`
			let htmlstring2 = todo.description;	
			const parser2 = new DOMParser();
			const doc2 = parser2.parseFromString(htmlstring2, 'text/html');
			if(doc2.documentElement == null){
				kalimat2 = todo.description
			} else {
				kalimat2 = doc2.documentElement.textContent;
			}
			return(
				<div className="float-start col-lg-3 col-6" key={todo.id}>
	                <div className="h-88-card laycard rounded border m-1 m-lg-2 pb-2">
	                  <div className="text-center pt-3 pb-3 bg-info rounded-top">
	                   {
		            	todo.icon === null || todo.icon === '' || todo.icon === undefined ? 
		            	<img src="/logo.png" alt="" className="w-lg-100 w-25 m-4" /> : 
	                    <img src={imageUrl + todo.icon}  className="w-lg-100 w-25 m-4" alt="email 1.png" />
		            	}
	                  </div>
	                  <div className="me-2 ms-2 mt-1">
	                    <h5 className="text-blue mb-2 mt-1"><strong>{todo.title}</strong></h5>
	                    <p className="mb-4">{kalimat2.substr(0, 45)} . . .</p>
	                    <div className="link-des p-2">
	                    	<hr className="mb-lg-4 mb-md-4 mb-1" />
		                    <div className="float-start col-12 detail-pelayanan col-lg-5 mt-lg-3">
		                      <a href={`/layanan/detail?id=${todo.id}`} className="text-decoration-none">Lihat Detail</a>
		                    </div>
		                    <div className="float-end col-12 col-lg-7 mt-sm-2">
		                      <a href={todo.url} className="text-light link-kunjungi-pelayanan bg-blue rounded-pill btn">Kunjungi <FontAwesomeIcon className="arrow-kunjungi" icon={faArrowRight} /></a>
		                    </div>
		                    <div className="clearfix" />
		                </div>
	                  </div>
	                </div>
	            </div>
			)
		})
		setshowLayananFavorite(displayDataFavorite)
	}
	useEffect(() => {
		pullJson();
		pullCekCarous();
		pullPage(4);
		pullTitle(4);
		pullButton(4);
		pullFaq();
		pullFavorit();
	}, [])


	return(
		<div>
		<link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer" />

			<div className='body-carousel'>
	          <div className="wrapper">
	          <i id="left" className="fas fa-angle-left" />
	            <div className="carousel-css" id="carousel-css">
	              {showLayananLandingResponsive}
	            </div>
	          <i id="right" className="fas fa-angle-right" />
	          </div>
	        </div>
	    	<hr className="mt-5 mb-5" />
	    	<div className="card-layanan rounded shadow">
	          <div className="ps-lg-5 pe-lg-5 pb-lg-4 pt-lg-4 p-1">
	            <div>
		            <div>
						<h4 className="title-layanan-pemerintah"><strong>{showTitle}</strong></h4>
	            		<small className="title-layanan-pemerintah">{showDescription}</small>
					</div>
	              {showLayananPage}
	              
	              <div className="clearfix" />
	            </div>
	          </div>
	          <br />
	          <div className="text-center coverbuttonlayanan">
	            <Link href={`/layanan?id=${showButton}`} className="buttonlayanan btn btn-light btn-outline-primary rounded-pill mb-lg-5 mb-md-5 mb-3">Lihat Semua Layanan</Link>
	          </div>
	        </div>

	        <div className="bantuan p-4 mt-5 mb-5 pt-lg-5 pb-lg-5 pt-md-5 pb-md-3">
	          <div className="col-lg-7 col-md-7 float-end">
	            <div className="ms-lg-5 text-start">
	              <h3 className="text-light mb-lg-5">Butuh Bantuan ?</h3>
	              <table>
	                <tbody>
	                  {showFaq}
	                </tbody>
	              </table>
	              <Link href="/faq" className="rounded-pill mt-lg-4 btn btn-light text-primary"><b>Lihat pertanyaan lainnya ?</b></Link>
	            </div>
	            <br />

	          </div>
	          <div className="col-lg-5 col-md-5 float-end">
	            <div className="image-bantuan w-100 d-flex flex-column justify-content-center align-items-center">
	              <img src="/home/Group.png" className="w-75" />
	            </div>
	          </div>
	          <div className="clearfix" />
	        </div>

	        <div className="card-layanan">
	          <div className="ps-lg-5 pe-lg-5 pb-lg-4 pt-lg-4 p-1">
	            <h4 className="float-start col-6"><strong>Layanan yang sering dikunjungi</strong></h4>
	            <Link href="/alllayanan" className="text-layanan float-end col-6 text-end mt-1 text-secondary"><small><strong>Lihat Selengkapnya</strong></small></Link>
	            <div className="clearfix" />
	            <div>
	              {showLayananFavorite}
	              <div className="clearfix" />
	            </div>
	          </div>
	        </div>
	    </div>

	)

	
}
export default LayananlandingResponsive;
