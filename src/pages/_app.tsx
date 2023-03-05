import type { AppProps } from 'next/app'
import Image from 'next/image'
import { globalStyles } from '../styles/global';

import logoImg from '../assets/logo.svg'
import { Container } from '@/styles/pages/app';
import { CartContextProvider } from '../contexts/CartContext';
import { Header } from '@/components/Header';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return(
    <CartContextProvider>
      <Container>
        <Header/>
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  ) 
  
}
 