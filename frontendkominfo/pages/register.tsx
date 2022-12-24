import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import {useEffect} from 'react'
import {useRouter} from 'next/router'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {useForm} from 'react-hook-form';
import axios from 'axios';
import nookies from 'nookies'

import styles from '../styles/Home.module.css'
import Navbar from '../components/Widget/navbar'

import swal from 'sweetalert';

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

function Register() {
  
  const router = useRouter()
  const { handleSubmit, register, formState: { errors } } = useForm();
  async function onSubmit(values){
    let iccptc = document.querySelector('#capc')

  if(values.captcha == iccptc.value) {  
    let config = {
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_API_SITE}/api/user/register`,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': ''
      },
      data: {
          "first_name": `${values.first_name}`,
          "last_name": `${values.last_name}`,
          "email": `${values.email}`,
          "password": `${values.password}`,
          "confirm_password": `${values.confirm_password}`
      },
    };
   try {
      console.log(config)
      const response = await axios(config)
      // console.log(response);
      swal({
        title: "Berhasil Daftar",
        text: "Periksa email anda... anda akan diarahkan ke halaman konfirmasi",
        icon: "success",
        timer: 3000,
        
      }).then(next => {
        router.push(`/konfirmasiemail?email=${values.email}`)
      });

    } catch(err){
      swal({
        title: "Gagal Daftar",
        text: "Email sudah digunakan",
        icon: "error",
      })
      console.log(err)
    }
  } else{
    swal({
        title: "Gagal Daftar",
        text: "Captcha Salah",
        icon: "error",
      })
  }
    //console.log(values);
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

    async function focuspassword1(){
      document.querySelector("#warning-password").classList.remove('d-none')
    }
    async function keyuppassword1(){
      var lowerCaseLetters = /[a-z]/g;
      var upperCaseLetters = /[A-Z]/g;
      var numbers = /[0-9]/g;

      if(document.querySelector("#password1").value.match(lowerCaseLetters) && 
        document.querySelector("#password1").value.match(upperCaseLetters) && 
        document.querySelector("#password1").value.match(numbers) && 
        document.querySelector("#password1").value.length >= 6) {  
        document.querySelector("#warning-password").classList.add('d-none')
      }
    }
    async function focuspassword2(){
      document.querySelector("#warning-password-confirm").classList.remove('d-none')
    }
    async function keyuppassword2(){
      if(document.querySelector("#password1").value == document.querySelector("#confirmpassword").value) {  
        document.querySelector("#warning-password-confirm").classList.add('d-none')
        document.querySelector('#masuk-register').disabled = false
      } else{
        document.querySelector("#warning-password-confirm").classList.remove('d-none')
      }
    }
    function passregisclick() {
      if(document.querySelector('#password1').type === 'password'){
        document.querySelector('#pass-regis-click').classList.remove('fa-eye')
        document.querySelector('#pass-regis-click').classList.add('fa-eye-slash')
        document.querySelector('#password1').type = 'text'
      } else{
        document.querySelector('#pass-regis-click').classList.remove('fa-eye-slash')
        document.querySelector('#pass-regis-click').classList.add('fa-eye')
        document.querySelector('#password1').type = 'password'
      }

    }
    function passclickconfirm(){
      if(document.querySelector('#confirmpassword').type === 'password'){
        document.querySelector('#pass-click-confirm').classList.remove('fa-eye')
        document.querySelector('#pass-click-confirm').classList.add('fa-eye-slash')
        document.querySelector('#confirmpassword').type = 'text'
      } else{
        document.querySelector('#pass-click-confirm').classList.remove('fa-eye-slash')
        document.querySelector('#pass-click-confirm').classList.add('fa-eye')
        document.querySelector('#confirmpassword').type = 'password'
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
          <div className="">
            <div className="form-login-register rounded me-lg-5 ms-lg-5 mt-lg-3 pt-lg-4 ps-lg-5 pe-lg-5 mt-md-3 pt-md-3 me-md-5 ms-md-5 ms-2 me-2 mt-5 p-3">
              <div className="text-center logo-responsive-login">
                <Image src="/logo-kominfo.png" width={141} height={100} alt="logo-kominfo" />
                <hr />
              </div>
              <h1>Daftar</h1>
              <p>Sudah punya akun ? <Link className="text-secondary" href="/login">Masuk</Link></p>
              
              <form  onSubmit={handleSubmit(onSubmit)} className="form-register">
                <div className="float-start col-6">
                  <div className="form-group me-1">
                    <label htmlFor="firstname">Nama Depan</label>
                    <input
                     {...register("first_name", {
                    required: "Nama depan wajib diisi",
                    minLength: {
                        value: 0,
                        message: "Nama belakang wajib diisi"
                      }
                    })}
                    className="form-control p-2" name="first_name" id="firstname" placeholder="Nama Depan" />
                    <small className="text-secondary">{errors.first_name && errors.first_name.message}</small>
                  </div>
                </div>
                <div className="float-end col-6">
                  <div className="form-group me-1">
                    <label htmlFor="lastname">Nama Belakang</label>
                    <input 
                    {...register("last_name", {
                    required: "Nama belakang wajib diisi",
                    minLength: {
                        value: 0,
                        message: "Nama belakang wajib diisi"
                      }
                    })}
                    className="form-control p-2" name="last_name" id="lastname" placeholder="Nama Belakang" />
                    <small className="text-secondary">{errors.last_name && errors.last_name.message}</small>
                  </div>
                </div>
                <div className="clearfix" />
                <div className="form-group">
                  <label htmlFor="email">Email</label>
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
                  type="text" id="email" className="form-control p-2" name="email" placeholder="youremail@gmail.com"/>
                  <small className="text-secondary">{errors.email && errors.email.message}</small>
                </div>
                <div className="form-group">
                  <label htmlFor="password1">Password</label>
                  <div className="input-group">
                    <input
                    {...register("password", {
                    required: "Password wajib diisi",
                    minLength: {
                        value: 0,
                        message: "Password wajib diisi"
                      }
                    })}
                    id="password1" onFocus={focuspassword1} onKeyUp={keyuppassword1} type="password" className="form-control p-2" name="password" placeholder="Password"/>
                    <span className="input-group-text bg-light"><i onClick={passregisclick} id="pass-regis-click" className="fas fa-eye pass-click" /></span>
                  </div>
                  <div id="warning-password" pattern="(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}" className="d-none mt-1 ps-1 border border-secondary bg-warning text-secondary rounded pt-1 pb-1">
                    <small>Password minimal terdiri dari 6 karakter dan harus kombinasi huruf besar, kecil dan angka</small>
                  </div>
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="confirmpassword">Konfirmasi Password</label>
                  <div className="input-group">
                    <input
                    {...register("confirm_password", {
                    required: "Konfirmasi password wajib diisi",
                    minLength: {
                        value: 0,
                        message: "konfirmasi password wajib diisi"
                      }
                    })}
                    id="confirmpassword" onFocus={focuspassword2} onKeyUp={keyuppassword2} type="password" className="form-control p-2" name="confirm_password" placeholder="Konfirmasi Password"/>
                    <span className="input-group-text bg-light"><i onClick={passclickconfirm} id="pass-click-confirm" className="fas fa-eye pass-click" /></span>
                  </div>
                  <div id="warning-password-confirm" className="d-none mt-1 ps-1 border border-secondary bg-warning text-secondary rounded pt-1 pb-1">
                    <small>Password tidak sama</small>
                  </div>
                </div>
                <div className="form-group">
                  <div className="captcha-image">
                  </div>
                </div>
                <div className="form-group">
                  <input type="hidden" name="capt" id="capc" />
                  <div className="">
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
                  <div className="mt-1 border border-secondary alert alert-secondary d-none" id="responsecaptcha">
                    <small id="captcha-text"></small>
                  </div>
                </div>
                <div className="clearfix" />
                <div>
                  <button id="masuk-register" className="masuk-register btn w-100 p-2 mt-1 btn-primary btn-outline-info">Daftar</button>
                </div>
              </form>
            </div>
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
export default Register