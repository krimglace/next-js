import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

import styles from '../../styles/Home.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCheckToSlot, faClose, faPlus, faFutbol, faArrowRotateRight} from "@fortawesome/free-solid-svg-icons";

import swal from 'sweetalert';

const Pos = () => {

  async function cek(){
    document.querySelector('#lanjut').classList.remove('disable-link')
    document.querySelector('#lanjut').classList.remove('bg-blue')
    document.querySelector('#lanjut').classList.add('bg-primary')
  }

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
            <h4 className="text-center mt-5 mb-3">Pengumuman</h4>
            <br />
            <h6> 
              Sesuai dengan amanat Undang-Undang Nomor 11 Tahun 2020 Tentang Cipta Kerja dan Peraturan Pemerintah Nomor 5 Tahun 2021 Tentang Penyelenggaran Perizinan Berusaha Berbasis Risiko serta Presiden RI telah meresmikan penggunaan Online Single Submission (OSS) berbasis risiko dalam perizinan berusaha, pada Senin, 9 Agustus 2021.<br /><br />
              Dalam rangka mendukung dan menyukseskan penggunaan Online Single Submission (OSS) berbasis risiko dimaksud, Kementerian Komunikasi dan Informatika masih terus berkoordinasi dengan Badan Koordinasi Penanaman Modal (BKPM) agar perizinan dapat kembali berjalan dengan lancar seperti semula. Mengingat saat ini masih dalam masa transisi dalam penggunaan OSS berbasis Risiko maka sebagian proses dijalankan di Kementerian Komunikasi dan Informatika, sampai dengan penggunaan OSS RBA yang disediakan oleh BKPM dapat dijalankan sebagaimana mestinya.<br /><br />
              Pemohon agar dapat mengisikan permohonan verifikasi NIB pada lembar permohonan yang disediakan atau dapat melihat alur proses sementara pada link berikut.<br /><br />
              <br />
              Demikian pemberitahuan ini disampaikan, untuk menjadi perhatian.
              <br /><br />
              <div className="form-group">
                <label onClick={cek}>
                  <input type="checkbox" id="cek" name="cek" /> Baik, saya mengerti
                </label>
              </div>
              <br />
              <div className="form-group">
                <a href="#" type="submit" className="disable-link form-control bg-blue text-center text-light" id="lanjut"> Lanjut </a>
              </div>
            </h6>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Pos;