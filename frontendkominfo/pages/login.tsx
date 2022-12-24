import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import React, { useState, useEffect } from 'react'
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {useRouter} from 'next/router'
import nextAuth from 'next-auth' 
import nookies from 'nookies'
import styles from '../styles/Home.module.css'

import swal from 'sweetalert';

import jwt from 'jsonwebtoken'

export async function getServerSideProps(ctx){
  const cookies = nookies.get(ctx);

 if(cookies.email && cookies.iduser){
  return {
    redirect: {
      destination: '/user/dashboard'
    }
  }
 }

  return{
    props:{}
  }
}

function Login() {

  const [email, setemail] = useState<string>('')
  const [password, setpassword] = useState<string>('')
  const [userid, setUserid] = useState()
  const [codeToken, setcodeToken] = useState<string>('layanankominfo')

  const bearer = `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`

  const router = useRouter()
  const { handleSubmit, register, formState: { errors } } = useForm();
  async function onSubmit(values){
    let ccptc = document.querySelector('#inputcaptcha-login')
    let iccptc = document.querySelector('#capc')
    if(values.captcha == iccptc.value){
      let config = {
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_SITE}/api/user/login`,
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': bearer,
          'X-CSRF-TOKEN': ''
        },
        data: {
          "email": `${values.email}`,
          "password": `${values.password}`
        },
      };
      try {
        const res = await axios(config)
        const dataid = fetch(`${process.env.NEXT_PUBLIC_API_SITE}/api/user/detail?email=${values.email}`, {
          method: "GET",
          headers: {
            'accept': 'application/json',
            'Authorization': bearer,
            'X-CSRF-TOKEN': ''
          }
        })
        .then(response => response.json())
        .then(responseData => {

          const aktivasi = res.data.data;
          if(aktivasi.verified == 0){
            swal({
              title: "Gagal Masuk",
              text: "Akun anda belum diaktivasi",
              icon: "error",
            })
          } else {
            nookies.set(null, 'email', values.email)
            nookies.set(null, 'iduser', responseData.data.id_user)
            swal({
              title: "Berhasil Masuk",
              text: "Tunggu sebentar, anda akan diarahkan ke laman user",
              icon: "success",
              timer: 3000,
              
            })
            .then(next => {
              router.replace(`/user/dashboard`)
            });
          }
        })
      } catch(err){
        swal({
          title: "Gagal Masuk",
          text: "Username atau Password tidak ditemukan",
          icon: "error",
        })
        console.log(err)
      }
    } else{
      ccptc.value = ''
      swal({
          title: "Gagal Masuk",
          text: "Captcha Salah",
          icon: "error",
        })
    }
  } 

    var allChar = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    ] 
    function getCapctha(){
      let generatedText = "";
      for (let i = 0; i < 4; i++) {
        generatedText += allChar[Math.floor(Math.random() * allChar.length)];
      }
      document.querySelector("#inputcaptcha-login").value = "";
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

    async function reloadbuttonlogin(){
      getCapctha();
    };
    async function passclicklogin(){
      passwordshowlogin()
    }
    function passwordshowlogin() {
      if(document.querySelector('#password-login').type === 'password'){
        document.querySelector('#pass-click-login').classList.remove('fa-eye')
        document.querySelector('#pass-click-login').classList.add('fa-eye-slash')
        document.querySelector('#password-login').type = 'text'
      } else{
        document.querySelector('#pass-click-login').classList.remove('fa-eye-slash')
        document.querySelector('#pass-click-login').classList.add('fa-eye')
        document.querySelector('#password-login').type = 'password'
      }

    }

    useEffect(() => {
      getCapctha()
    }, [])

  return (
    <>
      <Head>
        <title>Portal Layanan Kominfo</title>
        <link rel="icon" href="/logo-kominfo-transparent.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
        integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer" />

      <main>
        <div className="float-start col-12 col-lg-6 col-md-6 left-login-register">
          <div className="form-login-register rounded me-lg-5 ms-lg-5 mt-lg-3 pt-lg-3 ps-lg-5 pe-lg-5 mt-md-2 pt-md-3 me-md-5 ms-md-5 ms-2 me-2 mt-5 p-3">
            <div className="text-center logo-responsive-login">
              <Image src="/logo-kominfo.png" width={141} height={100} alt="logo-kominfo" />
              <hr />
            </div>
            <h1 className="mt-lg-5 mt-md-5">Masuk</h1>
            <p>Belum punya akun ? <Link className="text-secondary" href="/register">Daftar</Link></p>
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
            <input
              name="codeToken"
              type="hidden"
              value={codeToken}
              onChange={(e) => setcodeToken(e.target.value)}
              />
              <div className="form-group">
                <label htmlFor="email">Email atau Username</label>
                <input 
                {...register("email", {
                  required: "username harus diisi",
                  minLength: {
                    value: 0,
                    message: "password minimal 6 karakter"
                  }
                })}
                type="text" id="email-login" value={email} onChange={(e) => setemail(e.target.value)} className="form-control p-2" name="email" placeholder="youremail@gmail.com"/>
              </div>
              <small className="text-secondary">{errors.email && errors.email.message}</small>
              <div className="form-group mt-3 mb-2">
                <label htmlFor="password">Password</label>
                <div className="input-group">
                  <input
                  {...register("password", {
                    required: "password harus diisi",
                    minLength: {
                      value: 6,
                      message: "password minimal 6 karakter"
                    }
                  })}
                  minLength="6" id="password-login" value={password} onChange={(e) => setpassword(e.target.value)} type="password" className="form-control p-2" name="password" placeholder="Password"/>
                  <span className="input-group-text bg-light"><i id="pass-click-login" onClick={passclicklogin} className="fas fa-eye pass-click" /></span>
                </div>
                <small className="text-secondary">{errors.password && errors.password.message}</small>
              </div>
              <div className="form-group">
                <input type="hidden" name="capt" id="capc" />
                <div className="mb-3">
                  <canvas id="canvas" width="150" height="50"></canvas>
                  <button id="reload-button-login" onClick={reloadbuttonlogin} type="button" className="reload-button bg-info btn border border-primary text-primary"><i className="fas fa-redo" /> </button>
                </div>
                <div className="input-group">

                  <input
                  {...register("captcha", {
                  required: "Captcha wajib diisi",
                  pattern: {
                    value: true,
                    message: "Captcha tidak valid"
                  },
                  minLength: {
                      value: 4,
                      message: "Captcha terdiri dari 6 karakter"
                    }
                  })}
                  id="inputcaptcha-login" type="text" className="form-control p-2" name="captcha" placeholder="Masukkan Captcha"/>
                </div>
                <small className="text-secondary">{errors.captcha && errors.captcha.message}</small>
                <div className="mt-1 border border-secondary alert alert-secondary d-none" id="responsecaptchaLogin">
                  <small id="captcha-text-login"></small>
                </div>
              </div>
              <div className="clearfix" />
              <div className="float-start">
                <input 
                {...register("cek", {})}
                type="checkbox" name="cek" id="IngatSaya" />
                <label className="ms-2" htmlFor="IngatSaya">Ingat Saya</label>
              </div>
              <div className="float-end">
                <Link href="/forgotpassword" className="lupapassword">Lupa Password</Link>
              </div>
              <div className="clearfix" />
              <div>
                <button id="masuk-login" className="masuk-register btn w-100 p-2 mt-4 btn-primary btn-outline-info">Masuk</button>
              </div>
            </form>
          </div>
        </div>
        <div className="float-start col-lg-6 col-md-6 bg-info right-login-register">
          <nav className="text-center mt-3">
            <ul className="cover-menu-login-register">
              <li><Link className="menu-login-register pb-2 me-3 ms-3 text-decoration-none" href="/"><strong>Beranda</strong></Link></li>
              <li><Link className="menu-login-register pb-2 me-3 ms-3 text-decoration-none" href="/faq"><strong>FAQ</strong></Link></li>
              <li><Link className="menu-login-register pb-2 me-3 ms-3 text-decoration-none" href="/hubungi"><strong>Hubungi Kami</strong></Link></li>
            </ul>
          </nav>
          <div className="logo-login-register d-flex flex-column justify-content-center align-items-center">
            <Image src="/logo-kominfo-transparent.png" width={180} height={200} alt="logo-kominfo"/>
            <h3 className="text-primary mt-4"><strong>PORTAL LAYANAN</strong></h3>
          </div>
        </div>
        <div className="clearfix" />
      </main>
    </>
  )

}

export default Login