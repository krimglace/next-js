import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Pagination from '../paginationuser'
import _ from 'lodash'
import {useForm} from 'react-hook-form';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCirclePlus, faCircleMinus, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

import swal from 'sweetalert';

const Datatabledaftaraduan = ({itemsEmail, itemsUserid}) =>{

  interface tokenLogin{
    email: string;
    userid: string;
  }
  class loginToken implements IsPerson{
    email: string;
    userid: string;

    constructor(x: string, email: string){
      this.email = itemsEmail;
      this.userid = itemsUserid;
    }
  }

  let tknemail = new loginToken();
  
  const [ticket, setTicket] = useState([])  
  const [ticketpage, setTicketpage] = useState([])
  const [currentPage, setcurrentPage] = useState(1);
  const pageSize = 10;
    
  const { handleSubmit, register, formState: { errors } } = useForm();

  let displayData

  const bearer = `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
  const [userid, setuserid] = useState()


  async function getTicketPage(searchDash){
    const api = `${process.env.NEXT_PUBLIC_API_SITE}/api/ticket?search=${searchDash}&user_id=${tknemail.userid}`
    console.log(api)
    const {data: res} = await axios.get(api, {
      headers: {
        'accept': 'application/json',
        'Authorization': bearer,
        'X-CSRF-TOKEN': ''
      }   
    });
    setTicketpage(res.data)
  }
  useEffect(() => {
    getTicketPage('');
  }, [])

  async function onSubmit(values){
    
    swal({
      title: "Loading ...",
      text: "Silahkan tunggu sebentar",
      showSpinner: true,
      timer: 1500,
      
    });

    try {
      getTicketPage(values.searchticket); 
      console.log(values.searchticket)
    } catch(err){
      console.log(err)
    }
  }

  const handlePageChange = (page) => {
    setcurrentPage(page)
  }


  const paginateTicket = (pageItem, pageNumber, pageLarge) => {
    const startIndex = (pageNumber - 1) * pageLarge;
    return _(pageItem).slice(startIndex).take(pageLarge).value();
  }

  async function deletedata(val){

    const respons = await fetch(`${process.env.NEXT_PUBLIC_API_SITE}/api/ticket/delete/${val}`,{
      method: 'DELETE',
      headers: {
        'accept': 'application/json',
        'Authorization': bearer,
        'X-CSRF-TOKEN': ''
      }
    })
    const data = await respons.json()
    // console.log(data)

    try {
      swal({
        title: "Data Berhasil Dihapus",
        text: "Anda akan diarahkan ke halaman dashboard",
        icon: "success",
        timer: 3000,
        
      }).then(next => {
        router.push(`/user/dashboard`)
      });

    } catch(err){
      swal({
        title: "Gagal Dihapus",
        text: "Error",
        icon: "error",
      })
    }
  }

  const pageTicket = paginateTicket(ticketpage, currentPage, pageSize)

	return(
		<div className="bg-light p-lg-4 p-md-4 p-3 rounded">

      <h5 className="mt-2 float-lg-start float-md-start"><strong>Daftar Permohonan</strong></h5>
      <form onSubmit={handleSubmit(onSubmit)} className="col-lg-5 float-lg-end col-md-5 float-md-end col-12 formdash" >
        <div className="form-group mb-2">
          <div className="input-group">
            <strong className="mt-2 me-2">Search : </strong>
            <input
              {...register("searchticket")}
              name="searchticket"
              type="search"
              placeholder="Cari Permohonan"
              className="form-control"
            />
            <button type="submit" className="searchbuttondash input-group-text bg-light"><FontAwesomeIcon icon={faSearch} className="searchdash" /></button>
          </div>
            <input type="hidden" 
            {...register("iduser")}
              name="iduser" defaultValue={userid} />
        </div>
      </form>
      <div className="clearfix" /><hr />
      <div className="table-dashboard">
       <table className="table table-bordered">
          <thead>
             <tr className="bg-gray">
               <th>ID Izin</th>
               <th>Jenis Izin</th>
               <th>Nama Izin</th>
               <th>Instansi</th>
               <th>Status</th>
               <th>Update Terakhir</th>
               <th>Aksi</th>
             </tr>
          </thead>
          
            { pageTicket.length > 0 ? 
              pageTicket.map(tckt => 
                <tbody key={tckt.id}>
                  <tr>
                    <td>{tckt.id_izin}</td>
                    <td>{tckt.jenis_izin}</td>
                    <td>{tckt.nama_izin}</td>
                    <td>{tckt.instansi}</td>
                    <td>{tckt.status_app.status_title}</td>
                    <td>{tckt.updated_at}</td>
                    <td><Link href={`/user/dashboard/detail?id=${tckt.id}`} className="ms-3 btn btn-primary">Detail</Link></td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  <tr><td colSpan="8" className="text-center"><em><small>No Data</small></em></td></tr>
                </tbody>
              )
            }

          
       </table>
      </div>
       <Pagination
        items={ticketpage.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
		</div>
	)
}
export default Datatabledaftaraduan;