import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import swal from 'sweetalert';
import jwt from 'jsonwebtoken'
import nookies from 'nookies';
import cookie from "js-cookie";

import styles from '../../styles/Home.module.css'
import Header from '../../components/user/header'
import Sidebar from '../../components/user/sidebar'
import Footer from '../../components/user/footer'
import Boots from '../../components/Bootstrap'
import Layanancomponent from '../../components/user/layanancomponent'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCheckToSlot, faClose, faPlus, faFutbol, faSearch } from "@fortawesome/free-solid-svg-icons";

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
    props:{
      email: cookies.email,
      iduser: cookies.iduser
    }
  }
}

const Tambahpermohonan = ({email, iduser}) => {
  interface tokenLogin{
      emailuser: string;
      iduseruser: string;
  }
  class loginToken implements IsPerson{
    emailuser: string;
    iduseruser: string;

    constructor(iduseruser: string, emailuser: string){
      this.emailuser = email;
      this.iduseruser = iduser;
    }
  }
  let tknuser = new loginToken(); 

  function pullData(){
    document.querySelector('#tambahpermohonan').classList.add('active')
  }
  useEffect(() => {
    pullData()
  }, [])
  return (
    <div>
      <Header itemsEmail={tknuser.emailuser} itemsUserid={tknuser.iduseruser} />
      <Sidebar itemsEmail={tknuser.emailuser} itemsUserid={tknuser.iduseruser} />
        <div id="content" className="content open bg-lightgray text-dark">
        <div className="bg-light p-lg-4 p-md-4 p-3">
          <h5 className="float-md-start float-lg-start"><strong>Tambah Permohonan</strong></h5>
          <small className="float-md-end float-lg-end"><Link href={`/user/dashboard`} className="text-primary">Dashboard /</Link> <Link href="#" className="text-primary">Permohonan / </Link>Tambah Permohonan</small>
          <div className="clearfix" />
        </div>
          <div className="ms-2 me-2">
            <Layanancomponent itemsEmail={tknuser.emailuser} itemsUserid={tknuser.iduseruser} />
          </div>
        </div>
      <Footer />
      <Boots />
    </div>
  )
}
export default Tambahpermohonan;
