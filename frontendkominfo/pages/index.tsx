import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import React, { useState, useEffect } from 'react'
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {useRouter} from 'next/router'
import nextAuth from 'next-auth' 
import swal from 'sweetalert';
import { GetServerSideProps } from "next"
import cache from 'src/cache'
import nookies from 'nookies';
import cookie from "js-cookie";

import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Layanan from '../components/layananlandingresponsive';
import Banner from '../components/banner';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";


const bearer = `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cekdata = 1;
  const forbanner = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_SITE}/api/pengumuman`, {
        method: "GET",
        headers: {
          'accept': 'application/json',
          'Authorization': bearer,
          'X-CSRF-TOKEN': ''
        }
      })

      const forbanner = await res.json();
      return forbanner.data
      console.log(forbanner)
  }
  const forlayananpulljson = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_SITE}/api/layanan?is_parent=1&type=landing`, {
        method: "GET",
        headers: {
          'accept': 'application/json',
          'Authorization': bearer,
          'X-CSRF-TOKEN': ''
        }
      })

      const forlayananpulljson = await res.json();
      return forlayananpulljson.data
  }
  const forpullCekfaq = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_SITE}/api/faq?primary=1`, {
        method: "GET",
        headers: {
          'accept': 'application/json',
          'Authorization': bearer,
          'X-CSRF-TOKEN': ''
        }
      })

      const forpullCekfaq = await res.json();
      return forpullCekfaq.data
  }
  const forpullCekfavorite = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_SITE}/api/layanan?is_parent=0&type=landing&popular=1&limit=4`, {
        method: "GET",
        headers: {
          'accept': 'application/json',
          'Authorization': bearer,
          'X-CSRF-TOKEN': ''
        }
      })

      const forpullCekfavorite = await res.json();
      return forpullCekfavorite.data
  }

  const datailforforbanner = await cache.fetch(
      `number: ${cekdata}`,
      forbanner,
      60 * 60*24
  );
  const datailforforlayananpulljson = await cache.fetch(
      `number: ${cekdata}`,
      forlayananpulljson,
      60 * 60*24
  );
  const datailforforpullCekfaq = await cache.fetch(
      `number: ${cekdata}`,
      forpullCekfaq,
      60 * 60*24
  );
  const datailforforpullCekfavorite = await cache.fetch(
      `number: ${cekdata}`,
      forpullCekfavorite,
      60 * 60*24
  );
  const cookies = nookies.get(ctx);


  return {
      props: {
        cookies: cookies,
        forbanner: datailforforbanner,
        forlayananpulljson: datailforforlayananpulljson,
        forpullCekfaq: datailforforpullCekfaq,
        forpullCekfavorite: datailforforpullCekfavorite
      },
  }
}

export default function Home({cookies, forbanner, forlayananpulljson, forpullCekfaq, forpullCekfavorite}) {
  const router = useRouter()
  const { handleSubmit, register, formState: { errors } } = useForm();
  async function onSubmit(values){

    try {
      router.push(`/layanan/filter?search=${values.search}`)  
    } catch(err){
      console.log(err)
    }
    //console.log(values);
  } 
  return (
    <div>
      
      <Header cookie={cookies} />
      <div className="container">

        <Banner forbanners={forbanner} />
        <br className="responsive-hidden" />

        <div className="row mt-5 form-search-beranda">
          <div className="title-search float-start col-md-6 col-lg-6 h-100 mt-2 mt-md-3 mt-lg-3">
            <h4><strong>Layanan apa yang anda cari ?</strong></h4>
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

        <Layanan forlayananpulljson={forlayananpulljson} forpullCekfaq={forpullCekfaq} forpullCekfavorite={forpullCekfavorite} />
        
        <br />
      </div>
      <Footer />
    </div>
  )
}