import Head from "next/head";

const InvalidUrlPage = () => {
  return (
    <div>
      <Head><title>Invalid URL</title></Head>
      <p>Sorry, this URL is not active.</p>
    </div>
  );
}

export default InvalidUrlPage;