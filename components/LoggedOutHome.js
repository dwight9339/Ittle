import { Container, Card, Stack } from '@mantine/core'


const LoggedOutHome = () => {
  return (
    <Container>
      <Card
        withBorder
      >
        <Stack align="center">
          <h1>Welcome to Ittle</h1>
          <p>
            Ittle is a url shortening app that blah, blah, yak, yak, drivel, drivel, drivel.
          </p>
        </Stack>
      </Card>
    </Container>
  );
}

export default LoggedOutHome;