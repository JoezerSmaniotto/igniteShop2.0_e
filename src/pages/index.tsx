// import Head from 'next/head'
import { GetStaticProps } from 'next';
import Image from 'next/image'
import Link from 'next/link'
import Head from "next/head";
import { stripe } from '../lib/stripe';

import { useKeenSlider} from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import useEmblaCarousel from "embla-carousel-react"

import { HomeContainer, Product } from '@/styles/pages/home'

import Stripe from "stripe"
import { CartButton } from '../components/CartButton/index';
import { useCart } from '../hooks/useCart';
import { TheProduct } from '@/contexts/CartContext';
import { MouseEvent } from "react"

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[]
}

export default function Home({products}: HomeProps) {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  const { addToCart, checkIfItemAlreadyExistsInCart } = useCart()
   function handleAddToCart(e: MouseEvent<HTMLButtonElement>, product: TheProduct) {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product=>{
          return(
            <Link  href={`/product/${product.id}`} key={product.id} prefetch={false}>  
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt=""/>
                <footer>
                  <div>
                    <strong>{product.name}</strong> {''}
                    <span>{product.price}</span>
                  </div>
                    <CartButton 
                      color='green' 
                      size='large' 
                      disabled={checkIfItemAlreadyExistsInCart(product)!}
                      onClick={(e) => handleAddToCart(e, product)} 
                    />
                </footer>
              </Product>
            </Link>

          )
        })
      }
      </HomeContainer>
    </>
  )
}
//                           Tipagem
export const getStaticProps: GetStaticProps = async() => {
  const response = await  stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product =>{
    const price = product.default_price as Stripe.Price;

    return{
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount! / 100),
      numberPrice: price.unit_amount! / 100,
      defaultPriceId: price.id
    }
  })


  return {
    props:{
     products
    },
    revalidate: 60 * 60 * 2 // 2 hours,
  }
}