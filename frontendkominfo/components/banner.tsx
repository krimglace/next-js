import React, { useEffect, useState } from "react";

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import axios from 'axios'
import { parse } from 'node-html-parser';
import { DOMParser } from 'DOMParser'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCircle, faArrowRight, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";


const Banner = ({forbanners}) => {

	const [showIndikator,setshowIndikator ] = useState([])
	const [showBanner,setshowBanner ] = useState([])

	let displayData

	function pullJson(){
		displayData = forbanners.map(function(todo) {
			let htmlstring = todo.description;
			const parser = new DOMParser();
			const doc = parser.parseFromString(htmlstring, 'text/html');
			const kalimat = doc.documentElement.textContent;
			// const batas = kalimat.substring(0, 20);
			const imageUrl = `${process.env.NEXT_PUBLIC_API_SITE}/announcement/`
			return(
				<div key={todo.id}>
					<div className="carousel-item banner" data-bs-interval="10000">
            <div className="carousel-caption">
              <h1 className="text-dark mt-md-4"><strong>{todo.title}</strong></h1>
              <p className="mt-lg-4 text-dark">
               {kalimat.substr(0, 200)} . . .
              </p>
              <Link href="#" className="button-laman-kominfo border-0 p-1 ps-md-3 pe-md-3 bg-primary rounded-pill pt-lg-1 pb-lg-2 pe-lg-3 ps-lg-3 pb-md-2 pt-md-2 text-light">
              	<img className="me-lg-3 me-2 mb-lg-1" alt="building.png" src="/home/Building.png" />Laman Kominfo
              </Link>
            </div>
            <img src={imageUrl + todo.image} className="d-block w-100" alt="/home/bg-banner.png" />
          </div>
          <Script id="bannerscript">
	        {
	          `
	            document.getElementsByClassName('banner')[0].classList.add('active')
	          `
	        }
			    </Script>
				</div>
			)
		});
		setshowBanner(displayData)
	}
	
	useEffect(() => {
		pullJson();
	}, [])


	return(
		<div>
		<div id="slider-top" className="carousel slide slider-top carousel-fade" data-bs-ride="true">

          <div className="carousel-inner">
            {showBanner}         
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#slider-top" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#slider-top" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <Script id="poper"
			src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
			integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
			crossOrigin="anonymous"></Script>
		<Script id="btstrp"
			src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js"
			integrity="sha384-IDwe1+LCz02ROU9k972gdyvl+AESN10+x7tBKgc9I5HFtuNz0wWnPclzo6p9vxnk"
			crossOrigin="anonymous"></Script>
        </div>

	)

	
}
export default Banner;
