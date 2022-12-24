import React, { useEffect, useState } from "react";

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { parse } from 'node-html-parser';
import { DOMParser } from 'DOMParser'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCircle, faArrowRight, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";


const Tentangkami = ({tentangshow}) => {
	const [showtentang,setshowtentang ] = useState()

	let displayData
	function pullJson(){
		displayData = tentangshow.map(function(todo) {
			let htmlstring = todo.content;
			const parser = new DOMParser();
				const doc = parser.parseFromString(htmlstring, 'text/html');

			return(
				<p key={todo.id}>
					{doc.documentElement.textContent}
				</p>
			)
		})
		setshowtentang(displayData)
	}
	
	useEffect(() => {
		pullJson();
	}, [])

	return(
		<>
			<div className="mt-5 p-lg-5 p-md-5 p-4 tentang-cover mb-5">
				<h2><strong>Tentang Kami</strong></h2><br />
				{showtentang}
			</div>
		</>
	)

	
}
export default Tentangkami;
