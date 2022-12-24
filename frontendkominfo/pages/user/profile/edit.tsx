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
import nookies from 'nookies';
import cookie from "js-cookie";

import styles from '../../../styles/Home.module.css'
import Header from '../../../components/user/header'
import Sidebar from '../../../components/user/sidebar'
import Footer from '../../../components/user/footer'
import Boots from '../../../components/Bootstrap'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faKey, faPen, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const bearer = `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`

export async function getServerSideProps(ctx){
  const cookies = nookies.get(ctx);

  if(!cookies.email && !cookies.iduser){
    return {
      redirect: {
        destination: '/login'
      }
    }
  }

  return{
    props:{
      email: cookies.email,
      iduser: cookies.iduser
    }
  }
}

function EditProfile({email, iduser}) {
  interface tokenLogin{
      emailuser: string;
      iduseruser: string;
  }
  class loginToken implements IsPerson{
    emailuser: string;
    iduseruser: string;

    constructor(iduseruser: string, emailuser: string){
      this.emailuser = email;
      this.iduseruser = iduser;
    }
  }
  let tknuser = new loginToken();

  const router = useRouter()
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

  const { handleSubmit, register, formState: { errors } } = useForm();

  async function onSubmit(values){
    let genderkelamin
    if(jeniskelamin == null){
      genderkelamin = 'Pria'
    } else{
      genderkelamin = jeniskelamin
    }

    if(provinsiuser == null || kotauser == null){
      swal({
        title: "Gagal Update",
        text: "Kota dan provinsi Belum Diisi",
        icon: "error",
      })
    } else{

      let config = {
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_SITE}/api/user/update`,
        headers: {
          'accept': 'application/json',
          'Authorization': bearer,
          'X-CSRF-TOKEN': ''
        },
        data: {
          "user_id": tknuser.iduseruser,
          "nama_depan": firstname,
          "nama_belakang": lastname,
          "tgl_lahir": tanggallahir,
          "tempat_lahir": tempatlahir,
          "gender": genderkelamin,
          "alamat": alamatuser,
          "provinsi": provinsiuser,
          "kota": kotauser,
          "kode_pos": kodepos,
          "hp": nomorhandphone,
          "fax": faxuser
        },
      };
      const response = await axios(config)
    try {

      swal({
        title: "Update Berhasil",
        text: "Tunggu sebentar, anda akan diarahkan ke profil",
        icon: "success",
        timer: 3000,
        
      })
      .then(next => {
        router.push(`/user/profile`)
      });

    } catch(err){
      swal({
        title: "Gagal Update",
        icon: "error",
      })
    }
    }
  }


  const [province, setprovince] = useState()
  const [city, setcity] = useState()


  const [mydata, setMydata] = useState()
  let displayData, displayProvince, displayCity

  const api = `${process.env.NEXT_PUBLIC_API_SITE}/api/user/detail?email=${tknuser.emailuser}`
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
          console.log(responseData)
          setpotoprofil(responseData.data.profile_picture)
          setfirstname(responseData.data.first_name)
          setlastname(responseData.data.last_name)
          setemailuser(tknuser.emailuser)
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

  function pullProvince(){
    const apiProvince = `${process.env.NEXT_PUBLIC_API_SITE}/api/province`

    fetch(apiProvince, {
      method: "GET",
        headers: {
          'accept': 'application/json',
          'Authorization': bearer,
          'X-CSRF-TOKEN': ''
        }
    })
    .then(response => response.json())
    .then(responseData => {
      displayProvince = responseData.data.map(function(todo) {
        return(
          <option key={todo.id} value={todo.name} items={todo.id}>{todo.name}</option>
        )
      })
      setprovince(displayProvince)
    })
  }
  async function pullCity(provid){
    const apiCity = `${process.env.NEXT_PUBLIC_API_SITE}/api/city?province_id=${provid}`
    fetch(apiCity, {
      method: "GET",
      headers: {
        'accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(responseDataCity => {
      displayCity = responseDataCity.data.map(function(todo) {
        return(
          <option key={todo.id} value={todo.name}  items={todo.id}>{todo.name}</option>
        )
      })
      setcity(displayCity)
    })
    
  }

    useEffect(() => {
      pullJsonProfile()
      pullProvince()
      pullCity()
    }, []);

  const onSubmitFile = async (event) => {
    let response = {
      url: `${process.env.NEXT_PUBLIC_API_SITE}/api/user/profile/${tknuser.iduseruser}`,
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
    
    // console.log(response)
    try {
      const config = await axios(response)
      // console.log(config)

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

  const [selectedImage, setSelectedImage] = useState("")
  const [selectedFile, setSelectedFile] = useState<file>()
  const [typeFile, setTypeFile] = useState<file>()

  function pullImage(value){
    setSelectedFile(value)
  }
  function pullChange(value){
    setTypeFile(value)
  }

  function handleChange(event){
    setSelectedFile(event)
    if(event != undefined)
    {
      setSelectedImage(URL.createObjectURL(event))
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


  return (
    <div>
      <Header itemsEmail={tknuser.emailuser} itemsUserid={tknuser.iduseruser} />
      <Sidebar itemsEmail={tknuser.emailuser} itemsUserid={tknuser.iduseruser} />
      <div id="content" className="content open bg-lightgray text-dark">
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
            <small className="float-md-end float-lg-end"><Link href={`/user/dashboard`} className="text-primary">Dashboard /</Link> <Link href={`/user/profile`} className="text-primary">Profil / </Link>Edit Data</small>
            <div className="clearfix" />
          </div>
          <div className="content-akunsaya">
            <div className="border rounded bg-light p-4">
              <br /><br />
              <div className="float-start mt-2 col-lg-6 col-md-6 col-12 text-light profilcover">
                <div data-bs-toggle="modal" data-bs-target="#gantifoto">
                      <FontAwesomeIcon icon={faPenToSquare} className="iconprofil p-1 bg-secondary rounded" />
                  {
                    potoprofil == null || potoprofil == undefined || potoprofil == '' ? (
                        <img src="/user/profile/profile.png" alt="profile.png" width="100px" height="100px" className="profil-menu mt-1" />
                      ) : (
                        <img src={`${process.env.NEXT_PUBLIC_API_SITE}/profile/${potoprofil}`} width="100px" height="100px" />
                      )
                  }
                </div>
              </div>
              <div className="float-end changeid col-lg-3 col-md-3 col-12">
                <div className="border border-primary m-2 p-1 rounded" data-bs-toggle="modal" data-bs-target="#gantiPassword">
                  <FontAwesomeIcon icon={faKey} className="me-2" /> Ubah Password
                </div>
              </div>
              <div className="clearfix" />
              <hr />
              <div className="mt-4">
                <form onSubmit={handleSubmit(onSubmit)} >
                 <div className="mt-3">
                    <h5 className="float-start">Edit Profil</h5>
                    <button className="btn btn-primary text-light border border-pill me-3 float-end">Submit</button>
                    <div className="clearfix" />
                  </div>
                  <br />
                  <div className="float-start col-lg-3 col-md-3 col-12">
                    <label htmlFor="firstname"><small><b>Nama Depan </b><b className="text-secondary">*</b></small></label>
                  </div>
                  <div className="float-start col-lg-9 col-md-9 col-12">
                    <input defaultValue={firstname} className="form-control" id="firstname" onChange={(e) => setfirstname(e.target.value)} required type="text" name="nama_depan" placeholder="Your First Name Here" />
                  </div>
                  <div className="clearfix mb-2" />

                  <div className="float-start col-lg-3 col-md-3 col-12">
                    <label htmlFor="lastname"><small><b>Nama Belakang </b><b className="text-secondary">*</b></small></label>
                  </div>
                  <div className="float-start col-lg-9 col-md-9 col-12">
                    <input className="form-control" required onChange={(e) => setlastname(e.target.value)} id="lastname" defaultValue={lastname} type="text" name="nama_belakang" placeholder="Your Last Name Here" />
                  </div>
                  <div className="clearfix mb-2" />

                  <div className="float-start col-lg-3 col-md-3 col-12">
                    <label htmlFor="email"><small><b>Email </b><b className="text-secondary">*</b></small></label>
                  </div>
                  <div className="float-start col-lg-9 col-md-9 col-12">
                    <input className="form-control" readOnly disable id="emailuser" defaultValue={emailuser} type="text" name="emailuser" required placeholder="Your Email Here" />
                  </div>
                  <div className="clearfix mb-2" />

                  <div className="float-start col-lg-3 col-md-3 col-12">
                    <label htmlFor="tempatlahir"><small><b>Tempat Lahir </b><b className="text-secondary">*</b></small></label>
                  </div>
                  <div className="float-start col-lg-9 col-md-9 col-12">
                    <input className="form-control" onChange={(e) => settempatlahir(e.target.value)} id="tempatlahir" defaultValue={tempatlahir} type="text" name="tempat_lahir" required placeholder="Your Place of Birth Here" />
                  </div>
                  <div className="clearfix mb-2" />
                    
                  <div className="float-start col-lg-3 col-md-3 col-12">
                    <label htmlFor="tanggallahir"><small><b>Tanggal Lahir </b><b className="text-secondary">*</b></small></label>
                  </div>
                  <div className="float-start col-lg-9 col-md-9 col-12">
                    <input required className="form-control" id="tanggallahir" onChange={(e) => settanggallahir(e.target.value)} defaultValue={tanggallahir} type="date" name="tgl_lahir" />
                  </div>
                  <div className="clearfix mb-2" />

                 <div className="float-start col-lg-3 col-md-3 col-12">
                    <label htmlFor="gender"><small><b>Jenis Kelamin </b><b className="text-secondary">*</b></small></label>
                  </div>
                  <div className="float-start col-lg-9 col-md-9 col-12">
                    <select defaultValue={jeniskelamin === null ? 'Pria' : jeniskelamin}
                      className="form-control" 
                      id="gender" 
                      type="text" 
                      name="gender" 
                      onChange={(e) => {
                        setjeniskelamin(e.target.value)
                        const selectedprovinsi = e.target.value;
                        // console.log(selectedprovinsi)
                        // console.log(e.target.selectedIndex+11)
                      }}>
                      <option value="Pria">Pria</option>
                      <option value="Wanita">Wanita</option>
                    </select>
                  </div>
                  <div className="clearfix mb-2" />

                  <div className="float-start col-lg-3 col-md-3 col-12">
                    <label htmlFor="alamat"><small><b>Alamat</b><b className="text-secondary">*</b></small></label>
                  </div>
                  <div className="float-start col-lg-9 col-md-9 col-12">
                    <input defaultValue={alamatuser === null ? "" : alamatuser} onChange={(e) => setalamatuser(e.target.value)} className="form-control" id="alamat" type="text" name="alamat" required placeholder="Your Address Here" />
                  </div>
                  <div className="clearfix mb-2" />

                  <div className="float-start col-lg-3 col-md-3 col-12">
                    <label htmlFor="provinsi"><small><b>Provinsi</b><b className="text-secondary">*</b></small></label>
                  </div>
                  <div className="float-start col-lg-9 col-md-9 col-12">
                    <select value={provinsiuser === null ? 'Aceh' : provinsiuser}
                      className="form-control" 
                      id="provinsi" 
                      type="text" 
                      name="provinsi" 
                      onChange={(e) => {
                        setprovinsiuser(e.target.value)
                        const selectedprovinsi = e.target.selectedIndex;
                        pullCity(selectedprovinsi+11);
                        // console.log(selectedprovinsi)
                        // console.log(e.target.selectedIndex+11)
                      }}>
                    {province}
                    </select>
                  </div>
                  <div className="clearfix mb-2" />

                  <div className="float-start col-lg-3 col-md-3 col-12">
                    <label htmlFor="kota"><small><b>Kota</b><b className="text-secondary">*</b></small></label>
                  </div>
                  <div className="float-start col-lg-9 col-md-9 col-12">
                    <select value={kotauser === null ? 'Kabupaten Simeulue' : kotauser}
                    onChange={(e) => {
                        setkotauser(e.target.value)
                      }}
                    className="form-control"
                    id="kota"
                    type="text"

                    name="kota">
                    {city}
                    </select>
                  </div>
                  <div className="clearfix mb-2" />

                  <div className="float-start col-lg-3 col-md-3 col-12">
                    <label htmlFor="kodepos"><small><b>Kode Pos</b><b className="text-secondary">*</b></small></label>
                  </div>
                  <div className="float-start col-lg-9 col-md-9 col-12">
                    <input onChange={(e) => setkodepos(e.target.value)} className="form-control" id="kodepos" defaultValue={kodepos} type="number" name="kode_pos" required placeholder="Your Zip Code Here" />
                  </div>
                  <div className="clearfix mb-2" />

                  <div className="float-start col-lg-3 col-md-3 col-12">
                    <label htmlFor="numberphone"><small><b>No. Handphone</b><b className="text-secondary">*</b></small></label>
                  </div>
                  <div className="float-start col-lg-9 col-md-9 col-12">
                    <input onChange={(e) => setnomorhandphone(e.target.value)} className="form-control" id="number" defaultValue={nomorhandphone} type="number" name="hp" required placeholder="Your Number Phone Here" />
                  </div>
                  <div className="clearfix mb-2" />

                  <div className="float-start col-lg-3 col-md-3 col-12">
                    <label htmlFor="fax"><small><b>Fax</b><b className="text-secondary">*</b></small></label>
                  </div>
                  <div className="float-start col-lg-9 col-md-9 col-12">
                    <input onChange={(e) => setfaxuser(e.target.value)}  className="form-control" id="fax" type="text" name="fax" defaultValue={faxuser} required placeholder="Your Fax Here" />
                  </div>
                  <div className="clearfix mb-2" />                
                </form>
              </div>
            </div>
            <div className="clearfix" />
            <br /><br />
          </div>
        </div>
      </div>
      <div className="modal fade" id="gantifoto" tabIndex="-1" aria-labelledby="gantifotoLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                      <h1 className="modal-title fs-5" id="gantifotoLabel">Ganti Foto Profil</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                  </div>
                  <form onSubmit={handleSubmit(onSubmitFile)} encType="multipart/form-data">
                      <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="fotochange">Ganti Foto <b className="text-secondary">*</b></label><br />
                            <div className="">
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
      <Footer />
      <Boots />
    </div>
  )
  
}

export default EditProfile;
