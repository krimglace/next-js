import '../styles/scss/globals.scss'
import '../styles/scss/user/globals.scss'
import '../styles/scss/user/profile.scss'
import '../styles/scss/user/dashboard.scss'
import '../styles/scss/home.scss'
import '../styles/scss/tentang.scss'
import '../styles/scss/login.scss'
import '../styles/scss/hubungi.scss'
import '../styles/globals.css'
import '../styles/layanansementara.css'
import Router from 'next/router'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import type { AppProps } from 'next/app'

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
