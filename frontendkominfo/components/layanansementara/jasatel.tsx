import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

import styles from '../../styles/Home.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCheckToSlot, faClose, faPlus, faFutbol, faArrowRotateRight} from "@fortawesome/free-solid-svg-icons";

import swal from 'sweetalert';

const Jasatel = () => {

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
            <h4 className="text-center">Maklumat Pelayanan</h4>
            <br />
            <h4 className="text-center">Perizinan Telekomunikasi</h4>
            <br />
            <h6>
              "Dengan ini, Direktorat Telekomunikasi menyatakan:
              <ol>
              <br />
                <li>Sanggup menyelenggarakan pelayanan perizinan telekomunikasi sesuai standar pelayanan.</li><br />
                <li>Memberikan pelayanan sesuai dengan kewajiban dan akan melakukan perbaikan secara terus menerus.</li><br />
                <li>Bersedia menerima sanksi, dan/atau memberikan kompensasi apabila pelayanan yang diberikan tidak sesuai standar."</li><br />
              </ol>
            </h6>
            <br />
            <h6 className="text-end">
              Jakarta, 24 Maret 2022<br /><br /><br />
              Direktur Telekomunikasi<br /><br />
              ttd<br /><br />
              Aju Widya Sari
            </h6>
            <h6>
              Standar Pelayanan Perizinan Telekomunikasi dapat diunduh <a className="text-blue" href="https://layanan.kominfo.go.id/layanan-sementara/document/Kepdirtel_No_97_Tahun_2022_Standar_Pelayanan_Perizinan_Telekomunikasi">di sini</a>.
            </h6>
            <h4 className="text-center mt-5 mb-3">Pengumuman</h4>
            <br />
            <h6>
              Sesuai dengan amanat Undang-Undang Nomor 11 Tahun 2020 Tentang Cipta Kerja dan Peraturan Pemerintah Nomor 5 Tahun 2021 Tentang Penyelenggaran Perizinan Berusaha Berbasis Risiko serta Presiden RI telah meresmikan penggunaan Online Single Submission (OSS) berbasis risiko dalam perizinan berusaha, pada Senin, 9 Agustus 2021.<br /><br />
              Dalam rangka mendukung dan menyukseskan penggunaan Online Single Submission (OSS) berbasis risiko dimaksud dan mengingat saat ini masih dalam masa transisi dalam penggunaan OSS berbasis Risiko, maka sebagian proses dijalankan sebagaimana dibawah ini, sampai dengan penggunaan OSS RBA yang disediakan oleh BKPM dapat dijalankan sebagaimana mestinya yaitu:<br /><br />
              <ol>
                <li>
                  Setelah Pemohon Berizinan Berusaha mendapatkan Nomor Induk Berusaha (NIB) melalui OSS RBA, agar selanjutnya Pemohon Perizinan Berusaha masuk ke portal pelayanan publik Kominfo (<a href="https://layanan.kominfo.go.id" className="text-blue">https://layanan.kominfo.go.id</a>) untuk mengisi formulir yang disediakan. Formulir yang disediakan dalam portal layanan publik Kominfo terdiri atas pilihan formulir sebagai berikut:<br />
                  <ol className="mt-3 alphalower">
                    <li>Permohonan Baru: ditujukan bagi pemohon izin penyelenggaraan telekomunikasi, baik pemohon baru maupun pemohon yang telah pernah mengajukan permohonan di aplikasi OSS 1.1 (OSS versi sebelum OSS RBA) namun belum melakukan pemenuhan dokumen perizinan.</li>
                    <br />
                    <li>Penyesuaian Izin: ditujukan bagi pemohon yang telah mendapatkan izin penyelenggaraan telekomunikasi namun belum pernah memiliki Nomor Izin Berusaha (NIB).</li>
                    <br />
                    <li>Uji Laik Operasi (ULO): ditujukan bagi pemohon izin penyelenggaraan telekomunikasi yang telah pernah mengajukan permohonan di aplikasi OSS 1.1 (OSS versi sebelum OSS RBA) dan sudah lulus pemenuhan dokumen perizinan namun belum dilakukan proses ULO.</li>
                    <br />
                  </ol>
                  Apabila pemohon telah mengisi pilihan formulir sebagaimana tersebut di atas, pemohon akan mendapatkan konfirmasi email dari petugas Kominfo untuk mengikuti tahap berikutnya.
                </li>
                <br />
                <li>
                  Setelah pemohon mendapatkan konfirmasi email dari petugas Kominfo sebagaimana butir 1 (satu) diatas, pemohon selanjutnya agar mengirimkan seluruh dokumen persyaratan perizinan berusaha sesuai dengan Lampiran 2 Peraturan Pemerintah Nomor 5 Tahun 2021 tentang Penyelenggaran Perizinan Berusaha Berbasis Risiko melalui email kepada petugas Kominfo, untuk kemudian akan dilakukan proses verifikasi dokumen persyaratan perizinan berusaha. Dalam hal dokumen persyaratan perizinan berusaha dimaksud telah dinyatakan lengkap dan sesuai dengan ketentuan peraturan perundang-undangan, maka akan dilaksanakan proses Uji Laik Operasi (ULO).
                </li>
                <br />
                <li>
                  Dalam hal dokumen persyaratan perizinan berusaha telah dinyatakan lengkap dan terverifikasi serta pemohon telah dinyatakan lulus ULO berdasarkan Surat Keterangan Laik Operasi (SKLO) oleh Kominfo, maka pemohon selanjutnya agar mengirimkan seluruh dokumen pemenuhan persyaratan berusaha yang telah terverifikasi dan SKLO dimaksud ke dalam OSS RBA untuk proses selanjutnya di OSS RBA.
                </li>
              </ol>
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
export default Jasatel;