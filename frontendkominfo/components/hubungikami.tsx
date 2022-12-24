import React, { useEffect, useState } from "react";

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faGlobe, faEnvelope, faGear } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";


const Hubungikami = () => {
	const [showFaqpage,setshowFaqpage ] = useState()
	const [showFaqLarge,setshowFaqLarge ] = useState()
	const [showFaqContent,setshowFaqContent ] = useState()

	const apiUrl = `${process.env.NEXT_PUBLIC_API_SITE}/api/content?page=about`;

	const bearer = `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
	let displayData, displayDataLarge, displayDataPage

	// function pullJson(){
	// 	fetch(apiUrl, {
	// 		method: "GET",
	// 		headers: {
	// 			'accept': 'application/json',
	// 			'Authorization': bearer,
	// 			'X-CSRF-TOKEN': ''
	// 		}
	// 	})
	// 	.then(response => response.json())
	// 	.then(responseData => {
	// 		// displayData = responseData.data.map(function(todo) {
	// 		// 	return(
	// 		// 		<option key={todo.id} value={todo.category}>{todo.category}</option>
	// 		// 	)
	// 		// })
	// 		// console.log(responseData.data)
	// 		// setshowFaqpage(displayData)
	// 	})
	// }

	// useEffect(() => {
	// 	pullJson();
	// }, [])

	return(
		<>
			<div className="mt-5 p-lg-5 p-md-5 hubungikami-cover mb-5">
				<div>
					<h2><strong>Hubungi Kami</strong></h2>
					<p>
						Silakan hubungi kami untuk menemukan solusi seputar layanan Kementerian Komunikasi dan Informatika
					</p>
				</div>
				<div className="bg-info hubungikami-content d-lg-flex d-md-flex justify-content-center align-items-center">
					<div className="float-start col-lg-6 col-md-6 col-12">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126933.43331187978!2d106.68229031640628!3d-6.1749432999999945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d47c71fdaf%3A0x56d2a62dc19ddbc9!2sKementerian%20Komunikasi%20dan%20Informatika%20Republik%20Indonesia!5e0!3m2!1sid!2sid!4v1668671283209!5m2!1sid!2sid"
							
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade" />
					</div>
					<div className="float-start col-lg-6 col-md-6 col-12">
					
						<table className="ms-lg-4 ms-3 me-3 mb-3 mt-2">
							<tbody>
								<tr>
									<td>
										 <FontAwesomeIcon className="icon-icon text-primary me-3" icon={faLocationDot} />
									</td>
									<td className="text-primary">
										<strong>Alamat</strong><br />
										Jl.Medan Merdeka Barat No.9 Jakarta Pusat
									</td>
								</tr>
								<tr>
									<td><br /></td>
								</tr>
								<tr>
									<td>
										 <FontAwesomeIcon className="icon-icon text-primary me-3" icon={faGlobe} />
									</td>
									<td className="text-primary">
										<strong>Website</strong><br />
										www.kominfo.go.id
									</td>
								</tr>
								<tr>
									<td><br /></td>
								</tr>
								<tr>
									<td>
										 <FontAwesomeIcon className="icon-icon text-primary me-3" icon={faEnvelope} />
									</td>
									<td className="text-primary">
										<strong>Email</strong><br />
										kontak@kominfo.go.id
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="clearfix" />
				</div>
				<br />
				<br />
				<div>
					<h2><strong>Call Center</strong></h2>
				</div>
				<div className="bg-info hubungikami-content d-lg-flex d-md-flex justify-content-center align-items-center mt-5 p-lg-5 pt-3 pb-3 ps-2 pe-2">
					<div className="float-start col-lg-6 col-md-6 col-12 left-element">
						<strong>Direktorat Jenderal Penyelenggaraan Pos dan Informatika (PPI)</strong>
						<ul>
							<li>
								<ul className="dis">
									<li>Call center: 159</li>
									<li>operasional layanan call center :</li>
									<li>Senin - Jum'at (kecuali libur nasional)</li>
									<li>Pukul 08.00 - 16.00 WIB</li>
								</ul>
							</li>
						</ul>
						<strong>Direktorat Jenderal Sumber Daya Perangitgkat Pos dan Informatika (SDPPI)</strong>
						<ul>
							<li>
								<ul className="dis">
									<li>Call center: 159</li>
									<li>operasional layanan call center :</li>
									<li>Senin - Jum'at (kecuali libur nasional)</li>
									<li>Pukul 08.00 - 16.00 WIB</li>
								</ul>
							</li>
							<li>Layanan Live Chat <a href="#" className="text-blue">http://sdppi.kominfo.go.id</a></li>
						</ul>
					</div>
					<div className="float-start col-lg-6 col-md-6 col-12 right-element">
						<strong>Direktorat Jenderal Aplikasi Informatika (APTIKA)</strong>
						<ul>
							<li>
								<strong>Layanan Pemerintah</strong>
							</li>
							<table className="table-second ms-lg-4 ms-3 me-3 mb-3 mt-2">
								<tbody>
									<tr>
										<td>
											 <FontAwesomeIcon className="icon-tes me-3" icon={faGear} />
										</td>
										<td>
											Service Desk : <a href="https://servicedesk.layanan.go.id" className="text-blue">https://servicedesk.layanan.go.id</a>
										</td>
									</tr>
									<tr>
										<td>
											 <FontAwesomeIcon className="icon-tes me-3" icon={faEnvelope} />
										</td>
										<td>
											Email: bantuan@layanan.go.id
										</td>
									</tr>
									<tr>
										<td>
											 <FontAwesomeIcon className="icon-tes me-3" icon={faWhatsapp} />
										</td>
										<td>
											WA: 0811-1112-4678
										</td>
									</tr>
								</tbody>
							</table>
							<li>
								<strong>Layanan NonPemerintah</strong>
							</li>
							<table className="table-second ms-lg-4 ms-3 me-3 mb-3 mt-2">
								<tbody>
									<tr>
										<td>
											 <FontAwesomeIcon className="icon-tes me-3" icon={faGear} />
										</td>
										<td>
											Service Desk : <a href="https://servicedesk.layanan.go.id" className="text-blue">https://servicedesk.layanan.go.id</a>
										</td>
									</tr>
									<tr>
										<td>
											 <FontAwesomeIcon className="icon-tes me-3" icon={faEnvelope} />
										</td>
										<td>
											Email: bantuan@layanan.go.id
										</td>
									</tr>
									<tr>
										<td>
											 <FontAwesomeIcon className="icon-tes me-3" icon={faWhatsapp} />
										</td>
										<td>
											WA: 0811-1112-4678
										</td>
									</tr>
								</tbody>
							</table>
							<li>
								<ul className="dis">
									<li>Call center: 159</li>
									<li>operasional layanan call center :</li>
									<li>Senin - Jum'at (kecuali libur nasional)</li>
									<li>Pukul 08.00 - 16.00 WIB</li>
								</ul>
							</li>
							<li>Layanan Live Chat <a href="#" className="text-blue">http://sdppi.kominfo.go.id</a></li>
						</ul>
					</div>
					<div className="clearfix" />
				</div>
			</div>
		</>
	)

	
}
export default Hubungikami;
