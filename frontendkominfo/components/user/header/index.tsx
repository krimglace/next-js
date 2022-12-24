import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import swal from 'sweetalert';
import {useRouter} from 'next/router'
import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faHome, faChevronLeft, faBars, faRightFromBracket, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

function Header({itemsEmail, itemsUserid}){

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

	const api = `${process.env.NEXT_PUBLIC_API_SITE}/api/user/detail?email=${tknemail.email}`
	const bearer = `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`

	const [firstname, setfirstname] = useState()
	const [lastname, setlastname] = useState()
	const [emailuser, setemailuser] = useState()
	const [potoprofil, setpotoprofil] = useState()

	function pullJsonProfile(){
	    fetch(api, {
	      method: "GET",
	      headers: {
	        'accept': 'application/json',
	        'Authorization': bearer,
	        'X-CSRF-TOKEN': ''
	      }
	    })
	    .then(response => response.json())
	    .then(responseData => {
	    	setfirstname(responseData.data.first_name)
	    	setlastname(responseData.data.last_name)
	    	setemailuser(responseData.data.email)
	    	setpotoprofil(responseData.data.profile_picture)
	    	
	    })
	  }
	async function tampilkanmenu(){
		cektoggle()
	}
	function cektoggle(){
		document.querySelector('#dd-profil').classList.add('d-none')
		document.querySelector('#notification').classList.add('d-none')

		document.querySelector('#image-pemohon').classList.toggle('hilangkan')
		document.querySelector('#icon-pemohon').classList.toggle('open')
		document.querySelector('#icon-pemohon').classList.toggle('close')
		document.querySelector('#sidebarhome').classList.toggle('open')
		document.querySelector('#sidebarhome').classList.toggle('close')
		document.querySelector('#dashboard-side').classList.toggle('open')
		document.querySelector('#addhope').classList.toggle('open')
		document.querySelector('#confirm').classList.toggle('open')
		document.querySelector('#hopelist').classList.toggle('open')

		document.querySelector('#hopelistdropdown').classList.toggle('open')

		document.querySelector('#help').classList.toggle('open')

		document.querySelector('#perkirim').classList.toggle('open')
		document.querySelector('#pertolak').classList.toggle('open')
		document.querySelector('#perfinish').classList.toggle('open')

		document.querySelector('#footer-user').classList.toggle('close')
		document.querySelector('#footer-user').classList.toggle('open')
		document.querySelector('#content').classList.toggle('close')
		document.querySelector('#content').classList.toggle('open')

		document.querySelectorAll('.text-side-link')[0].classList.toggle('hilangkan')
		document.querySelectorAll('.text-side-link')[1].classList.toggle('hilangkan')
		document.querySelectorAll('.text-side-link')[2].classList.toggle('hilangkan')
	}
	function menuprofil(){
		tampilkanmenuprofil()
	}
	function changeup(){
		document.querySelector('#dd-profil').classList.add('d-none')
		document.querySelector('#notification').classList.toggle('d-none')
	}
	function tampilkanmenuprofil(){
		document.querySelector('#dd-profil').classList.toggle('d-none')
		document.querySelector('#notification').classList.add('d-none')	
	}

	  useEffect(() => {
	  	pullJsonProfile()
	  }, [])

	const router = useRouter()
	return(
		<div>

				<Head>
		        	<title>Portal Layanan Kominfo</title>
		        	<link rel="icon" href="/logo-kominfo-transparent.png" />
		        	<meta name="viewport" content="width=device-width, initial-scale=1" />
		      	</Head>

		      	<div className="user border">
		      		<div className="topbar bg-light fixed-top text-center">
		      			<div className="float-start d-flex menu-left">
			      			<Link href="/">
			      				<div id="icon-pemohon" className="icon-pemohon open bg-light ps-4 border-bottom border-end d-flex flex-column justify-content-center justify-content-center text-dark ps-2">
			      					<img id="image-pemohon" src="/logo-kominfo.png" alt="logo-kominfo.png" className="ms-5 hilangkan" />
			      				</div>
			      			</Link>
		      				<button id="menu-topbar" onClick={tampilkanmenu} className="menu-topbar d-lg-none d-md-none icon btn btn-light btn-outline-dark flex-column justify-content-center align-items-center">
			      				<div className="m-4">
			      					<FontAwesomeIcon className="icon-topbar" id="icon-toggle" icon={faBars} />
			      				</div>
			      			</button>
		      			</div>
		      			<div id="menu-header" className="float-end d-flex justify-content-center align-items-center">
			      			<button type="button" id="changeup" onClick={changeup} className="mb-1 btn btn-light menu-topbar d-flex flex-column justify-content-center align-items-center">
			      				<div className="">
			      					<FontAwesomeIcon id="moon" className="icon-topbar text-secondary" icon={faBell} />
			      				</div>
			      			</button>
			      			<button type="button" id="menu-profil" onClick={menuprofil} className="menu-topbar me-4 btn btn-light d-flex justify-content-center align-items-center pt-4">
			      				<div className="">
			      					{
			      						potoprofil == null || potoprofil == undefined || potoprofil == '' ? (
			      							<img src="/user/profile/profile.png" alt="profile.png" width="25px" className="profil-menu rounded-circle me-2" />
			      						) : (
			      							<img src={`${process.env.NEXT_PUBLIC_API_SITE}/profile/${potoprofil}`} alt={potoprofil} width="25px" height="25px" className="profil-menu rounded-circle me-2" />
			      						)
			      					}
			      					{firstname} {lastname}
			      				</div>
			      			</button>
			      			<div className="bg-light border border-dark text-dark p-2 d-none" id="dd-profil">
			      				<div className="float-start col-1">
			      					{
			      						potoprofil == null || potoprofil == undefined || potoprofil == '' ? (
			      							<img src="/user/profile/profile.png" alt="profile.png" width="34px" className="profil-menu mt-1" />
			      						) : (
			      							<img src={`${process.env.NEXT_PUBLIC_API_SITE}/profile/${potoprofil}`} alt={potoprofil} width="34px" height="34px" className="profil-menu mt-1" />
			      						)
			      					}
			      					
			      				</div>
			      				<div className="float-start profil-info text-start">
			      					<ul>
			      						<li><strong>{firstname} {lastname}</strong></li>
			      						<li className="email-info"><small>{emailuser}</small></li>
			      					</ul>
			      				</div>
			      				<div className="clearfix garis-clear" />
			      				<hr />
			      				<div className="text-start info-menu">
			      					<ul>
			      						<Link href={`/user/profile`}><li className="ps-2 pe-2 pt-1 pb-1 link-menu-profil">Akun Saya</li></Link>
			      						<Link href={`/user/daftar-permohonan/terkirim`}><li className="ps-2 pe-2 pt-1 pb-1 link-menu-profil">Permohonan</li></Link>
			      					</ul>
			      				</div>
			      				<div className="garis-clear" />
			      				<hr />
			      				<Link href="/user/logout">
				      				<div className="info-menu-logout mb-1 ms-1 pt-1 pb-1 ps-2 pe-2 link-menu-profil">
				      					Keluar
				      				</div>
				      			</Link>
			      			</div>
		      			</div>
		      			<div className="clearfix" />
		      		</div>
		      	</div>
		      	<div className="notification border border-dark d-none p-3 text-center" id="notification">
		      		<div>
		      			<small><strong>Notification</strong></small>
		      			<hr className="garis-batas" />
		      			<small><em>No Data</em></small>
		      		</div>
				</div>
		</div>
	)

}
export default Header;