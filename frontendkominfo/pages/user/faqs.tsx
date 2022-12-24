import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import Link from 'next/link'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import swal from 'sweetalert';
import jwt from 'jsonwebtoken'
import {useForm} from 'react-hook-form';
import nookies from 'nookies';
import cookie from "js-cookie";

import styles from '../../styles/Home.module.css'
import Header from '../../components/user/header'
import Sidebar from '../../components/user/sidebar'
import Footer from '../../components/user/footer'
import Boots from '../../components/Bootstrap'
import Faqcomponent from '../../components/user/faqcomponent'

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

const Faqs = ({email, iduser}) => {
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
    document.querySelector('#helpdesk').classList.add('active')
  }
  useEffect(() => {
    pullData()
  }, [])
  return (
    <div>
      <Header itemsEmail={tknuser.emailuser} itemsUserid={tknuser.iduseruser} />
      <Sidebar itemsEmail={tknuser.emailuser} itemsUserid={tknuser.iduseruser} />
        <div id="content" className="content open bg-lightgray text-dark">
          <div className="mt-5 ms-2 me-2">
            <Faqcomponent />
          </div>
        </div>
      <Footer />
      <Boots />
    </div>
  )
}

export default Faqs;
