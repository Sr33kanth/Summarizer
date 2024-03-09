import Header from '../component/header/header'
import App from '../component/app/app'
import Head from 'next/head';
export default function home() {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <Header />
      <App></App>
    </>
  )
}
