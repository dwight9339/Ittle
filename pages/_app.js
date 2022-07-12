import { MantineProvider } from "@mantine/core";
import Shell from 'components/Shell';

function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider

    >
      <Shell>
        <Component {...pageProps} />
      </Shell>
    </MantineProvider>
  )
}

export default MyApp
