import styles from "../styles/Home.module.css";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { updatePlayer } from "../services";
import { FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";

const Player = ({ player, deleteHandler }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updatedPlayer, setUpdatedPlayer] = useState({
    ...player,
  });
  const { name, age, matches } = updatedPlayer;
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
        width={150}
        height={200}
        objectFit="fill"
        alt="player"
        className={styles.img}
      />
      <div className={styles.detailWrapper}>
        <div>
          <h4>Name</h4>
          {isEdit ? (
            <input value={name} name="name" onChange={changeHandler} />
          ) : (
            <p>{name}</p>
          )}
        </div>
        <div>
          <h4>Age</h4>
          {isEdit ? (
            <input value={age} name="age" onChange={changeHandler} />
          ) : (
            <p>{age}</p>
          )}
        </div>
        <div>
          <h4>Matches</h4>
          {isEdit ? (
            <input value={matches} name="matches" onChange={changeHandler} />
          ) : (
            <p>{matches}</p>
          )}
        </div>
        <div>
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
      </div>
    </div>
  );
};

export default Player;
