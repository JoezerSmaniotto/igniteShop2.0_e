import axios from "axios";
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Stripe from "stripe"
import { stripe } from '../../lib/stripe';
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product';
import { TheProduct } from "@/contexts/CartContext";
import { useCart } from '../../hooks/useCart';


interface ProductProps {
  product: TheProduct;
}

export default function Product({product}:ProductProps){
   const { isFallback } = useRouter();

  const { addToCart, checkIfItemAlreadyExistsInCart } = useCart();
  

  if (isFallback) {
    return <p>Loading...</p>;
  }

  const itemAlreadyInCart = checkIfItemAlreadyExistsInCart(product);


    return (
      <>
        <Head>
          <title>{product.name}| Ignite Shop</title>
        </Head>
        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} width={520} height={480} alt=""/>
            </ImageContainer>
            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>

                <p>{product.description}</p>

                <button
                  disabled={itemAlreadyInCart!}
                  onClick={() => addToCart(product)}
                >
                  {itemAlreadyInCart!
                    ? "Produto já está no carrinho"
                    : "Colocar na sacola"}
                </button>
            </ProductDetails>
        </ProductContainer>
      </>
    )
}



/* 
Projeto: 4 seção: Produto & Checkout Aula: SSG com parâmetro dinâmico

Metodo que devolve os IDs que necessíta para páginas estáticas
o metodo retorno um OBJ, quem tem  paths: [], e dentro do array de paths tenho varios os 
paramemtros/IDS, necessários , 
*/
export const getStaticPaths: GetStaticPaths = async () => { //Async
  return {
    paths: [
        {params: {id: 'prod_NNIaQYqGC5Bg3w'}},
    ],
    fallback: true,
  }
}

/*

Projeto: 4 seção: Produto & Checkout Aula: Carregando dados do produto 5:00  Tipagem da função

o GetStaticProps Recebe como parametro 
1 º O tipo do retorno, neste caso passo any, não quer tipar, 
2 º O Formato do Obj de params que recebemos. neste caso recebo o id do produto
{id: string}. digo q seu formato é uma string, pois retrieve só aceita string
mas poderia ser um obj {} vazio.
*/
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount! / 100),
        numberPrice: price.unit_amount! / 100,
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 hours
  }
}