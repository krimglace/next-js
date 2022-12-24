import Head from 'next/head'
import Image from 'next/image'
import { GetServerSideProps } from "next"
import cache from 'src/cache'
import nookies from 'nookies';
import cookie from "js-cookie";

import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TentangKami from '../components/tentangkami';

const bearer = `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const page = 1;
  const fetcher = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_SITE}/api/content?page=${page}`, {
        method: "GET",
        headers: {
          'accept': 'application/json',
          'Authorization': bearer,
          'X-CSRF-TOKEN': ''
        }
      })

      const tentangshow = await res.json();
      return tentangshow.data
  }

  const datailfortentangshow = await cache.fetch(
      `number: ${page}`,
      fetcher,
      60 * 60*24
  );
  const cookies = nookies.get(ctx);


  return {
      props: {
        cookies: cookies,
        tentangshow: datailfortentangshow
      },
  }
}
export default function Tentang({cookies, tentangshow}) {
  return (
    <div>
      <Header cookie={cookies}/>
      <div className="container pb-5">
        <TentangKami tentangshow={tentangshow} />
      </div>
      <Footer />
    </div>
  )
}
