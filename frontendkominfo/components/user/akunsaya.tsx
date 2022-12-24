import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import Link from 'next/link'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import swal from 'sweetalert';
import jwt from 'jsonwebtoken'
import {useForm} from 'react-hook-form';

import Boots from '../Bootstrap'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faKey, faPen } from "@fortawesome/free-solid-svg-icons";

const Akunsaya = ({itemsEmail, itemsUserid}) => {
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
const { handleSubmit, register, formState: { errors } } = useForm();

const [firstname,setfirstname ] = useState()
const [lastname,setlastname ] = useState()
const [emailuser,setemailuser ] = useState()
const [tempatlahir,settempatlahir ] = useState()
const [tanggallahir,settanggallahir ] = useState()
const [jeniskelamin,setjeniskelamin ] = useState()
const [alamatuser,setalamatuser ] = useState()
const [provinsiuser,setprovinsiuser ] = useState()
const [kotauser,setkotauser ] = useState()
const [kodepos,setkodepos ] = useState()
const [nomorhandphone,setnomorhandphone ] = useState()
const [faxuser,setfaxuser ] = useState()
const [potoprofil,setpotoprofil ] = useState()

let displayData
	
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
	    	setpotoprofil(responseData.data.profile_picture)
	    	setfirstname(responseData.data.first_name)
	    	setlastname(responseData.data.last_name)
	    	setemailuser(responseData.data.email)
	    	settempatlahir(responseData.data.place_of_birth)
	    	settanggallahir(responseData.data.date_of_birth)
	    	setjeniskelamin(responseData.data.gender)
	    	setalamatuser(responseData.data.address)
	    	setprovinsiuser(responseData.data.province)
	    	setkotauser(responseData.data.city)
	    	setkodepos(responseData.data.zip_code)
	    	setnomorhandphone(responseData.data.phone_number)
	    	setfaxuser(responseData.data.fax)
	    })
	  }


  useEffect(() => {
    pullJsonProfile()
    pullImage('file')
    pullChange('file')
  }, []);


  const [selectedImage, setSelectedImage] = useState("")
  const [selectedFile, setSelectedFile] = useState<file>()
  const [typeFile, setTypeFile] = useState<file>()

  function pullImage(value){
  	setSelectedFile(value)
  }
  function pullChange(value){
  	setTypeFile(value)
  }
  const [image, setImage] = useState(null)
  const uploadToClient = (event) => {	
  	if(event.target.files && event.target.files[0]){
  		const i = event.target.files[0]

  		setImage(i)
  	}
  }
  function handleChange(event){
  	setSelectedFile(event)
  	if(event != undefined)
  	{
  		setSelectedImage(URL.createObjectURL(event))
  	}

  }
  const router = useRouter();

  const onSubmit = async (event) => {
  	let response = {
  		url: `${process.env.NEXT_PUBLIC_API_SITE}/api/user/profile/${tknemail.userid}`,
  		method: 'POST',
  		headers: {
  			'accept': 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
        'Authorization': bearer,
        'X-CSRF-TOKEN': ''
  		},
  		data: {'image': selectedFile},
      files: selectedFile,
  	}
  	
  	try {
  		const config = await axios(response)

      swal({
        title: "Update Berhasil",
        text: "Tunggu sebentar, anda akan diarahkan ke halaman dashboard",
        icon: "success",
        timer: 3000,
        
      }).then(next => {
      	document.querySelector('#closemodal').click()
        router.push(`/user/dashboard`)
      });

    } catch(err){
      swal({
        title: "Gagal Update",
        icon: "error",
      })
      console.log(err)
    }
  }
  const onSubmitPassword = async (values) => {
  	console.log(values)
  	if(values.passwordbaru != values.konfirmasipassword){
  		document.querySelector('#pbaru').classList.remove('d-none')
  	} else{	
	  	let config = {
		      	method: 'POST',
		      	url: `${process.env.NEXT_PUBLIC_API_SITE}/api/user/ubah_password`,
		      	headers: {
			        'accept': 'application/json',
			        'Content-Type': 'application/json',
			        'X-CSRF-TOKEN': ''
		      	},
		      	data: {
		      		"email": tknemail.email,
	  					"password": values.passwordbaru
		      	},
			};
			try {
				const response = await axios(config)
		      	// console.log(response);
				swal({
			        title: "Password berhasil diganti",
			        text: "Tunggu sebentar, anda akan diarahkan ke halaman dashboard",
			        icon: "success",
			        timer: 3000,
			        
			    }).then(next => {
			        document.querySelector('#closemodal').click()
        			router.push(`/user/dashboard`)
			    });
		    } catch(err){  
			    swal({
			        title: "Password gagal diganti",
			        icon: "error",
			      })
			    console.log(err)
		    }
  	}
  }

 return(
 	<div>
 		<div className="mt-2 mb-2 me-lg-5 ms-lg-5 ms-3 me-3 ms-md-4 me-md-4">
 					<div className="welcome-back alert pb-1">
	        		<div className="float-start" >
	            	<button className="btn btn-primary float-start me-3" />
	              <div className="float-start">
	                <strong>Hi, {firstname} {lastname} !</strong>
	                <p>Silahkan melakukan permohonan di menu <strong><Link href={`/user/tambahpermohonan`}>Tambah Permohonan</Link></strong></p>
	              </div>
	              <div className="clearfix" />
	            </div>
	            <small className="float-md-end float-lg-end"><Link href={`/user/dashboard`} className="text-primary">Dashboard /</Link> Profil</small>
	          	<div className="clearfix" />
	          </div>
            <div className="content-akunsaya">
                <div className="left-content mb-3 float-start col-12 pb-5 border rounded text-center col-lg-4 bg-light">
                	<div className="atas-1" />
                	{
                		potoprofil == null || potoprofil == undefined || potoprofil == '' ? (
		      							<img src="/user/profile/profile.png" alt="profile.png" width="50px" height="50px" className="profil-menu mt-1" />
		      						) : (
		      							<img src={`${process.env.NEXT_PUBLIC_API_SITE}/profile/${potoprofil}`} width="50px" height="50px" />
		      						)
                	}<br />
                	<div className="btn-group mt-3">
                  		<h5 className="ms-3">{firstname} {lastname}</h5>
                	</div>
                	<p>Pemohon</p>
                	<div className="ms-2 me-2">
                		<div className="float-start changeid col-6">
                			<div className="border border-primary m-2 p-1" data-bs-toggle="modal" data-bs-target="#gantifoto">
                				<FontAwesomeIcon icon={faPen} className="me-2" /> Ubah Foto Profil
                			</div>
                		</div>
                		<div className="float-end changeid col-6">
                			<div className="border border-primary m-2 p-1" data-bs-toggle="modal" data-bs-target="#gantiPassword">
                				<FontAwesomeIcon icon={faKey} className="me-2" /> Ubah Password
                			</div>
                		</div>
                	</div>
              	</div>
              	<div className="right-content float-end col-12 col-lg-7 border rounded bg-light p-4">
                	<div className="float-start mt-2">
                  		<h5>Profil</h5>
                	</div>
                	<div className="float-end">
                  		<Link href={`/user/profile/edit`} className="btn btn-secondary text-primary"><FontAwesomeIcon className="icon-icon me-2" icon={faPen} /> Edit</Link>
                	</div>
            		<div className="clearfix" />
                	<hr />
                	<div>
                  		<h5>Data Pribadi</h5>
						<div className="cover-table mt-3 d-flex flex-column align-items-center">
							<table className="table table-bordered">
							  <tbody className="w-100">
							    <tr>
							      <th className="pt-2 pb-2 ps-lg-4 ps-3">Nama Lengkap </th>
							      <td className="p-2">{firstname} {lastname}</td>
							    </tr>
							    <tr>
							      <th className="pt-2 pb-2 ps-lg-4 ps-3">Email </th>
							      <td className="p-2">{emailuser}</td>
							    </tr>
							    <tr>
							      <th className="pt-2 pb-2 ps-lg-4 ps-3">Tempat, Tanggal Lahir </th>
							      <td className="p-2">{tempatlahir}/{tanggallahir}</td>
							    </tr>
							    <tr>
							      <th className="pt-2 pb-2 ps-lg-4 ps-3">Jenis Kelamin </th>
							      <td className="p-2">{jeniskelamin}</td>
							    </tr>
							    <tr>
							      <th className="pt-2 pb-2 ps-lg-4 ps-3">Alamat Lengkap </th>
							      <td className="p-2">{alamatuser}</td>
							    </tr>
							    <tr>
							      <th className="pt-2 pb-2 ps-lg-4 ps-3">Provinsi </th>
							      <td className="p-2">{provinsiuser}</td>
							    </tr>
							    <tr>
							      <th className="pt-2 pb-2 ps-lg-4 ps-3">Kota </th>
							      <td className="p-2">{kotauser}</td>
							    </tr>
							    <tr>
							      <th className="pt-2 pb-2 ps-lg-4 ps-3">Kode Pos </th>
							      <td className="p-2">{kodepos}</td>
							    </tr>
							    <tr>
							      <th className="pt-2 pb-2 ps-lg-4 ps-3">No. Handphone </th>
							      <td className="p-2">{nomorhandphone}</td>
							    </tr>
							    <tr>
							      <th className="pt-2 pb-2 ps-lg-4 ps-3">Fax </th>
							      <td className="p-2">{faxuser}</td>
							    </tr>
							  </tbody>
							</table>
						</div>
                	</div>
              	</div>
              	<div className="clearfix" />
              	<br /><br />
            </div>
        </div>
      	<div className="modal fade" id="gantifoto" tabIndex="-1" aria-labelledby="gantifotoLabel" aria-hidden="true">
        	<div className="modal-dialog">
          		<div className="modal-content">
            		<div className="modal-header">
              			<h1 className="modal-title fs-5" id="gantifotoLabel">Ganti Foto Profil</h1>
              			<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            		</div>
            		<form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
              			<div className="modal-body">
                			<div className="form-group">
                  				<label htmlFor="fotochange">Ganti Foto <b className="text-secondary">*</b></label><br />
                  				<div>
                  					{
                  						selectedImage ? (
                  								<div className="text-center pointer">
                  									<img width="100%" src ={selectedImage} alt="" />
                  								</div>
                  							) : potoprofil == null ? (
                  								<div className="text-center pointer">
                  									<img width="50%" src ="/coverimage.jfif" alt="" />
                  								</div>
                  							) : (
                  								<div className="text-center pointer">
                  									<img width="50%" src ={`${process.env.NEXT_PUBLIC_API_SITE}/profile/${potoprofil}`} alt="" />
                  								</div>
                  							)
                  					}

                  				</div>
                  				<br />
                  				<input {...register("image")}
                  				type="file" 
                  				required 
                  				accept="image/*"
                  				name="image"
                  				id="fotochange"
                  				className="form-control"
                  				onChange={({target}) => {
                  					handleChange(target.files[0])
                  				}} />
                			</div>
              			</div>
              			<div className="modal-footer">
                			<button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closemodal">Tutup</button>
                			<button type="submit" className="btn btn-primary">Simpan</button>
              			</div>
            		</form>
          		</div>		
        	</div>
      	</div>
      	<div className="modal fade" id="gantiPassword" tabIndex="-1" aria-labelledby="gantiPassword" aria-hidden="true">
        	<div className="modal-dialog">
          		<div className="modal-content">
            		<div className="modal-header">
              			<h1 className="modal-title fs-5" id="gantiPassword">Ganti Password </h1>
              			<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            		</div>
            		<div className="modal-body">
            			<div id="pbaru" className="alert alert-danger d-none">Konfirmasi Password Tidak Sama</div>
            			<form onSubmit={handleSubmit(onSubmitPassword)}>
            				<div className="form-group">
            					<label>Password Baru <b className="text-secondary">*</b></label>
            					<input type="password" {...register("passwordbaru", { required: "Password Baru wajib diisi"})} name="passwordbaru" className="form-control" />
            					<small className="text-secondary">{errors.passwordbaru && errors.passwordbaru.message}</small>
            				</div>
            				<div className="form-group">
            					<label>Konfirmasi Password Baru <b className="text-secondary">*</b></label>
            					<input type="password" {...register("konfirmasipassword", { required: "Konfirmasi Password wajib diisi"})} name="konfirmasipassword" className="form-control" />
            					<small className="text-secondary">{errors.konfirmasipassword && errors.konfirmasipassword.message}</small>
            				</div>
            				<div className="form-group mt-2">
            					<button type="button" className="btn btn-secondary text-light me-2" data-bs-dismiss="modal" id="closemodalpw">Tutup</button>
            					<input type="submit" className="btn btn-primary" value="Simpan" />
            				</div>
            			</form>
            		</div>
          		</div>		
        	</div>
      	</div>

 	</div>
 )
}
export default Akunsaya;