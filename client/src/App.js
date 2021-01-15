import React, { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [description, setDescript] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title: name,
      body: description,
    };

    axios({
      url: "/api/save",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Data has been sent to the server.");
      })
      .catch(() => {
        console.log("Internal server error.");
      });
  };

  return (
    <div>
      <div>welcome to my app</div>
      <form>
        <div className="form-input">
          <input
            type="text"
            name="title"
            placeholder="enter title"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="form-input">
          <input
            name="body"
            placeholder="enter body"
            cols="30"
            rows="10"
            value={description}
            onChange={(e) => setDescript(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default App;
