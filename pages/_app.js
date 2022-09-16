import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import Layout from "../layout";
import { useState, createContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";


Axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BASE_URl}`;
export const AppContext = createContext();
function MyApp({ Component, pageProps }) {
  const [playersList, setPlayersList] = useState([]);

  useEffect(() => {}, [playersList]);
  return (
    <AppContext.Provider value={{ playersList, setPlayersList }}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer autoClose={1000} position="bottom-right" />
      </Layout>
    </AppContext.Provider>
  );
}

export default MyApp;
