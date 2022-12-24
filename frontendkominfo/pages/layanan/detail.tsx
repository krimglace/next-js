import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next"
import cache from "src/cache"
import nookies from 'nookies';
import cookie from "js-cookie";

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import swal from 'sweetalert';
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCircle, faArrowRight, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const bearer = `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query.id;

  // console.log(data)
  const fetcher = async () => {
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
    return layanan.data
  }

  const datailforLayanan = await cache.fetch(
    `id: ${id}`,
    fetcher,
    60 * 60*24
  );
  const cookies = nookies.get(ctx);

  return {
    props: {
      cookies: cookies,
      layanan: datailforLayanan
    },
  }
}

const DetailLayanan = ({cookies, layanan}) => {
    

  // console.log(layanan)
  return(
      <>
        <Header cookie={cookies} />
        <div className="container mt-3">
          <Link href="/" className="text-secondary">Beranda /</Link> <Link href="/alllayanan" className="text-secondary">Layanan /</Link> {layanan.title}
          <div className="card-layanan">
            <div className=" mt-4">
              <div className="imagedetail-layanan text-center bg-info p-5 rounded">
               {
                  layanan.icon === null || layanan.icon === '' ? 
                  <img src="/logo.png" width="25%" alt="" /> : 
                  <img width="25%" src={`${process.env.NEXT_PUBLIC_API_SITE}/menu/${layanan.icon}`} />
                }
              </div>
              <h3 className="mt-3 mb-2"><strong>{layanan.title}</strong></h3>
              {layanan.description}
              <br />
              <div className="float-start text-end col-12 col-md-3 col-lg-2 mt-2">
                <a href={layanan.url} className="text-light link-kunjungi-pelayanan bg-blue pt-lg-1 pb-lg-1 ps-lg-2 pe-lg-2 pt-md-2 pb-md-2 ps-md-3 pe-md-3  rounded-pill w-100 btn">Kunjungi <FontAwesomeIcon className="arrow-kunjungi" icon={faArrowRight} /></a>
              </div>
              <div className="clearfix" />
            </div>
          </div>
          <br />
        </div>
        <Footer />
    </>
  )
}

export default DetailLayanan;