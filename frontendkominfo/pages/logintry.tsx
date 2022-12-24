import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import Link from 'next/link'

import React, { useState, useEffect } from 'react'

import styles from '../../styles/Home.module.css'
// import DashboardTable from '../components/user/datatable/Datatabledashboard'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCheckToSlot, faClose, faPlus, faFutbol } from "@fortawesome/free-solid-svg-icons";

const Logintry = () => {
  
  const [countries,setCountries] = useState([]);

    const apiDashboard = 'http://yanlik.rembon.com/api/ticket?user_id=7&limit=10'
    const bearer = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyNyIsImp0aSI6IjA5Yzc0OTdkNjFmZTkyNTE3ODk5ZjIyMmM1ODY5NTlkMDIzNzdlNDE4ZDU2Y2E5ODNiOTIxNTcyOTY4N2NiZmRhYWM1MzNkMDQ2ODcxYWZkIiwiaWF0IjoxNjY4NTg1NDQzLjk2NDM1NCwibmJmIjoxNjY4NTg1NDQzLjk2NDM1OSwiZXhwIjoxNzAwMTIxNDQzLjk0NDQzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.TS04p3JxPZ5W2a2BU-lhqDKDO8oP1839OBeTkOi7YwGI_Wfc0y2you5K7LCgOGXC1tNjkAx8boHNy7Fa4iOhM7v6_T21QDDSJrQIIY8l4HMII44vU4rYl5YPsdXrhF1TVrbAlVht6shdjo1e352bliLaETf_GWBpQrv_Yj4kYUxEmmNYKG2-9TGfZprxIvfdAnPi9mEbBv1ORKrIEVyFp5uSgtF4YoocIOiZLbwmbAwHu472-qD9F9PaHmaMw_P7vw_-mogGDOwUS4sCT8p_KqwfqTfy41Co5e8Aqni6Rw8sReFOMnFB7d7RsDTGMEshEAKWtj5ABART6RdwuucbBeQRiyfaNglxT3r88xe-c_mCfHLz8boGix0-n-5uOFi91awwBI2SFfnuyRhs-pNeZQXFF5gEDHCQfZQxoUSlNxpNq8df6qvZxU_xEjd1vmldiRgfbveYP46Kc0q2RKMKhSROKZxgqGq9uOKdI9f3LDpQcdWFcs2jrjVBtFfs9OzJ5EU9ckIihtOAUUgPEP9Nf6Ruu5qtlBT60Zse5CUxR0Y_9I2IMAIgp7U3U72ZIukDHoyJ7W4j5kkELmW8SF1jzMljTgdP6oyD7HdNGQ9Ibf2P3XOit66JTwI7arEeDOwItneb5kfiXtKjQUjZZFaUx3aHklWCPhgMPMsCV-9uEMI'
    
  function pullDashboard(){
    fetch(apiDashboard, {
      method: "GET",
      headers: {
        'accept': 'application/json',
        'Authorization': bearer,
        'X-CSRF-TOKEN': ''
      }
    })
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData)
    })
  }


  useEffect(() => {
    pullDashboard()
  }, []);

  return (
    <div>
        <div id="content" className="content open bg-content text-dark">
          <div className="mt-5 ms-2 me-2">
            <h5>Daftar Aduan & Konsultasi</h5>
            {/*<DashboardTable />*/}
          </div>
        </div>
    </div>
  )
}
export default Logintry;