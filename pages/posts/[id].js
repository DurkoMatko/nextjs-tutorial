import Layout from "../../components/layout";
import Head from "next/head";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

// this file is used to statically generate pages with dynamic routes

// getStaticPaths passes parameter into getStaticProps
// in this case it returns array of possible ids
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false, //If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.
  };
}

// getStaticProps passes props to default exported component in the file
// in this case it fetches the data for the post by its id
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
