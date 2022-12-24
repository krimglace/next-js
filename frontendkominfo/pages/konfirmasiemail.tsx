import Head from 'next/head'
import Image from 'next/image'
import { GetServerSideProps } from "next"
import cache from 'src/cache'

import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Konfirmasi from '../components/konfirmasi';
import nookies from 'nookies'

const bearer = `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const email = ctx.query.email;
  const cookies = nookies.get(ctx);

 if(cookies.email && cookies.iduser){
  return {
    redirect: {
      destination: '/user/dashboard'
    }
  }
 }

  return {
      props: {
        konfirmasishow: email
      },
  }
}
export default function konfirmasiemail({konfirmasishow}) {
  return (
    <div>
      <Header />
      <div className="container pb-5">
        <Konfirmasi konfirmasishow={konfirmasishow} />
      </div>
      <Footer />
    </div>
  )
}
