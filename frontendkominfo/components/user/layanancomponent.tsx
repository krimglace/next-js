import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import axios from 'axios'
import Pagination from '../paginationuser'
import _ from 'lodash'
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/router'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import swal from 'sweetalert';

const Layanancomponent = ({itemsEmail, itemsUserid}) => {
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

  const [LayananBaru, setLayananBaru] = useState([])
  const [LayananBaruData, setLayananBaruData] = useState([])
  const [LayananData, setLayananData] = useState([])
  const [currentPage, setcurrentPage] = useState(1);
    
  const { handleSubmit, register, formState: { errors } } = useForm();

  let displayData

  const bearer = `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`

  async function onSubmit(values){
    swal({
      title: "Loading ...",
      text: "Silahkan tunggu sebentar",
      showSpinner: true,
      timer: 1500,
      
    });
    try {
    	getLayananBaru(values.searchlayanan);		
    } catch(err){
      console.log(err)
    }
  } 
  const [userid, setuserid] = useState()
	function getUserId(){
		// console.log(useriddefault)
		fetch(`${process.env.NEXT_PUBLIC_API_SITE}/api/user/detail?email=${tknemail.email}`,{
			method: 'GET',
			headers: {
        'accept': 'application/json',
        'Authorization': bearer,
        'X-CSRF-TOKEN': ''
      }
		}).then(response => response.json())
	    .then(responseDataUser => {
	    		
			const useuserid = responseDataUser.data.id_user
			// console.log(responseDataUser)
			setuserid(useuserid)
			// pullJsonDashboard(useuserid)

	  })
	}

  function getLayananBaru(searchDash){
  	
  	let displayData, displayDatacek
    // console.log(searchDash)
    const apiUrl = `${process.env.NEXT_PUBLIC_API_SITE}/api/layanan?is_parent=1&type=dashboard&search=${searchDash}`
    fetch(apiUrl, {
			method: "GET",
			headers: {
				'accept': 'application/json',
				'Authorization': bearer,
				'X-CSRF-TOKEN': ''
			}
		})
		.then(response => response.json())
		.then(responseData => {
				if(responseData.data.length == 0){
							swal({
		        title: "No Data",
		        text: "Data yang anda cari tidak ditemukan",
		        icon: "error",
		      })
				} else{				
					const imageUrl = `${process.env.NEXT_PUBLIC_API_SITE}/menu/`
					displayData = responseData.data.map(function(todo) {
						async function showChild(){
							const res = await fetch(`${process.env.NEXT_PUBLIC_API_SITE}/api/layanan?parent=${todo.id}&type=dashboard&search=${searchDash}`, {
								method: "GET",
								headers: {
									'accept': 'application/json',
									'Authorization': bearer,
									'X-CSRF-TOKEN': ''
								}
							})
							// const data: Todos[] = await res.json();
							const lihatdata = await res.json();
							// await setLayananBaruData({lihatData })
							// return {props: { data }};
							return lihatdata
						}
						const trydata = showChild().then( (resDataParse) => { [setLayananBaruData(resDataParse)] } )

						console.log(LayananBaruData)
						return(
							<div key={todo.id} className="float-lg-start float-md-start col-lg-6 col-md-6 col-12">
								<div className="mb-4 border border-dark rounded ms-2 me-2">
					 				<a onClick={() => clickTab(todo.id)} className="rounded bg-light p-3 text-dark d-flex align-items-center layanancover">
					 					{
						         	todo.icon === null || todo.icon === '' ? 
						         	<img src="/logo.png" alt="" className="me-3" width="34" height="34" /> : 
					 						<img src={imageUrl + todo.icon} width="34" height="34" alt={todo.icon} className="me-3" />
						        }
					 					<h5 className="mt-1 title-layanan"><strong>{todo.title}	</strong></h5>
					 				</a>
									<div id={`codeans${todo.id}`} className="rounded bg-gray text-dark d-flex align-items-center layanancontent d-none">
					 				{
					 					LayananBaruData.length > 0 ? 
					 					LayananBaruData.map(function(tho){
					 							<a key={tho.id} onClick={() => pullLayananSSO(tho.id, tho.preauth_url, tho.preauth_key)}  className="float-start col-5">
													<p className="mt-2 ps-2 title-layanan text-primaryuser">{tho.title}</p>
												</a>
							 			}) : (
							 				<p className="mt-2 ps-2 title-layanan text-primaryuser">{todo.title}</p>		
							 			)
					 				}
									<div className="clearfix"></div>
									</div>
					 			</div>
					 		</div>
						)
					})
							setLayananBaru(displayData)
				}
		})
  }

  const router = useRouter()
  async function pullLayananSSO(id, url, key){
  	let ssoconfig = {
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_API_SITE}/api/layanan/sso`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer,
        'X-CSRF-TOKEN': ''
      },
      data: {
      	"app_id": id,
			  "user_id": tknemail.userid,
			  "preauth_key": key,
			  "preauth_url": url,
			  "customer_id": tknemail.userid
      },	
    };
    const response = await axios(ssoconfig)
    // const json = await ssoconfig.json();
    swal({
        title: "Berhasil",
        text: "Tunggu sebentar, anda akan diarahkan ke halaman sso",
        icon: "success",
        timer: 3000,
        
      })
      .then(next => {
        router.push(response.data.data)
      });
  }
  function clickTab(value){
    const docque = document.querySelector(`#codeans${value}`).classList.toggle('d-none');
  }
  useEffect(() => {
    getLayananBaru('');
  }, [])


	return(
		<div className="container">
			<br /><br />
			<div className="ps-lg-4 pb-lg-4 pe-lg-4 ps-md-4 pe-md-4 pb-md-4 ps-3 pe-3 pb-3 rounded">
				<h5 className="mt-2 float-lg-start float-md-start"><strong>Permohonan Baru</strong></h5>
	      <form onSubmit={handleSubmit(onSubmit)} className="col-lg-5 float-lg-end col-md-5 float-md-end col-12 formdash" >
	        <div className="form-group mb-2">
	          <div className="input-group">
	            <input
					      {...register("searchlayanan")}
					      name="searchlayanan"
					      type="search"
					      placeholder="Telusuri layanan kominfo disini"
					      className="form-control"
					    />
					    <button type="submit" className="searchbuttondash  input-group-text bg-primary text-light"><FontAwesomeIcon icon={faSearch} className="searchdash" /></button>
	          </div>
	        </div>
	      </form>
	      <div className="clearfix" />
	      <br />
	      {
	      	LayananBaru
	      }

	      {/*{ LayananBaru[LayananBaru.length - 1] }*/}
			</div>
		</div>
	)
}
export default Layanancomponent;