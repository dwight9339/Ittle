import Head from 'next/head'
import { Container, Card, Stack } from '@mantine/core'

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Shortiezzz</title>
      </Head>
      <Card
        withBorder
      >
        <Stack align="center">
          <h1>Welcome to Shortiezzz</h1>
          <p>
            Shortiezzz is a url shortening app that blah, blah, yak, yak, drivel, drivel, drivel.
          </p>
        </Stack>
      </Card>
    </Container>
  )
}
