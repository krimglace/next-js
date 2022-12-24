import Head from 'next/head'
import Image from 'next/image'
import {useEffect} from 'react'
import {useRouter} from 'next/router'

function Custom404() {

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      //router.go(-1)
      router.push('/')
    }, 5000)
  }, [])
  return (
    <div>
      <Head>
        <title>Portal Layanan Kominfo</title>
        <link rel="icon" href="/logo-kominfo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="register-redirect d-flex flex-column justify-content-center align-items-center w-100">
        <div className="text-center border border-primary pt-4 pb-4 card-register-redirect">
          <img src="/logo-kominfo.png" className="card-img-top-1" alt="logo-kominfo" />
          <div className="card-body">
            <h5 className="card-title">Halaman tidak ditemukan</h5>
            <p className="card-text">Sedang mengalihkan ke halaman beranda ...</p>
            <div className="box-load">
              <div className="loading1" />
              <div className="loading2" />
              <div className="loading3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Custom404