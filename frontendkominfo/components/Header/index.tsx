import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'

export async function getServerSideProps(cookie){
	console.log(cookie)
	return{
		props:{
			cookie
		}
	}
}
export default function Header(cookie){
	return(	
		<>
			<Head>
	        	<title>Portal Layanan Kominfo</title>
	        	<link rel="shortcut icon" href="/logo-kominfo-transparent.png" />
	        	<meta name="viewport" content="width=device-width, initial-scale=1" />
	      	</Head>
	          
	        <header>
	        	<nav className="navbar navbar-expand-lg bg-none">
					<div className="container">
						<Link className="navbar-brand" href="/">
							<img src="/logo-kominfo.png" width={79} height={80} alt="Logo"/>
						</Link>
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						  <span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
					  		<ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
					    		<li className="nav-item text-center">
					      			<Link className="nav-link menu-bar text-primary" aria-current="page" href="/">Beranda</Link>
					    		</li>
				    			<li className="nav-item text-center">
							      	<Link className="nav-link menu-bar text-primary" href="/tentang">Tentang Kami</Link>
							    </li>
							    <li className="nav-item text-center">
							      	<Link className="nav-link menu-bar text-primary" href="/faq">FAQ</Link>
							    </li>
							    <li className="nav-item text-center">
							      	<Link className="nav-link menu-bar text-primary" href="/hubungi">Hubungi Kami</Link>
							    </li>
					  		</ul>
					  		<div className="text-center">
					  			{ cookie.cookie.iduser != undefined ? (
					  					<Link href="/logout" className="btn-outline-light btn btn-primary rounded-pill me-2 ps-4 pe-4 pt-2 pb-2">Keluar</Link>
					  				) : (
					  					<>
								    		<Link href="/login" className="btn btn-white rounded-pill btn-outline-primary me-2 ps-4 pe-4 pt-2 pb-2">Masuk</Link>
								    		<Link href="/register" className="rounded-pill btn-outline-light btn btn-primary ms-2 ps-4 pe-4 pt-2 pb-2">Daftar</Link>
							    		</>
					  				) 
					  			}
					  		</div>
						</div>
					</div>
				</nav>
	        </header>
        </>
	)
}