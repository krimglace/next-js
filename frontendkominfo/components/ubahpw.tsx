import React, { useEffect, useState } from "react";

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { parse } from 'node-html-parser';
import { DOMParser } from 'DOMParser'
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/router'

import swal from 'sweetalert';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCircle, faArrowRight, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";


const Ubahpw = ({passwordchange}) => {
	const router = useRouter()
	const { handleSubmit, register, formState: { errors } } = useForm();
	async function onSubmit(values){
		// console.log(values)
		let config = {
	      	method: 'POST',
	      	url: `${process.env.NEXT_PUBLIC_API_SITE}/api/user/ubah_password`,
	      	headers: {
		        'accept': 'application/json',
		        'Content-Type': 'application/json',
		        'X-CSRF-TOKEN': ''
	      	},
	      	data: {
	      		"email": passwordchange,
  				"password": values.password
	      	},
		};
		console.log(config)
		try {
			const response = await axios(config)
	      	// console.log(response);
			swal({
		        title: "Password berhasil diganti",
		        text: "Anda akan dialihkan ke halaman masuk",
		        icon: "success",
		        timer: 3000,
		        
		    }).then(next => {
		        // router.push(`/login`)
		    });
	    } catch(err){  
		    swal({
		        title: "Password gagal diganti",
		        icon: "error",
		      })
		    console.log(err)
	    }
		// console.log(config)
	} 
	return(
		<>
			<div className="bg-info text-center text-up">
				<h2><strong>Ubah Password</strong></h2>
				<img src="/konfirm.png" />
			</div><br />
			<div className="mt-5 p-lg-5 p-md-5 p-4 bg-info rounded mb-5">
				<div className="ps-lg-5 pe-lg-5 konfirmasiverif">
					<h4><strong>Email : {passwordchange}</strong></h4>
					<h4><strong>Password Baru</strong></h4>
					<form className="text-center" onSubmit={handleSubmit(onSubmit)}>
						<div className="form-group text-center">
							<input type="password" name="password" {...register('password')} className="form-control" placeholder="Masukkan Password Baru Anda" required />
						</div>
						<div className="form-group text-center mt-2">
							<input type="submit" className="btn btn-primary form-control" value="Submit" required />
						</div>
					</form>	
				</div>
				{/*{showtentang}*/}
			</div>
		</>
	)

	
}
export default Ubahpw;
