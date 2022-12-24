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

const Newpenomoran = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();

  async function onSubmit(values){
    var captca = document.querySelector('#capc');

    if(captca.value == values.captchainput) {
      swal({
        title: "Berhasil Submit",
        text: "Captcha Benar",
        icon: "error",
      })  
    } else{
      swal({
        title: "Gagal Submit",
        text: "Captcha Salah",
        icon: "error",
      })
    }
  }
  function test(){
    var captca = document.querySelector('#capc');
    var icaptca = document.querySelector('#captcha-input');
  }

  var allChar = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  ]

  function pullCaptcha(){
    let generatedText = "";
      for (let i = 0; i < 4; i++) {
          generatedText += allChar[Math.floor(Math.random() * allChar.length)];
      }
      // console.log(generatedText)
      // console.log(document.querySelector("#inputcaptcha-login").value);
      document.querySelector("#capc").value = generatedText;

      let ctx = document.querySelector("#canvas").getContext("2d");
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const textColors = ["#11256C", "yellow", "green", "black"];
      const letterSpace = 110 / generatedText.length;
      for (let i = 0; i < generatedText.length; i++) {
          const xInitialSpace = 25;
          ctx.font = "30px Lobster, cursive";
          ctx.fillStyle = textColors[Math.floor(Math.random() * (3 - 0 + 1) + 0)];
          ctx.fillText(
            generatedText[i],
            xInitialSpace + i * letterSpace,
              Math.floor(Math.random() * (45 - 25 + 1) + 25),
              100
        );
    }
  }

  async function reloadCaptcha(){
    pullCaptcha()
    test()
  }
  useEffect(() => {
    pullCaptcha();
    test()
  }, [])
  
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
            <p>
              Untuk memastikan layanan perizinan Kominfo agar tidak berhenti beroperasi pada saat proses penyempurnaan OSS-RBA di BKPM, maka untuk sementara ini, silakan melakukan proses pengurusan Perizinan Penomoran (Nomor Baru) dengan cara mengisi form di bawah ini:
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group float-start col-lg-6 col-md-6 col-12">
                <div className="me-lg-2 me-md-2">
                  <label htmlFor="nib"><h6>NIB</h6></label>
                  <div className="input-group">
                    <div className="input-group-text bg-light">
                      <i className="fas fa-id-card" />
                    </div>
                    <input
                      {...register("nib")}
                      id="nib"
                      type="text"
                      className="form-control"
                      name="nib"
                      placeholder="Nomor Induk Berusaha" />
                </div>
                <p className="text-error text-red">{errors.nib && errors.nib.message}</p>
                </div>
              </div>
              <div className="form-group float-start col-lg-6 col-md-6 col-12">
                <div className="me-lg-2 me-md-2">
                  <label htmlFor="tanggalberlaku"><h6>Tanggal Berlaku NIB</h6></label>
                  <div className="input-group">
                    <div className="input-group-text bg-light">
                      <i className="fa-regular fa-calendar" />
                    </div>
                    <input id="tanggalberlaku" type="date" className="form-control" name="tanggalberlaku" />
                </div>
                </div>
              </div>
              <div className="clearfix" />
              <span>
                <small>Untuk Telekomunikasi Khusus, Penomoran (Instansi Pemerintah dan Badan Hukum Non Penyelenggara Telekomunikasi), tidak wajib mengisi NIB, Tanggal Berlaku NIB, KBLI dan Jenis Layanan.</small>
              </span>
              <div className="form-group mt-3">
                <label htmlFor="kbli"><h6>KBLI</h6></label>
                <select
                  {...register("kbli")}
                  name="kbli"
                  id="kbli"
                  className="form-control" 
                  onChange={(e) => {}}>

                  <option value="">---- Pilih KBLI ----</option>
                </select>
                <p className="text-error text-red">{errors.kbli && errors.kbli.message}</p>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="jenislayanan"><h6>Jenis Layanan</h6></label>
                <select
                  {...register("jenislayanan")}
                  name="jenislayanan"
                  id="jenislayanan"
                  className="form-control" 
                  onChange={(e) => {}}>

                  <option value="">---- Pilih Jenis Layanan ----</option>
                </select>
                <p className="text-error text-red">{errors.jenislayanan && errors.jenislayanan.message}</p>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="jenispermohonan"><h6>Jenis Permohonan <b className="text-red">*</b></h6></label>
                <select
                  {...register("jenispermohonan", {
                            required: "Pilih Jenis Permohonan Terlebih Dahulu",
                            minLength: {
                                value: 0,
                                message: "Pilih Jenis Permohonan Terlebih Dahulu"
                              }
                            })}
                  name="jenispermohonan"
                  id="jenispermohonan"
                  className="form-control" 
                  onChange={(e) => {}}>

                  <option value="">---- Pilih Jenis Permohonan ----</option>
                </select>
                <p className="text-error text-red">{errors.jenispermohonan && errors.jenispermohonan.message}</p>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="tanggalberlaku"><h6>Tautan Nomor yang Dapat Dipilih</h6></label><br />
                <a href="https://komin.fo/Alokasi-ISPC" className="text-blue">https://komin.fo/Alokasi-ISPC</a><br />
                <p>Tautan nomor adalah link dokumen daftar kode akses yang tersedia dan dapat dipilih.</p>
              </div>
              <div className="form-group mt-3">
                <div className="me-lg-2 me-md-2">
                  <label htmlFor="kodeakses"><h6>Kode Akses <b className="text-red">*</b></h6></label>
                  <div className="input-group">
                    <div className="input-group-text bg-light">
                      <i className="fa-solid fa-keyboard"></i>
                    </div>
                    <input
                      {...register("kodeakses", {
                                required: "Kode Akses wajib diisi",
                                minLength: {
                                    value: 0,
                                    message: "Kode Akses wajib diisi"
                                  }
                                })}
                      type="text"
                      id="kodeakses"
                      className="form-control"
                      name="kodeakses"
                      placeholder="Kode Akses" />
                </div>
                <p className="text-error text-red">{errors.kodeakses && errors.kodeakses.message}</p>
                </div>
              </div>
              <div className="form-group mt-3">
                <div className="me-lg-2 me-md-2">
                  <label htmlFor="kodeakses"><h6>Dokumen Persyaratan <b className="text-red">*</b></h6></label>
                  <div className="input-group">
                    <div className="input-group-text bg-light">
                      <i className="fa-solid fa-file"></i>
                    </div>
                    <input
                      {...register("dokumenpersyaratan", {
                                required: "Dokumen persyaratan wajib diisi",
                                minLength: {
                                    value: 0,
                                    message: "Dokumen persyaratan wajib diisi"
                                  }
                                })}
                      type="file"
                      id="dokumenpersyaratan"
                      className="form-control"
                      name="dokumenpersyaratan" />
                </div>
                <p className="text-error text-red">{errors.dokumenpersyaratan && errors.dokumenpersyaratan.message}</p>
                </div>
              </div>
              <p>File harus berekstensi .zip atau .pdf dengan maks. total ukuran upload 20mb dan dapat memilih lebih dari 1 file.</p>
              <br />
              <p>Berikut dokumen yang menjadi persyaratan pada jenis permohonan yang anda pilih:</p>
              <div className="d-lg-block d-md-block d-none">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Jenis Permohonan</th>
                      <th>Persyaratan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Permohonan Baru Penetapan Penomoran Telekomunikasi</td>
                      <td>
                        <ul>
                          <li className="ullistalphabet">a. Bagi Pelaku Usaha Bidang Telekomunikasi:</li>
                          <ol>
                            <li>Surat permohonan penetapan penomoran telekomunikasi yang ditujukan kepada Direktur Telekomunikasi dengan menyampaikan kode akses yang dimohonkan dan rencana peruntukan penomoran yang ditandatangani Pimpinan Perusahaan terkait.</li>
                            <li>NIB dan lampiran KBLI.</li>
                            <li>Salinan NPWP.</li>
                            <li>Bagi penyelenggara eksisting, melampirkan dokumen izin penyelenggaraan</li>
                          </ol>
                          <li className="ullistalphabet">b. Bagi Instansi Pemerintah dan Badan Usaha Non Pelaku Usaha Bidang Telekomunikasi:</li>
                          <ol>
                            <li>Surat permohonan penetapan penomoran telekomunikasi yang ditujukan kepada Direktur Telekomunikasi dengan menyampaikan kode akses yang dimohonkan dan rencana peruntukan penomoran yang ditandatangani Pimpinan Instansi/Perusahaan terkait.</li>
                            <li>Salinan NPWP.</li>
                            <li>Bagi Badan Usaha, melampirkan akta pendirian perusahaan dan akta perubahan nama perusahaan terakhir (apabila ada) beserta pengesahan dari Kementerian Hukum dan HAM.</li>
                            <li>Bagi Instansi Pemerintah, melampirkan dokumen pembentukan Instansi</li>
                          </ol>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="d-lg-none d-md-none d-block">
                <table className="table table-striped table-bordered">
                  <tbody>
                    <tr>
                      <th>Jenis Permohonan</th>
                    </tr>
                    <tr>
                      <td>Permohonan Baru Penetapan Penomoran Telekomunikasi</td>
                    </tr>
                    <tr>
                      <th>Persyaratan</th>
                    </tr>
                    <tr>
                      <td>
                        <ul>
                          <li className="ullistalphabet">a. Bagi Pelaku Usaha Bidang Telekomunikasi:</li>
                          <ol>
                            <li>Surat permohonan penetapan penomoran telekomunikasi yang ditujukan kepada Direktur Telekomunikasi dengan menyampaikan kode akses yang dimohonkan dan rencana peruntukan penomoran yang ditandatangani Pimpinan Perusahaan terkait.</li>
                            <li>NIB dan lampiran KBLI.</li>
                            <li>Salinan NPWP.</li>
                            <li>Bagi penyelenggara eksisting, melampirkan dokumen izin penyelenggaraan</li>
                          </ol>
                          <li className="ullistalphabet">b. Bagi Instansi Pemerintah dan Badan Usaha Non Pelaku Usaha Bidang Telekomunikasi:</li>
                          <ol>
                            <li>Surat permohonan penetapan penomoran telekomunikasi yang ditujukan kepada Direktur Telekomunikasi dengan menyampaikan kode akses yang dimohonkan dan rencana peruntukan penomoran yang ditandatangani Pimpinan Instansi/Perusahaan terkait.</li>
                            <li>Salinan NPWP.</li>
                            <li>Bagi Badan Usaha, melampirkan akta pendirian perusahaan dan akta perubahan nama perusahaan terakhir (apabila ada) beserta pengesahan dari Kementerian Hukum dan HAM.</li>
                            <li>Bagi Instansi Pemerintah, melampirkan dokumen pembentukan Instansi</li>
                          </ol>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="form-group mt-3">
                <div className="me-lg-2 me-md-2">
                  <label htmlFor="namaperusahaan"><h6>Nama Perusahaan/Instansi <b className="text-red">*</b></h6></label>
                  <div className="input-group">
                    <div className="input-group-text bg-light">
                      <i className="fa-regular fa-building"></i>
                    </div>
                    <input
                      {...register("namaperusahaan", {
                                required: "Nama Perusahaan wajib diisi",
                                minLength: {
                                    value: 0,
                                    message: "Nama Perusahaan wajib diisi"
                                  }
                                })}
                      type="text"
                      id="namaperusahaan"
                      className="form-control"
                      name="namaperusahaan"
                      placeholder="Nama Perusahaan/Instansi" />
                </div>
                <p className="text-error text-red">{errors.namaperusahaan && errors.namaperusahaan.message}</p>
                </div>
              </div>
              <div className="form-group mt-3">
                <div className="me-lg-2 me-md-2">
                  <label htmlFor="alamat_perusahaan"><h6>Alamat Sesuai Akte Terakhir/Alamat Instansi Pemerintah <b className="text-red">*</b></h6></label>
                  <textarea 
                    {...register("alamat_perusahaan", {
                      required: "Alamat Perusahaan wajib diisi",
                      minLength: {
                          value: 0,
                          message: "Alamat Perusahaan wajib diisi"
                        }
                      })}
                    name="alamat_perusahaan"
                    id="alamat_perusahaan"
                    placeholder="Komplek badan usaha RT RW, Kota/Kab Provinsi"
                    rows="2"
                    className="form-control"></textarea>
                    
                    <p className="text-error text-red">{errors.alamat_perusahaan && errors.alamat_perusahaan.message}</p>
                </div>
              </div>
              <div className="form-group  float-start col-lg-6 col-md-6 col-12">
                <div className="me-lg-2 me-md-2">
                  <label htmlFor="namadepan"><h6>Nama Depan Penanggungjawab <b className="text-red">*</b></h6></label>
                  <div className="input-group">
                    <div className="input-group-text bg-light">
                      <i className="fas fa-user" />
                    </div>
                    <input
                      {...register("namadepan", {
                                required: "Nama depan wajib diisi",
                                minLength: {
                                    value: 0,
                                    message: "Nama depan wajib diisi"
                                  }
                                })}
                      id="namadepan"
                      type="text"
                      className="form-control"
                      name="namadepan"
                      placeholder="Nama Depan" />
                </div>
                <p className="text-error text-red">{errors.namadepan && errors.namadepan.message}</p>
                </div>
              </div>
              <div className="form-group  float-start col-lg-6 col-md-6 col-12">
                <div className="me-lg-2 me-md-2">
                  <label htmlFor="namabelakang"><h6>Nama Belakang Penanggungjawab <b className="text-red">*</b></h6></label>
                  <div className="input-group">
                    <div className="input-group-text bg-light">
                      <i className="fas fa-user" />
                    </div>
                    <input
                      {...register("namabelakang", {
                                required: "Nama belakang wajib diisi",
                                minLength: {
                                    value: 0,
                                    message: "Nama belakang wajib diisi"
                                  }
                                })}
                      id="namabelakang"
                      type="text"
                      className="form-control"
                      name="namabelakang"
                      placeholder="Nama Belakang" />
                </div>
                <p className="text-error text-red">{errors.namabelakang && errors.namabelakang.message}</p>
                </div>
              </div>
              <div className="clearfix" />
              <div className="form-group">
                <div className="me-lg-2 me-md-2">
                  <label htmlFor="jabatan"><h6>Jabatan <b className="text-red">*</b></h6></label>
                  <div className="input-group">
                    <div className="input-group-text bg-light">
                      <i className="fa-solid fa-clipboard-user"></i>
                    </div>
                    <input
                      {...register("jabatan", {
                                required: "Jabatan wajib diisi",
                                minLength: {
                                    value: 0,
                                    message: "Jabatan wajib diisi"
                                  }
                                })}
                      type="text"
                      id="jabatan"
                      className="form-control"
                      name="jabatan"
                      placeholder="Jabatan Penanggungjawab" />
                </div>
                <p className="text-error text-red">{errors.jabatan && errors.jabatan.message}</p>
                </div>
              </div>
              <div className="form-group">
                <div className="me-lg-2 me-md-2">
                  <label htmlFor="email"><h6>Email <b className="text-red">*</b></h6></label>
                  <div className="input-group">
                    <div className="input-group-text bg-light">
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <input
                      {...register("email", {
                                required: "Email wajib diisi",
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Email tidak valid"
                                },
                                minLength: {
                                    value: 0,
                                    message: "Email wajib diisi"
                                  }
                                })}
                      type="text"
                      id="email"
                      className="form-control"
                      name="email"
                      placeholder="Email" />
                </div>
                <p className="text-error text-red">{errors.email && errors.email.message}</p>
                </div>
              </div>
              <div className="form-group">
                <div className="me-lg-2 me-md-2">
                  <label htmlFor="nomorhp"><h6>Nomor HP yang dapat dihubungi <b className="text-red">*</b></h6></label>
                  <div className="input-group">
                    <div className="input-group-text bg-light">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <input
                      {...register("nomorhp", {
                                required: "nomor Hp wajib diisi",
                                minLength: {
                                    value: 0,
                                    message: "Nomor Hp wajib diisi"
                                  }
                                })}
                      type="number"
                      id="nomorhp"
                      className="form-control"
                      name="nomorhp"
                      placeholder="0815xxxxxxxx" />
                </div>
                <p className="text-error text-red">{errors.nomorhp && errors.nomorhp.message}</p>
                </div>
              </div>
              <div className="form-group">
                <input type="hidden" name="capt" id="capc" defaultValue="" />
                        <div className="cover-captcha">
                          <canvas id="canvas" width="150" height="50"></canvas>
                          <button onClick={reloadCaptcha} type="button" className="btn-captcha bg-info btn border border-primary text-primary">
                            <i className="fas fa-redo" />
                          </button>
                        </div>
                        <input 
                          maxLength="4"
                          type="text"
                          placeholder="Kode Unik"
                          className="form-control" 
                          id="captcha-input" 
                          name="captchainput" 
                          {...register("captchainput",{
                                required: "Captcha wajib diisi",
                                minLength: {
                                    value: 4,
                                    message: "Captcha terdiri dari 4 karakter"
                                  }
                                })} />
                        <p className="text-error text-red">{errors.captchainput && errors.captchainput.message}</p>
              </div>
              <div className="form-group">
                <button className="btn btn-primary form-control">Kirim</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Newpenomoran;