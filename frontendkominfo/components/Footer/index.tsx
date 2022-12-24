import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer(){
	return(
		<>
			<footer>
				<div className="container pt-lg-5 pb-lg-3 pt-md-5 pb-md-3 pb-2 pt-4 text-light">
					<div className="footer-image col-12 float-start mb-4 col-lg-6 col-md-5 d-flex flex-column justify-content-center align-items-center">
						<img src="/logo-kominfo.png" className="w-25" />
					</div>
					<div className="float-start col-lg-6 col-md-7 mt-lg-5 mt-md-5">
						<div className="float-start col-lg-5 col-md-5 col-6">
							<strong className="ms-3">Menu</strong><br />
							<ul className="list-unstyled mt-lg-4 mt-md-4 me-2 ms-3">
								<li className="list-menu mb-2"><Link className="text-light text-decoration-none" href="/">Beranda</Link></li>
								<li className="list-menu mb-2"><Link className="text-light text-decoration-none" href="/tentang">Tentang Kami</Link></li>
								<li className="list-menu mb-2"><Link className="text-light text-decoration-none" href="/faq">FAQ</Link></li>
								<li className="list-menu mb-2"><Link className="text-light text-decoration-none" href="/hubungi">Hubungi Kami</Link></li>
							</ul>
						</div>
						<div className="float-start col-lg-7 col-md-7 col-6">	
							<strong>Ikuti Kami</strong><br />
							<ul className="list-unstyled mt-lg-4 mt-md-4">
								<li className="list-ikuti text-light mb-2"><Link href="#" className="text-decoration-none"><FontAwesomeIcon className="icon-ikuti text-light me-lg-3 me-md-3 me-1" icon={faGlobe} /> www.kominfo.go.id</Link></li>
								<li className="list-ikuti text-light mb-2"><Link href="#" className="text-decoration-none"><FontAwesomeIcon className="icon-ikuti text-light me-lg-3 me-md-3 me-1" icon={faEnvelope} /> kontak@kominfo.go.id</Link></li>
								<li className="list-ikuti text-light mb-2"><Link href="#" className="text-decoration-none"><FontAwesomeIcon className="icon-ikuti text-light me-lg-3 me-md-3 me-1" icon={faYoutube} /> Kominfotv</Link></li>
								<li className="list-ikuti text-light mb-2"><Link href="#" className="text-decoration-none"><FontAwesomeIcon className="icon-ikuti text-light me-lg-3 me-md-3 me-1" icon={faTwitter} /> komkominfo</Link></li>

							</ul>
						</div>
						<div className="clearfix" />
					</div>
					<div className="clearfix" />
					<hr className="mt-5" />
					<div className="text-center">
						<strong>&copy; Layanan Kominfo 2022</strong>
					</div>
				</div>
			</footer>
			<Script
				id="bootstrappopper"
				src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
				integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
				crossOrigin="anonymous"></Script>
			<Script
				id="bootstrapmin"
				src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js"
				integrity="sha384-IDwe1+LCz02ROU9k972gdyvl+AESN10+x7tBKgc9I5HFtuNz0wWnPclzo6p9vxnk"
				crossOrigin="anonymous"></Script>
		</>
	)
}