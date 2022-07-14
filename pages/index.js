import Head from 'next/head'
import { useUser } from "@auth0/nextjs-auth0/dist/frontend";
import LoggedOutHome from 'components/LoggedOutHome';
import LoggedInHome from 'components/LoggedInHome';

export default function Home() {
  const { user } = useUser();

  return (
    <div>
      <Head>
        <title>Shortiezzz</title>
      </Head>
      {
        user
          ? <LoggedInHome />
          : <LoggedOutHome />
      }
    </div>
  )
}
