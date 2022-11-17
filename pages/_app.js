import '../styles/globals.css'
import { Layout } from '../components'
import { StateContex } from '../context/stateContext'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
  return (
    <StateContex>
      <Layout>
      <Toaster />
      <Component {...pageProps} />
      </Layout>
    </StateContex>
  )
}

export default MyApp
