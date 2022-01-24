import Fuse from 'fuse.js';
import { useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';

import {
  ApolloClient,
  InMemoryCache,
  gql
} from "@apollo/client";

import Container from '@components/Container';
import Layout from '@components/Layout';
import Button from '@components/Button';

// import products from '@data/products.json';
import styles from '@styles/Home.module.scss'

type Product = {
  id: string;
  title: string;
  slug: string;
  productPrice: number;
  productId: string;
  featuredImage: {
    altText: string;
    sourceUrl: string;
    mediaDetails: {
      width: number;
      height: number;
    }
  }
  allegiances: {
    slug: string;
  }[]
}
interface HomeProps {
  products: Array<Product>;
  allegiances: { id: string, name: string, slug: string }[]
}

const Home: NextPage<HomeProps> = ({ products, allegiances }) => {
  const [activeAllegiance, setActiveAllegiance] = useState(null);
  const [query, setQuery] = useState(null);
  let activeProducts = products.filter(({ allegiances }) => {
    return activeAllegiance === null || allegiances.find(({ slug }) => slug === activeAllegiance);
  });

  const fuse = new Fuse(activeProducts, {
    keys: ['title', 'allegiances.name']
  })
  if (query) {
    const results = fuse.search(query);
    activeProducts = results.map(({ item }) => item)
  }

  function handleOnSearch(event) {
    const value = event.currentTarget.value;
    setQuery(value);
  }

  return (
    <Layout>
      <Head>
        <title>Daryl&apos;s Store</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Container>
        <h1 className="sr-only">Hyper Bros. Trading Cards</h1>
        <div className={styles.discover}>
          <div className={styles.allegiances}>
            <h2>Filter by Allegiance</h2>
            <ul>
              {allegiances.map(allegiance => {
                const isActive = allegiance.slug === activeAllegiance;
                const allegianceClassName = isActive ? styles.allegianceIsActive : undefined;

                return (
                  <li key={allegiance.id}>
                    <Button className={allegianceClassName} onClick={() => setActiveAllegiance(allegiance.slug)} color="yellow">{allegiance.name}</Button>
                  </li>
                )
              })}
                <li>
                  <Button className={!activeAllegiance && styles.allegianceIsActive} onClick={() => setActiveAllegiance(null)} color="yellow">All</Button>
                </li>
            </ul>
          </div>
          <div className={styles.search}>
            <h2>Search</h2>
            <form action="">
              <input onChange={handleOnSearch} type="search" />
            </form>
          </div>
        </div>
        <h2 className="sr-only">Available Cards</h2>
        <ul className={styles.products}>
          {activeProducts.map(product => {
            return (
              <li key={product.id}>
                <Link href={`/products/${product.slug}`}>
                  <a>
                    <div className={styles.productImage}>
                      <Image
                        src={product.featuredImage.sourceUrl}
                        alt={product.featuredImage.altText}
                        width={product.featuredImage.mediaDetails.width}
                        height={product.featuredImage.mediaDetails.height}
                      />
                    </div>
                    <h3 className={styles.productTitle}>{product.title}</h3>
                    <p className={styles.productPrice}>${product.productPrice}</p>
                  </a>
                </Link>
                <p>
                  <Button
                    className="snipcart-add-item"
                    data-item-id={product.productId}
                    data-item-price={product.productPrice}
                    data-item-url="/"
                    data-item-description=""
                    data-item-image={product.featuredImage.sourceUrl}
                    data-item-name={product.title}
                  >
                    Add to Cart
                  </Button>
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
    cache: new InMemoryCache()
  });

  const response = await client.query({
    query: gql`
      query AllProductsAndAllegiances {
        products {
          edges {
            node {
              id
              title
              content
              slug
              product {
                productPrice
                productId
              }
              featuredImage {
                node {
                  altText
                  sourceUrl
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              allegiances {
                edges {
                  node {
                    id
                    name
                    slug
                  }
                }
              }
            }
          }
        }
        allegiances {
          edges {
            node {
              id
              name
              slug
            }
          }
        }
      }
    `
  });

  const products = response.data.products.edges.map(({ node }) => {
    return {
      ...node,
      ...node.product,
      price: Number(node.product.productPrice),
      featuredImage: {
        ...node.featuredImage.node
      },
      allegiances: node.allegiances.edges.map(({ node }) => node)
    }
  });

  const allegiances = response.data.allegiances.edges.map(({ node }) => node);

  return {
    props: {
      products,
      allegiances
    }
  }
}

export default Home
