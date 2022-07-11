import Head from 'next/head'
import Image from 'next/image'
import styles from 'styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Shortiezzz</title>
      </Head>
      <h1>Welcome to Shortiezzz</h1>
    </div>
  )
}
