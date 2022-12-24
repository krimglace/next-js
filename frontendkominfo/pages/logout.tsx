import { GetServerSideProps } from "next"
import cache from "src/cache"
import nookies from 'nookies';
import { destroyCookie } from 'nookies';
import cookie from "js-cookie";
import React, { useState, useEffect } from 'react'
import {useRouter} from 'next/router'

import swal from 'sweetalert';

export async function getServerSideProps(ctx){
  const cookies = nookies.get(ctx);

  return{
    props:{cookies}
  }
}
const Logout = (cookies) => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      destroyCookie(null, 'email')
      destroyCookie(null, 'iduser')
       swal({
          title: "Berhasil Keluar",
          text: "Tunggu sebentar, anda akan diarahkan ke laman beranda",
          icon: "success",
          timer: 2000,
          
        })
      router.push('/')
    }, 1000)
  }, [])
  console.log(cookies.cookies.iduser)
}
export default Logout;