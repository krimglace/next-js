import React, { useEffect, useState } from "react";

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { parse } from 'node-html-parser';
import { DOMParser } from 'DOMParser'
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/router'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCircle, faArrowRight, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import swal from 'sweetalert';

const Konfirmasi = ({konfirmasishow}) => {
	const router = useRouter()
	const { handleSubmit, register, formState: { errors } } = useForm();
	async function onSubmit(values){
		// console.log(values)
		let config = {
	      	method: 'POST',
	      	url: `${process.env.NEXT_PUBLIC_API_SITE}/api/user/verif`,
	      	headers: {
		        'accept': 'application/json',
		        'Content-Type': 'application/json',
		        'X-CSRF-TOKEN': ''
	      	},
	      	data: {
	          	"email" : konfirmasishow,
	          	"code" : values.kode
	      	},
		};
		const response = await axios(config)
      	console.log(response);
      	if(response.data.success == false){
			try {
			    swal({
			        title: "Konfirmasi Gagal",
			        text: "Kode verifikasi salah",
			        icon: "error",
			      }).then(next => {
			        router.push(`/login`)
			    });
		    } catch(err){  
			    console.log(err)
		    }
      	} else{
      		try {
			    swal({
			        title: "Konfirmasi Berhasil",
			        text: "Akun anda telah aktif... Anda akan dialihkan ke halaman masuk",
			        icon: "success",
			        timer: 3000,
			        
			    }).then(next => {
			        router.push(`/login`)
			    });
		    } catch(err){
			    console.log(err)
		    }
      	}
		// console.log(config)
	} 

	return(
		<>
			<div className="bg-info text-center text-up">
				<h2><strong>Konfirmasi</strong></h2>
				<img src="/konfirm.png" />
			</div><br />
			<div className="mt-5 p-lg-5 p-md-5 p-4 bg-info rounded mb-5">
				<div className="ps-lg-5 pe-lg-5 konfirmasiverif">
					<h4><strong>Email : {konfirmasishow}</strong></h4>
					<h4><strong>Kode Verifikasi</strong></h4>
					<form className="text-center" onSubmit={handleSubmit(onSubmit)}>
						<div className="form-group text-center">
							<input type="number" name="kode" {...register('kode')} className="form-control" placeholder="Masukkan Kode Verifikasi Anda" required />
						</div>
						<div className="form-group text-centerverifikasi mt-2">
							<input type="submit" className="btn btn-primary form-control" value="Submit" required />
						</div>
					</form>	
				</div>
				{/*{showtentang}*/}
			</div>
		</>
	)

	
}
export default Konfirmasi;
