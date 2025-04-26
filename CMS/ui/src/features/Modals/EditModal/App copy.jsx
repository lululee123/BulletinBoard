import "./App.css";

function App() {
  const onClick = async () => {
    await fetch("http://localhost:1000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "Hello from the frontend!",
        author: "lulu lee",
        createdAt: new Date(),
      }),
    });
  };

  return (
    <>
      <div className="card">
        <button onClick={onClick}>post</button>
      </div>
    </>
  );
}

export default App;
