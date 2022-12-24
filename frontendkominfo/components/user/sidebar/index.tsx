import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faCirclePlus, faCheckToSlot, faList, faCircleQuestion, faCaretRight, faRightFromBracket, faChevronUp, faChevronRight } from "@fortawesome/free-solid-svg-icons";



const Sidebar = ({itemsEmail, itemsUserid}) => {
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

	function pullPage(){
		var countmenuside = document.querySelectorAll('.text-sidebar');
		console.log(countmenuside.length)
	}
	function clickdropdownFirst(){
		dropdownFirst()
	}
	function dropdownFirst(){
		document.querySelector('#hdd').classList.toggle('active-dropdown')
		document.querySelector('#hdd').classList.toggle('nonactive-dropdown')
		document.querySelector('#ddpermohonan').classList.toggle('d-none')
	}

	useEffect(() => {
		pullPage();
	}, [])

	let tknemail = new loginToken();

	const api = `${process.env.NEXT_PUBLIC_API_SITE}/api/user/detail?email=${tknemail.email}`
	const bearer = `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`

	return(
		<>
			<div className="sidebar bg-light fixed p-1 open border-end" id="sidebarhome">
				<div className="menu-sidebar pt-lg-4 mt-5">
					<div className="text-success mt-5 btn">
	  					<small className="text-side-link">DASHBOARD</small>
					</div>
					<Link href={`/user/dashboard`} id="dashboarduser" className="list-menu-sidebar btn">
	  					<div className="link-menu">
		  					<div className="float-start icon-sidebar">
		  						<FontAwesomeIcon icon={faHome} className="icon-menu-sidebar" />
		  					</div>
		  					<div id="dashboard-side" className="text-sidebar not-sidebar open ms-2 float-start">
		  						Dashboard
		  					</div>
		  					<div className="clearfix" />
		  				</div>
					</Link>
					<div className="text-success mt-2 btn">
	  					<small className="text-side-link">PERMOHONAN</small>
					</div>
					<Link href={`/user/tambahpermohonan`} id="tambahpermohonan" className="list-menu-sidebar btn">
	  					<div className="link-menu">
		  					<div className="float-start icon-sidebar">
		  						<FontAwesomeIcon icon={faCirclePlus} className="icon-menu-sidebar" />
		  					</div>
		  					<div id="addhope" className="text-sidebar not-sidebar open ms-2 float-start">
		  						Tambah Permohonan
		  					</div>
		  					<div className="clearfix" />
		  				</div>
					</Link>
					<Link href={`/user/konfirmasi`} id="konfirmasi" className="list-menu-sidebar mt-2 btn">
	  					<div className="link-menu">
		  					<div className="float-start icon-sidebar">
		  						<FontAwesomeIcon icon={faCheckToSlot} className="icon-menu-sidebar" />
		  					</div>
		  					<div id="confirm" className="text-sidebar not-sidebar open ms-2 float-start">
		  						Konfirmasi
		  					</div>
		  					<div className="clearfix" />
		  				</div>
					</Link>
					<button type="button" id="daftarpermohonan"  onClick={clickdropdownFirst} className="list-menu-sidebar mt-2 btn">
	  					<div className="link-menu">
		  					<div className="float-start icon-sidebar">
		  						<FontAwesomeIcon icon={faList} className="icon-menu-sidebar" />
		  					</div>
		  					<div id="hopelist" className="text-sidebar this-sidebar ms-2 float-start open">
		  						Daftar Permohonan
		  					</div>
		  					<div id="hopelistdropdown" className="icon-menu-dropdown open">
								<FontAwesomeIcon id="hdd" icon={faChevronUp} className="icon-menu-sidebar dropdown-icon nonactive-dropdown" />
		  					</div>
		  					<div className="clearfix" />
		  				</div>
					</button>
					<div id="ddpermohonan" className="dropdown-menu-sidebar d-none ms-2">
						<Link href={`/user/daftar-permohonan/terkirim`} id="permohonan-terkirim" className="list-menu-sidebar mt-2 btn">
		  					<div className="link-menu">
			  					<div className="float-start icon-sidebar">
			  						{/*<FontAwesomeIcon icon={faChevronRight} className="icon-menu-sidebar" />*/}
			  					</div>
			  					<div id="perkirim" className="text-sidebar open ms-1 float-start">
			  						Diproses
			  					</div>
			  					<div className="clearfix" />
			  				</div>
						</Link>
						<Link href={`/user/daftar-permohonan/ditolak`} id="permohonan-ditolak" className="list-menu-sidebar mt-2 btn">
		  					<div className="link-menu">
			  					<div className="float-start icon-sidebar">
			  						{/*<FontAwesomeIcon icon={faChevronRight} className="icon-menu-sidebar" />*/}
			  					</div>
			  					<div id="pertolak" className="text-sidebar open ms-1 float-start">
			  						Ditolak
			  					</div>
			  					<div className="clearfix" />
			  				</div>
						</Link>
						<Link href={`/user/daftar-permohonan/selesai`} id="permohonan-selesai" className="list-menu-sidebar mt-2 btn">
		  					<div className="link-menu">
			  					<div className="float-start icon-sidebar">
			  						{/*<FontAwesomeIcon icon={faChevronRight} className="icon-menu-sidebar" />*/}
			  					</div>
			  					<div id="perfinish" className="text-sidebar open ms-1 float-start">
			  						Selesai
			  					</div>
			  					<div className="clearfix" />
			  				</div>
						</Link>
					</div>
					<div className="text-success mt-2 btn">
	  					<small className="text-side-link">LAINNYA</small>
					</div>
					<Link href={`/user/faqs`} id="helpdesk" className="list-menu-sidebar mt-2 btn">
	  					<div className="link-menu">
		  					<div className="float-start icon-sidebar">
		  						<FontAwesomeIcon icon={faCircleQuestion} className="icon-menu-sidebar" />
		  					</div>
		  					<div id="help" className="text-sidebar this-sidebar ms-2 float-start open">
		  						Bantuan (FAQ)
		  					</div>
		  					<div className="clearfix" />
		  				</div>
					</Link>
	  			</div>
			</div>
		</>
	)

}

export default Sidebar;