import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

import styles from '../../styles/Home.module.css'

import {useForm} from 'react-hook-form';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCheckToSlot, faClose, faPlus, faFutbol, faArrowRotateRight} from "@fortawesome/free-solid-svg-icons";

import swal from 'sweetalert';

const Sementaralayanan = () => {
  
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
        integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer" />
      <div className="bg-lightgray pb-1">
        <div className="layanan-sementara">
        </div>
        <div className="container">
          <div className="content-layanan-sementara bg-light">
            <h4 className="text-center">Layanan Sementara Perizinan KOMINFO</h4>
            <br />
            <h4 className="text-center">Telekomunikasi Khusus</h4>
            <br />
            <p>
              Silahkan pilih menu di bawah ini :
            </p>
            <div className="form-group mb-2">
              <Link href="/layanan-sementara/permohonan-baru" className="btn btn-primary form-control pt-2 pb-2">Permohonan Baru</Link>
            </div>
            <div className="form-group mb-2">
              <Link href="/layanan-sementara/ulo" className="btn btn-primary form-control pt-2 pb-2">ULO</Link>
            </div>
            <div className="form-group mb-2">
              <Link href="/layanan-sementara/penomoran-baru" className="btn btn-primary form-control pt-2 pb-2">Penomoran Baru</Link>
            </div>
            <div className="form-group mb-2">
              <Link href="/layanan-sementara/penyesuaian-izin" className="btn btn-primary form-control pt-2 pb-2">Penyesuaian Izin</Link>
            </div>
            <div className="form-group mb-2">
              <Link href="/layanan-sementara/syarat-telsus" className="btn btn-primary form-control pt-2 pb-2">Syarat TELSUS</Link>
            </div>
            <div className="form-group mb-2">
              <Link href="/layanan-sementara/syarat-jasatel" className="btn btn-primary form-control pt-2 pb-2">Syarat JASATEL</Link>
            </div>
            <div className="form-group mb-2">
              <Link href="/layanan-sementara/syarat-jatel" className="btn btn-primary form-control pt-2 pb-2">Syarat JATEL</Link>
            </div>
            <div className="form-group mb-2">
              <Link href="/layanan-sementara/syarat-penomoran" className="btn btn-primary form-control pt-2 pb-2">Syarat Penomoran</Link>
            </div>
            <div className="form-group mb-2">
              <Link href="/layanan-sementara/syarat-pos" className="btn btn-primary form-control pt-2 pb-2">Syarat Pos</Link>
            </div>
            <div className="form-group mb-2">
              <Link href="/faq" className="btn btn-primary form-control pt-2 pb-2">FAQ</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Sementaralayanan;