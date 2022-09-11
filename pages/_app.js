import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";

Axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BASE_URl}`;

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
