import Head from 'next/head'
import Image from 'next/image'
import { GetServerSideProps } from "next";
import nookies from 'nookies';
import cookie from "js-cookie";

import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hubungikami from '../components/hubungikami'
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  return {
      props: {
        cookies: cookies,
      }
    }
}
export default function Hubungi({cookies}) {
  return (
    <div>
      <Header cookie={cookies}/>
      <div className="container">
        <Hubungikami />
      </div>
      <Footer />
    </div>
  )
}
