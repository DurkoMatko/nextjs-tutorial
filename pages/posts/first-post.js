import Link from "next/link"; //link does JS navigation without reloading the whole page
import Head from "next/head"; // similar to React Helmet
import Layout from "../../components/layout";

// everythin in pages directory is a page
// this is /post/first-page
export default function FirstPost() {
  return (
    <Layout home>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
}
