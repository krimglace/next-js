import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import Link from 'next/link'
import React, { useEffect, useState } from "react";
import nookies from 'nookies'
import cookie from "js-cookie";
import Header from '../../../components/user/header'
import Sidebar from '../../../components/user/sidebar'
import Footer from '../../../components/user/footer'
import Boots from '../../../components/Bootstrap'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCheckToSlot, faClose, faPlus, faFutbol } from "@fortawesome/free-solid-svg-icons";

const bearer = `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`

export async function getServerSideProps(ctx){
  const cookies = nookies.get(ctx);

  if(!cookies.email && !cookies.iduser){
    return {
      redirect: {
        destination: '/login'
      }
    }
  }

  const id = ctx.query.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SITE}/api/ticket/${id}`,
                            {
                              method: "GET",
                              headers: {
                                'accept': 'application/json',
                                'Authorization': bearer,
                                'X-CSRF-TOKEN': ''
                              }
                            }
                          )

  const tiket = await res.json();
  const ticketid = ctx.query.id

  return {
      props: {
        tiket,
        ticketid, 
        email: cookies.email,
        iduser: cookies.iduser
      },
    }
}

const DetailDashboard = ({tiket, ticketid, email, iduser}) => {
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

  let stat

  if(tiket.data.status == 1){
    stat = 'Permohonan Terkirim'
  } else if(tiket.data.status == 2){
    stat = 'Permohonan Selesai'
  } else if(tiket.data.status == 3){
    stat = 'Permohonan Ditolak'
  }
  let displayDataProgress

  const [showProgress,setshowProgress ] = useState()
  function pullProgress(){
    fetch(`${process.env.NEXT_PUBLIC_API_SITE}/api/ticket/progress?ticket_id=${ticketid}`,{
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': bearer,
        'X-CSRF-TOKEN': ''
      }
    }).then(response => response.json())
      .then(responseDataProggress => {
        displayDataProgress = responseDataProggress.data.map(function(todo) {
          return(
                todo.latest === false && todo.created_at != null ? 
                (
                  <li key={todo.id} className="tl-item success" ng-repeat="item in retailer_history" > 
                    <div className="item-title">{todo.status_title}</div>
                    <div className="item-detail">{todo.created_at}</div>
                  </li>
                ) : todo.latest === true ? 
                (
                  <li key={todo.id} className="tl-item prosess" id="progress" ng-repeat="item in retailer_history" >
                      <div className="item-title">{todo.status_title}</div>
                    <div className="item-detail">{todo.created_at}</div>
                    </li>
                ) : (
                  <li key={todo.id} className="tl-item waiting" ng-repeat="item in retailer_history" > 
                    <div className="item-title">{todo.status_title}</div>
                    <div className="item-detail">{todo.created_at}</div>
                  </li>
                )
          )
        })
        setshowProgress(displayDataProgress)
    })
  }
  function pullData(){
    document.querySelector('#dashboarduser').classList.add('active')
  }

  useEffect(() => {
    pullData();
    pullProgress();
  }, [])
  return (
    <div>
      <Header itemsEmail={tknuser.emailuser} itemsUserid={tknuser.iduseruser} />
      <Sidebar itemsEmail={tknuser.emailuser} itemsUserid={tknuser.iduseruser} />
        <div id="content" className="content open bg-lightgray text-dark">
          <div className="mt-5 ms-4 me-2 pt-3">
          <br />
            <h4>
              <strong>
                Detail Permohonan - List
              </strong>
            </h4>
            <Link href={`/user/dashboard`} className="text-secondary">Dashboard /</Link> Detail
            <br /><br />
            <div className="table-dashboarddetail">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>ID Izin</th>
                    <td>{tiket.data.id_izin}</td>
                    <th>Kategori Layanan</th>
                    <td>{tiket.data.category.name}</td>
                  </tr>
                  <tr>
                    <th>Jenis Izin</th>
                    <td>{tiket.data.jenis_izin}</td>
                    <th>Nama Izin</th>
                    <td>{tiket.data.nama_izin}</td>
                  </tr>
                  <tr>
                    <th>Nama Pemohon</th>
                    <td>{tiket.data.user.first_name} {tiket.data.user.last_name}</td>
                    <th>Status Permohonan</th>
                    <td>{tiket.data.status_app.status_title}</td>
                  </tr>
                  <tr>
                    <th>Email Pemohon</th>
                    <td>{tiket.data.user.email}</td>
                    <th>Instansi</th>
                    <td>{tiket.data.instansi}</td>
                  </tr>
                  <tr>
                    <th>Tanggal Dibuat</th>
                    <td>{tiket.data.created_at}</td>
                    <th>Tanggal Selesai</th>
                    <td>{tiket.data.closed_at}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <div className="history-tl-container m-1 rounded bg-light p-2">
            <h3><strong>Progress Bar</strong></h3>
            <br />
              <ul className="tl">    
              {showProgress}
              </ul>                
          </div>
          </div>

        </div>
      <Footer />
      <Boots />
    </div>
  )
}
export default DetailDashboard;
