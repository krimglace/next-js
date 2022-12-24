import React, { useEffect, useState } from "react";

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import swal from 'sweetalert';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {useRouter} from 'next/router'
import nextAuth from 'next-auth'
import {useForm} from 'react-hook-form';
import nookies from 'nookies';
import cookie from "js-cookie";
import { parse } from 'node-html-parser';
import { DOMParser } from 'DOMParser'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCircle, faArrowRight, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const bearer = `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`

export async function getServerSideProps(ctx){


  const id = ctx.query.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SITE}/api/layanan/${id}`,
                            {
                              method: "GET",
                              headers: {
                                'accept': 'application/json',
                                'Authorization': bearer,
                                'X-CSRF-TOKEN': ''
                              }
                            }
                          )

  const layanan = await res.json();
  const cookies = nookies.get(ctx);

  if(ctx.query.id == null){
    const que = ''
    return {
        props: { layanan, que },
    }
  } else{
    const que = ctx.query.id

    return {
        props: { cookies: cookies, layanan, que },
    }
  }
  
}


const Layanan = ({cookies, layanan, que}) => {
  const router = useRouter()
  const { handleSubmit, register, formState: { errors } } = useForm();
  const idLayanan = que
  const [showLayananPage,setshowLayananPage ] = useState()

  let displayData, displayDataPage, displayDataFaq, displayTitle, displayButton

  useEffect(function pullPage(){
    swal({
          title: "Loading ...",
          text: "Silahkan tunggu sebentar",
          showSpinner: true,
          timer: 1000,
          
        });
    var api = `${process.env.NEXT_PUBLIC_API_SITE}/api/layanan?parent=${idLayanan}`;
    fetch(api, {
      method: "GET",
      headers: {
        'accept': 'application/json',
        'Authorization': bearer,
        'X-CSRF-TOKEN': ''
      }
    })
    .then(response => response.json())
    .then(responseDataPage => {
      displayDataPage = responseDataPage.data.map(function(todo) {
        let kalimat2
        const imageUrl = `${process.env.NEXT_PUBLIC_API_SITE}/menu/`
        let htmlstring2 = todo.description; 
        const parser2 = new DOMParser();
        const doc2 = parser2.parseFromString(htmlstring2, 'text/html');
        if(doc2.documentElement == null){
          kalimat2 = todo.description
        } else {
          kalimat2 = doc2.documentElement.textContent;
        }

        return(
          <div className="float-start col-lg-3 col-6" key={todo.id}>
            <div className="h-88-card laycard rounded border m-1 m-lg-3 pb-2">
              <div className="text-center pt-3 pb-3 bg-info rounded-top">
               {
                todo.icon === null || todo.icon === '' || todo.icon === undefined ? 
                <img src="/logo.png" alt="" className="w-lg-100 w-25 m-4" /> : 
                <img src={imageUrl + todo.icon}  className="w-lg-100 w-25 m-4" alt={todo.icon} />
              }
              </div>
              <div className="me-2 ms-2 mt-1">
                <h5 className="text-blue mb-2 mt-1"><strong>{todo.title}</strong></h5>
                <p className="mb-4">{kalimat2.substr(0,45)}</p>
                <div className="link-des p-2">
                  <hr className="mb-lg-4 mb-md-4 mb-1" />
                  <div className="float-start col-12 detail-pelayanan col-lg-5 mt-lg-3">
                    <a href={`/layanan/detail?id=${todo.id}`} className="text-decoration-none">Lihat Detail</a>
                  </div>
                  <div className="float-end col-12 col-lg-7 mt-sm-2">
                    <a href={todo.url} className="text-light link-kunjungi-pelayanan bg-blue rounded-pill btn">Kunjungi <FontAwesomeIcon className="arrow-kunjungi" icon={faArrowRight} /></a>
                  </div>
                  <div className="clearfix" />
              </div>
              </div>
            </div>
        </div>
        )
      })
      // console.log(responseDataPage.data)
      setshowLayananPage(displayDataPage)
    })
  }, [])

  async function onSubmit(values){

    try {
      router.push(`/layanan/filter?search=${values.search}`)  
    } catch(err){
      console.log(err)
    }
  } 

  if(que == '' || que == null){
    return(
        <>

        <Header cookie={cookies} />
        <div className="container">
          <div className="mt-5 mb-5 d-flex flex-column justify-content-center align-items-center w-100">
            <div className="text-center border border-primary card-register-redirect">
              <img src="/logo-kominfo.png" className="card-img-top-1" alt="logo-kominfo" />
              <div className="card-body">
                <h5 className="card-title">Halaman tidak ditemukan</h5>
                <p className="card-text"><Link href="/">Klik untuk beralih ke halaman beranda ...</Link></p>
                <div className="box-load">
                  <div className="loading1" />
                  <div className="loading2" />
                  <div className="loading3" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  } else{
    return(
        <>

        <Header cookie={cookies} />
        <div className="container mt-3">
          <Link href="/" className="text-secondary">Beranda /</Link> {layanan.data.title}
          <div className="row mt-2 form-search-beranda">
            <div className="title-search float-start col-md-6 col-lg-6 h-100 mt-2 mt-md-3 mt-lg-3">
              <h4><strong>{layanan.data.title}</strong></h4>
            </div>
            <div className="float-start col-md-6">
              <form onSubmit={handleSubmit(onSubmit)} className="form-group">
                <input
                  {...register("search", {
                    required: "required"
                  })}
                  name="search"
                  required
                  className="form-control w-100 rounded-pill mt-lg-0 mt-2 mt-md-0 shadow p-lg-3 p-md-3 pt-2 pb-2 pe-3 ps-3 mb-5 bg-white rounded"
                  placeholder="Telusuri layanan kominfo disini" />

                <button type="submit" className="border-0 search-page-beranda me-lg-3 me-md-3 me-2 rounded-circle bg-primary text-light">
                  <FontAwesomeIcon className="iconsearch" icon={faSearch} /> 
                </button>
              </form>
            </div>
          </div>
          <div className="card-layanan">
            <div className="">
              <div>
                {showLayananPage}
                <div className="clearfix" />
              </div>
            </div>
          </div>
          <br />
        </div>
        <Footer />
      </>
    )
  }
}

export default Layanan;