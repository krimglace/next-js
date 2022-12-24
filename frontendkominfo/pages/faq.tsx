import Head from 'next/head'
import Image from 'next/image'
import { GetServerSideProps } from "next"
import cache from 'src/cache'
import nookies from 'nookies';
import cookie from "js-cookie";

import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Faqpage from '../components/faqpage';

const bearer = `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const primary = 1;
  const fetcher = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_SITE}/api/faq?primary=${primary}`, {
        method: "GET",
        headers: {
          'accept': 'application/json',
          'Authorization': bearer,
          'X-CSRF-TOKEN': ''
        }
      })

      const faqshow = await res.json();
      return faqshow.data
  }

  const datailforfaqshow = await cache.fetch(
      `primary: ${primary}`,
      fetcher,
      60 * 60*24
  );
  const cookies = nookies.get(ctx);



  return {
      props: {
        cookies: cookies,
        faqshow: datailforfaqshow
      },
  }
}

export default function Faq({cookies, faqshow}) {
  // console.log(faqshow)
  return (
    <div>
      <Header cookie={cookies} />
      <div className="container">
      <Faqpage showpullpage={faqshow} />
      </div>
      <Footer />
    </div>
  )
}
