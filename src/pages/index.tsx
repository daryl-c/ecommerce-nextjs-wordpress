import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image';

import Header from '@components/Header';
import Container from '@components/Container';
import Button from '@components/Button';

import products from '@data/products.json';
import styles from '@styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Daryl&apos;s Store</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <Container>
          <h1>Hyper Bros. Trading Cards</h1>
          <h2>Available Cards</h2>
          <ul className={styles.products}>
            {products.map(product => {
              return (
                <li key={product.id}>
                  <Image 
                    src={product.image}
                    alt={`Card of ${ product.title }`}
                    width="864"
                    height="1200"
                  />
                  <h3 className={styles.productTitle}>{ product.title }</h3>
                  <p className={styles.productPrice}>${ product.price }</p>
                  <p>
                    <Button>Add to Cart</Button>
                  </p>
              </li>
              );
            })}
          </ul>
        </Container>
      </main>

      <footer className={styles.footer}>
        &copy; Hyper Bros. Trading Cards, {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default Home
