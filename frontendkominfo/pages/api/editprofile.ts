import Head from 'next/head'
import Image from 'next/image'
import {useEffect} from 'react'
import {useRouter} from 'next/router'

const handler = async function (req, res) {

    return res.redirect(307, '/user/profile')
}

export default handler;