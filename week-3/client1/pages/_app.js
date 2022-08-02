import '../styles/globals.css'
import Layout from '../components/Layout';
import Head from 'next/head';
import Script from 'next/script'
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <Script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js'>
      </Script>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp;
