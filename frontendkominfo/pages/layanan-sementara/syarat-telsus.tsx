import Head from 'next/head'
import Image from 'next/image'
import { GetServerSideProps } from "next"
import cache from 'src/cache'
import nookies from 'nookies';
import cookie from "js-cookie";

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Telsus from '../../components/layanansementara/telsus';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  return {
      props: {
        cookies: cookies,
      }
    }
}
export default function Syarattelsus({cookies}) {
  return (
    <div>
      <Header cookie={cookies}/>
      <div className="pb-5">
        <Telsus />
      </div>
      <Footer />
    </div>
  )
}
