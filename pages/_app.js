import '../styles/globals.css'
import Header from '../pageComponents/header';

function MyApp({ Component, pageProps }) {
  return (
      <>
          <Header/>
          <Component {...pageProps} />
      </>
  )
}

export default MyApp
