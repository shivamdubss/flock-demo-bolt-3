import type { AppProps } from 'next/app'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // This ensures React is properly initialized on the client side
    if (typeof window !== 'undefined') {
      require('react')
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp 