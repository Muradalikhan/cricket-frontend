import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Player from "../components/player";
import {
  addPlayer,
  filteredByAge,
  getPlayers,
  searchPlayer,
  uploadImg,
} from "../services";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const [playersList, setPlayersList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [selectVal, setSelectVal] = useState("");
  const [player, setPlayer] = useState({
    name: "",
    age: 0,
    matches: 0,
    image:null,
  });
  const fileRef=useRef(null)

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    if (search !== "") {
      searchPlayer(search)
        .then((res) => {
          setPlayersList(res?.data);
        })
        .catch((err) => {
          toast.error(err);
        });
    } else {
      fetchData();
    }
  }, [search]);

  useEffect(() => {
    if (selectVal == 0) {
      fetchData();
    } else if (selectVal == 1) {
      filterPlayers(10, 20);
    } else if (selectVal == 2) {
      filterPlayers(21, 30);
    } else if (selectVal == 3) {
      filterPlayers(31, 40);
    }
  }, [selectVal]);
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const fetchData = () => {
    setLoader(true);
    getPlayers()
      .then((res) => {
        setPlayersList(res?.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        toast.error(err);
      });
  };

  const deleteUser = (id) => {
    const filteredPlayerList = playersList.filter(
      (player) => player._id !== id
    );
    setPlayersList(filteredPlayerList);
  };

  const changeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setPlayer({
      ...player,
      [key]: value,
    });
  };
  const fileHandler=(e)=>{
    const file=e.target.files[0]
    if(file){
      setPlayer(prev=>({
        ...prev,
        image:file
      }))
    }
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if(image){
      const formData=new FormData();
      formData.append("file",image);

      uploadImg(formData)
      .then((res)=>{
        return addPlayer({
          ...player,
          image:res.data
        });
      }).then((res)=>{
        setPlayersList((prev) => [res.data,...prev]);
        setPlayer({
          name: "",
          age: 0,
          matches: 0,
          image: null,
        });
        fileRef.current.value="";
        toast.success('record added')
      })
      .catch((err)=>{toast.error(err)})
    }
  };

  const filterPlayers = (fAge, lAge) => {
    filteredByAge(fAge, lAge)
      .then((res) => {
        setPlayersList(res?.data);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const { image, age, matches, name } = player;

  return (
    <div className={styles.container}>
      <Head>
        <title>Cricket App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form onSubmit={submitHandler} className={styles.form}>
          <input
            type="file"
            name="upload-file"
            accept="image/png, image/gif, image/jpeg, image/jpg"
            onChange={fileHandler}
            ref={fileRef}
          />
          <input
            name="name"
            value={name}
            placeholder="name"
            onChange={changeHandler}
          />
          <input
            name="age"
            value={age}
            placeholder="age"
            type="number"
            onChange={changeHandler}
          />
          <input
            name="matches"
            value={matches}
            placeholder="matches"
            type="number"
            onChange={changeHandler}
          />
          <button type="submit">Add</button>
        </form>

        <input
          value={search}
          name="search"
          placeholder="search by name"
          className={styles.search}
          onChange={searchHandler}
        />
        <select
          placeholder="filter by Age"
          value={selectVal}
          className={styles.select}
          onChange={(e) => setSelectVal(e.target.value)}
        >
          <option value="" disabled selected hidden>
            filter by age
          </option>
          <option value={0}>All</option>
          <option value={1}>10 - 20</option>
          <option value={2}>21 - 30</option>
          <option value={3}>31 - 40</option>
        </select>
        {playersList.length > 0 ? (
          playersList.map((player) => (
            <Player player={player} key={player._id} deleteUser={deleteUser} />
          ))
        ) : loader ? (
          <h1>loading...</h1>
        ) : (
          <h1>No Record Found</h1>
        )}
      </main>

      <footer className={styles.footer}>welove@crickit</footer>
      <ToastContainer autoClose={1000} position="bottom-right" />
    </div>
  );
}
