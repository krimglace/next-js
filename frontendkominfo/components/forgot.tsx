import React, { useEffect, useState } from "react";

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { parse } from 'node-html-parser';
import { DOMParser } from 'DOMParser';
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/router'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCircle, faArrowRight, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import swal from 'sweetalert';

const Forgot = () => {
	const router = useRouter()
	const { handleSubmit, register, formState: { errors } } = useForm();
async function onSubmit(values){
	// console.log(values)
	let config = {
      	method: 'POST',
      	url: `${process.env.NEXT_PUBLIC_API_SITE}/api/user/forgot`,
      	headers: {
	        'accept': 'application/json',
	        'Content-Type': 'application/json',
	        'X-CSRF-TOKEN': ''
      	},
      	data: {
          	"email" : values.email
      	},
	};
	try {
	    swal({
	        title: "Lupa Password",
	        text: "Anda akan diarahkan ke halaman ganti password",
	        icon: "success",
	        timer: 3000,
	        
	    }).then(next => {
	        router.push(`/ubahpassword?email=${values.email}`)
	    });
    } catch(err){
	      swal({
	        title: "Gagal",
	        text: "Email tidak ditemukan",
	        icon: "error",
	      })
	      console.log(err)
    }
} 
	return(
		<>
			<div className="bg-info text-center text-up">
				<h2><strong>Lupa Password</strong></h2>
				<img src="/konfirm.png" />
			</div><br />
			<div className="mt-5 p-lg-5 p-md-5 p-4 bg-info rounded mb-5">
				<div className="ps-lg-5 pe-lg-5 konfirmasiverif">
					<h4><strong>Email</strong></h4>
					<form className="text-center" onSubmit={handleSubmit(onSubmit)}>
						<div className="form-group text-center">
							<input type="email" {...register('email')} name="email" className="form-control" placeholder="Masukkan Email" required />
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
export default Forgot;
