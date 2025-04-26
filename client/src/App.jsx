import React, { useEffect, useState } from "react";
import "./App.css";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  const postsRef = collection(db, "posts");

  // // READ
  // const fetchPosts = async () => {
  //   const snapshot = await getDocs(postsRef);
  //   const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //   setPosts(data);
  // };

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  // // CREATE or UPDATE
  // const handleSubmit = async () => {
  //   if (input.trim() === "") return;

  //   if (editId) {
  //     const postDoc = doc(db, "posts", editId);
  //     await updateDoc(postDoc, { content: input });
  //     setEditId(null);
  //   } else {
  //     await addDoc(postsRef, { content: input });
  //   }

  //   setInput("");
  //   fetchPosts();
  // };

  // // DELETE
  // const handleDelete = async (id) => {
  //   await deleteDoc(doc(db, "posts", id));
  //   fetchPosts();
  // };

  // // EDIT (populate input)
  // const handleEdit = (post) => {
  //   setInput(post.content);
  //   setEditId(post.id);
  // };

  useEffect(() => {
    fetch("https://us-central1-BulletinBoard.cloudfunctions.net/api/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>📌 Firebase BulletinBoard</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a post..."
      />
      <button onClick={handleSubmit}>{editId ? "Update" : "Add"}</button>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.content} <button onClick={() => handleEdit(post)}>✏️</button>
            <button onClick={() => handleDelete(post.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
