import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import Link from 'next/link'

import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCheckToSlot, faClose, faPlus, faFutbol } from "@fortawesome/free-solid-svg-icons";

export default function Dashboardcomponents({itemsEmail, itemsUserid}){
	interface tokenLogin{
    email: string;
    userid: string;
	}
	class loginToken implements IsPerson{
    email: string;
    userid: string;

    constructor(x: string, email: string){
      this.email = itemsEmail;
      this.userid = itemsUserid;
    }
	}

  let tknemail = new loginToken();

	const [permohonanTerkirim,setpermohonanTerkirim ] = useState()
	const [permohonanSelesai,setpermohonanSelesai ] = useState()
	const [permohonanDitolak,setpermohonanDitolak ] = useState()	

	const bearer = `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
	
	let displayData

	const [userid, setuserid] = useState()
	function pullJsonDashboard(){
		// console.log(useriddefault)
	    fetch(`${process.env.NEXT_PUBLIC_API_SITE}/api/ticket/dashboard?user_id=${tknemail.userid}`, {
	      method: "GET",
	      headers: {
	        'accept': 'application/json',
	        'Authorization': bearer,
	        'X-CSRF-TOKEN': ''
	      }
	    })
	    .then(response => response.json())
	    .then(responseData => {
	    		
			const layananTitle = responseData.data
			// console.log(layananTitle)

			setpermohonanTerkirim(layananTitle.terkirim)
			setpermohonanSelesai(layananTitle.selesai)
			setpermohonanDitolak(layananTitle.ditolak)
	    })
	  }


  useEffect(() => {
    pullJsonDashboard()
  }, []);
	return(
		<>
		<div className="count-permohonan">
	      <div className="col-lg-4 col-md-6 col-12 rounded float-start">
	        <div className="m-2 bg-light d-flex list-dashboard rounded p-1">
	          <FontAwesomeIcon className="icon-dashboard text-light border border-primary rounded bg-primaryuser p-3" icon={faStar} />
	          <div className="content-permohonan-dash d-flex flex-column justify-content-center ms-lg-4 ms-md-4 ms-2 pt-2 pb-2">
	            <h5 className="text-dark">Baru</h5>
	            <p className="text-dark">{permohonanTerkirim}</p>
	          </div>
	        </div>
	      </div>
	      <div className="col-lg-4 col-md-6 col-12 rounded float-start">
	        <div className="m-2 bg-light d-flex list-dashboard p-1 rounded">
	          <FontAwesomeIcon className="icon-dashboard border border-primary text-light rounded bg-green p-3" icon={faCheckToSlot} />
	          <div className="content-permohonan-dash d-flex flex-column justify-content-center ms-lg-4 ms-md-4 ms-2 pt-2 pb-2">
	            <h5 className="text-dark">Selesai</h5>
	            <p className="text-dark">{permohonanSelesai}</p>
	          </div>
	        </div>
	      </div>
	      <div className="col-lg-4 col-md-6 col-12 rounded float-start">
	        <div className="m-2 bg-light d-flex list-dashboard p-1 rounded">
	          <FontAwesomeIcon className="icon-dashboard border border-primary text-info rounded bg-red p-3" icon={faClose} />
	          <div className="content-permohonan-dash d-flex flex-column justify-content-center ms-lg-4 ms-md-4 ms-2 pt-2 pb-2">
	            <h5 className="text-dark">Ditolak</h5>
	            <p className="text-dark">{permohonanDitolak}</p>
	          </div>
	        </div>
	      </div>
	      <div className="col-lg-4 col-md-6 col-12 rounded float-start">
	        <div className="m-2 bg-light d-flex list-dashboard p-1 rounded">
	          <FontAwesomeIcon className="icon-dashboard border border-primary text-info rounded bg-primary p-3" icon={faPlus} />
	          <div className="content-permohonan-dash d-flex flex-column justify-content-center ms-lg-4 ms-md-4 ms-2 pt-2 pb-2">
	            <h5 className="text-dark"><Link href={`/user/tambahpermohonan`} >Tambah Permohonan</Link></h5>
	          </div>
	        </div>
	      </div>
	      <div className="clearfix" />
	  </div>
		</>
	)
}