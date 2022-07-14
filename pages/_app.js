import { MantineProvider } from "@mantine/core";
import { UserProvider } from "@auth0/nextjs-auth0";
import Shell from 'components/Shell';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <MantineProvider

      >
        <Component {...pageProps} />
      </MantineProvider>
    </UserProvider>
  )
}

export default MyApp
