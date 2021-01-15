import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescript] = useState("");
  const [posts, setPosts] = useState([]);

  // On mount
  useEffect(() => {
    axios
      .get("/api")
      .then((response) => {
        const data = response.data;
        setPosts(data);
        // data.map;
        console.log("data has been recieved.");
      })
      .catch(() => {
        console.log("error retrieving data");
      });
  }, []);

  //form submission

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: name,
      title: title,
      description: description,
    };

    axios({
      url: "/api/save",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Data has been sent to the server.");
      })
      .then(setName(""), setTitle(""), setDescript(""))
      .catch(() => {
        console.log("Internal server error.");
      })
      .then(
        // Get the data again to ensure it's up to date.
        axios
          .get("/api")
          .then((response) => {
            const data = response.data;
            setPosts(data);
            // data.map;
            console.log("data has been recieved.");
          })
          .catch(() => {
            console.log("error retrieving data");
          })
      );
  };

  // map data to the dom

  const displayTeam = posts.map((details) => {
    return (
      <p key={details._id}>
        {details.name} {details.title} {details.description}
      </p>
    );
  });

  return (
    <div>
      <h1>Add team member.</h1>
      <form>
        <label>
          Name
          <br />
          <input
            type="text"
            name="name"
            placeholder="Enter your team members name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Title
          <br />
          <input
            type="text"
            name="title"
            placeholder="Enter your team member’s title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description
          <br />
          <input
            type="text-area"
            name="title"
            placeholder="Enter your team member’s title"
            value={description}
            onChange={(e) => setDescript(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </form>

      <div>
        <h3>
          {name} - {title}
        </h3>
        <p>{description}</p>
      </div>

      <div>{posts.length ? displayTeam : <div>Add a team member</div>}</div>
    </div>
  );
}

export default App;
