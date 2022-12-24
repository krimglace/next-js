import nookies from 'nookies'
import cookie from "js-cookie";
import {useRouter} from 'next/router'
import Head from 'next/head'
import {useEffect} from 'react'

export async function getServerSideProps(ctx){
  const cookies = nookies.get(ctx);

if(!cookies.email && !cookies.iduser){
  return {
    redirect: {
      destination: '/login'
    }
  }
 }

  return{
    props:{}
  }
}

export default function Logout() {

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      cookie.remove('email')
      cookie.remove('iduser')

      router.push('/')
    }, 0)
  }, [])
  return(
    <>
      <Head>
        <title>Portal Layanan Kominfo</title>
        <link rel="icon" href="/logo-kominfo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    </>
  )
}