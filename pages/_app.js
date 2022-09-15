import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import Layout from "../layout";

Axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BASE_URl}`;

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
