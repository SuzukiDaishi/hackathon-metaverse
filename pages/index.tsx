import Head from 'next/head'
import Container from '@/styles/Container.module.css'
import { Stage } from '@/components/Stage'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={Container.container}>
        <Stage />
      </main>
    </>
  )
}