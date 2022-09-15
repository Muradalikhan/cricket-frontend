import styles from "../styles/Home.module.css";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { deletePlayer, updatePlayer } from "../services";

const Player = ({ player, deleteUser }) => {
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
  const deleteHandler = (id) => {
    if (id) {
      deleteUser(id);
      deletePlayer(id)
        .then((res) => {
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
    <div className={styles.wrapper}>
      <Image
        src={`http://localhost:3333/students/display?fileName=${player.image}`}
        width={200}
        height={250}
        objectFit="fill"
        alt="player"
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
          <h4>matches</h4>
          {isEdit ? (
            <input value={matches} name="matches" onChange={changeHandler} />
          ) : (
            <p>{matches}</p>
          )}
        </div>
        <div>
          <h4>Actions</h4>
          <div className={styles.actions}>
            {!isEdit ? (
              <>
                <button onClick={() => setIsEdit(true)}>edit</button>
                <button onClick={() => deleteHandler(player._id)}>
                  delete
                </button>
              </>
            ) : (
              <button onClick={() => updateHandler(player._id)}>update</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
