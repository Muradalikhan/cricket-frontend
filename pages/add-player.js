import React, { useState, useRef, useContext } from "react";
import { Button } from "../components";
import { toast } from "react-toastify";
import { addPlayer, uploadImg } from "../services";
import Input from "../components/input";
import styles from "../styles/Addplayer.module.css";
import { AppContext } from "./_app";
import { useRouter } from "next/router";

const AddPlayer = () => {
  const router = useRouter();
  const { setPlayersList } = useContext(AppContext);
  const [player, setPlayer] = useState({
    name: "",
    age: 0,
    average: 0,
    matches: 0,
    image: null,
  });
  const fileRef = useRef(null);

  const changeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setPlayer({
      ...player,
      [key]: value,
    });
  };
  const fileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPlayer((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      uploadImg(formData)
        .then((res) => {
          return addPlayer({
            ...player,
            image: res.data,
          });
        })
        .then((res) => {
          setPlayersList((prev) => [res.data, ...prev]);
          setPlayer({
            name: "",
            age: 0,
            matches: 0,
            average: 0,
            image: null,
          });
          fileRef.current.value = "";
          toast.success("record added");
        })
        .catch((err) => {
          toast.error(err);
        });
    }
    router.push("/list-of-players");
  };

  const { image, age, matches, average, name } = player;

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={submitHandler} className={styles.form}>
        <Input
          name="name"
          value={name}
          type="text"
          label="Name"
          placeholder="Name"
          onChange={changeHandler}
        />
        <Input
          name="age"
          value={age}
          type="number"
          label="Age"
          placeholder="age"
          onChange={changeHandler}
        />
        <Input
          name="matches"
          value={matches}
          label="Matches"
          placeholder="matches"
          type="number"
          onChange={changeHandler}
        />
        <Input
          name="average"
          value={average}
          type="number"
          label="Average"
          placeholder="average"
          onChange={changeHandler}
        />
        <Input
          type="file"
          name="upload-file"
          accept="image/png, image/gif, image/jpeg, image/jpg"
          label="Upload Image"
          onChange={fileHandler}
          ref={fileRef}
        />
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
};

export default AddPlayer;
