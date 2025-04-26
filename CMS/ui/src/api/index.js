export const getRoomList = async () => {
  return await fetch("http://localhost:3000/rooms").then((res) => res.json());
};

export const createRoom = async (payload) => {
  return await fetch("http://localhost:3000/rooms", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const deleteRoom = async (id) => {
  return await fetch(`http://localhost:3000/rooms/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
};

export const getRoomDetail = async (id) => {
  return await fetch(`http://localhost:3000/rooms/${id}`).then((res) =>
    res.json()
  );
};

export const updateRoom = async ({ id, payload }) => {
  delete payload._id;
  
  return await fetch(`http://localhost:3000/rooms/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};
