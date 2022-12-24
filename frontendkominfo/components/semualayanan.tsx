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


const Semualayanan = ({layananshow}) => {
	const [showLayanan,setshowLayanan ] = useState([])

	const apiUrl = `${process.env.NEXT_PUBLIC_API_SITE}/api/layanan?is_parent=1&type=landing`
	
	let displayData
	function pullJson(){
			displayData = layananshow.map(function(todo) {
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
            <div className="h-88-card laycard rounded border m-1 m-lg-3 pb-2">
              <div className="text-center pt-3 pb-3 bg-info rounded-top">
               {
                todo.icon === null || todo.icon === '' || todo.icon === undefined ? 
                <img src="/logo.png" alt="" className="w-lg-100 w-25 m-4" /> : 
                <img src={imageUrl + todo.icon}  className="w-lg-100 w-25 m-4" alt={todo.icon} />
              }
              </div>
              <div className="me-2 ms-2 mt-1">
                <h5 className="text-blue mb-2 mt-1"><strong>{todo.title}</strong></h5>
                <p className="mb-4">{kalimat2.substr(0,45)}</p>
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
			setshowLayanan(displayData)
	}
	useEffect(() => {
		pullJson();
	}, [])


	return(
		<div className="card-layanan">
      <div className="">
        <div>
          {showLayanan}
          <div className="clearfix" />
        </div>
      </div>
    </div>

	)

	
}
export default Semualayanan;
