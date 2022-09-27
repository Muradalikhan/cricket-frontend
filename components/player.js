import styles from "../styles/Home.module.css";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { updatePlayer } from "../services";
import { FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";
import Tags from "./tags";
import { GiCricketBat } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";

const Player = ({ player, deleteHandler }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updatedPlayer, setUpdatedPlayer] = useState({
    ...player,
  });
  const { name, age, matches, average,topPlayer,mostFavorite } = updatedPlayer;
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdatedPlayer({
      ...updatedPlayer,
      [name]: value,
    });
  };
  const updateHandler = (id) => {
    setIsEdit(false);
    const body = updatedPlayer;
    const playerId = id;
    if (body && playerId) {
      updatePlayer(playerId, body)
        .then((res) => {
          toast.success("data updated successfully");
        })
        .catch((err) => {
          toast.error(err);
        });
    } else {
      toast.error("id not found");
    }
  };
  return (
    <div className={styles.wrapper}>
      <Image
        src={`http://localhost:3333/students/display?fileName=${player.image}`}
        width={200}
        height={200}
        objectFit="cover"
        alt="player"
        className={styles.img}
      />
      <div>
        <div className={styles.tagWrapper}>
          {topPlayer && <Tags Icon={<GiCricketBat />} tag="Top Player" />}
          {mostFavorite && <Tags Icon={<MdFavorite />} tag="Most Favorite" />}
        </div>
        <div className={styles.detailWrapper}>
          <div>
            <h4>Name</h4>
            {isEdit ? (
              <input
                className={styles.editInput}
                value={name}
                name="name"
                onChange={changeHandler}
              />
            ) : (
              <p>{name}</p>
            )}
          </div>
          <div>
            <h4>Age</h4>
            {isEdit ? (
              <input
                className={styles.editInput}
                value={age}
                name="age"
                onChange={changeHandler}
              />
            ) : (
              <p>{age}</p>
            )}
          </div>
          <div>
            <h4>Matches</h4>
            {isEdit ? (
              <input
                className={styles.editInput}
                value={matches}
                name="matches"
                onChange={changeHandler}
              />
            ) : (
              <p>{matches}</p>
            )}
          </div>
          <div>
            <h4>Average</h4>
            {isEdit ? (
              <input
                className={styles.editInput}
                value={average}
                name="average"
                onChange={changeHandler}
              />
            ) : (
              <p>{average}</p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        {!isEdit ? (
          <>
            <FaEdit
              onClick={() => setIsEdit(true)}
              fontSize="30px"
              color="#27b5a7"
            />
            <FaTrash
              onClick={() => deleteHandler(player._id)}
              fontSize="30px"
              color="#e71d36"
            />
          </>
        ) : (
          <FaCheckCircle
            onClick={() => updateHandler(player._id)}
            fontSize="40px"
            color="#27b5a7"
          />
        )}
      </div>
    </div>
  );
};

export default Player;
