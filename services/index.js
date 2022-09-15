import axios from "axios";

function getPlayers() {
  return new Promise((resolve, reject) => {
    axios
      .get("students")
      .then((res) => resolve(res))
      .catch((err) => {
        if (err && err.response) {
          reject(err.message);
        }
      });
  });
}


function addPlayer(body) {
  return new Promise((resolve, reject) => {
    axios
      .post(`students`, body)
      .then((res) => resolve(res))
      .catch((err) => {
        if (err && err.response) {
          reject(err.message);
        }
      });
  });
}
function updatePlayer(playerId,body) {
  return new Promise((resolve, reject) => {
    axios
      .put(`students/${playerId}`, body)
      .then((res) => resolve(res))
      .catch((err) => {
        if (err && err.response) {
          reject(err.message);
        }
      });
  });
}

function deletePlayer(playerId) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`students/${playerId}`)
      .then((res) => resolve(res))
      .catch((err) => {
        if (err && err.response) {
          reject(err.message);
        }
      });
  });
}
function searchPlayer(name) {
  return new Promise((resolve, reject) => {
    axios
      .get(`students/search?name=${name}`)
      .then((res) => resolve(res))
      .catch((err) => {
        if (err && err.response) {
          reject(err.message);
        }
      });
  });
}

function filteredByAge(fAge,lAge) {
  return new Promise((resolve, reject) => {
    axios
      .get(`students/filterByAge?fAge=${fAge}&lAge=${lAge}`)
      .then((res) => resolve(res))
      .catch((err) => {
        if (err && err.response) {
          reject(err.message);
        }
      });
  });
}
function uploadImg(data) {
  return new Promise((resolve, reject) => {
    axios({
      url: `students/upload`,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data
    })
      .then((res) => resolve(res))
      .catch((err) => {
        if (err && err.response) {
          reject(err.message);
        }
      });
  });
}


export {
  getPlayers,
  addPlayer,
  updatePlayer,
  deletePlayer,
  searchPlayer,
  filteredByAge,
  uploadImg,
};
