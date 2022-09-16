import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import Player from "../components/player";
import {
  deletePlayer,
  filteredByAge,
  getPlayers,
  searchPlayer,
} from "../services";
import { toast } from "react-toastify";
import { AppContext } from "./_app";

export default function ListOfPlayers() {
  const { playersList, setPlayersList } = useContext(AppContext);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [selectVal, setSelectVal] = useState("");

  useEffect(() => {
    fetchData();
  }, [playersList]);

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

  const filterPlayers = (fAge, lAge) => {
    filteredByAge(fAge, lAge)
      .then((res) => {
        setPlayersList(res?.data);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const deleteHandler = (id) => {
    if (id) {
      deletePlayer(id)
        .then((res) => {
          const filteredPlayerList = playersList.filter(
            (player) => player._id !== id
          );
          setPlayersList(filteredPlayerList);
          toast.success("deleted record successfully");
        })
        .catch((err) => {
          toast.error(err);
        });
    } else {
      toast.error("id not found");
    }
  };
  return (
    <div className={styles.listSection}>
      <div className={styles.filters}>
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
        <div className={styles.resultFound}>
          {playersList.length} Result found
        </div>
      </div>
      <div className={styles.cards}>
        <input
          value={search}
          name="search"
          placeholder="search by name"
          className={styles.search}
          onChange={searchHandler}
        />
        {playersList.length > 0 ? (
          playersList.map((player) => (
            <Player
              player={player}
              key={player._id}
              deleteHandler={deleteHandler}
            />
          ))
        ) : loader ? (
          <h1>loading...</h1>
        ) : (
          <h1>No Record Found</h1>
        )}
      </div>
    </div>
  );
}
