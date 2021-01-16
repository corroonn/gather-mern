import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "./components/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./App.styles.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";

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
      .then(getFreshData);
  };

  // Delete button

  const handleDelete = (e) => {
    console.log(e.target.name);

    const payload = {
      id: e.target.name,
    };

    axios({
      url: "/api/delete",
      method: "POST",
      data: payload,
    }).catch(() => {
      console.log("Internal server error.");
    });
  };

  // Data refresh function

  const getFreshData = () => {
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
  };

  // map data to the dom

  const displayTeam = posts.map((details) => {
    return (
      <Card key={details._id} lg={4}>
        <Card.Body style={{}}>
          <Card.Title>
            {details.name} - {details.title}
          </Card.Title>
          <Card.Text>{details.description}</Card.Text>
          <Button name={details._id} onClick={handleDelete}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    );
  });

  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <Container>
          <h1>Add team member.</h1>
          <Row>
            <Col lg={5}>
              <Form>
                <Form.Group controlId="formBasicText">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your team members name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicText">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter your team member’s title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicText">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text-area"
                    name="title"
                    placeholder="Enter your team member’s title"
                    value={description}
                    onChange={(e) => setDescript(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </Form>
            </Col>

            <Col lg={{ span: 5, offset: 2 }}>
              <Card>
                <Card.Body>
                  <Card.Title>{name === "" ? "Enter a name" : name}</Card.Title>
                  <Card.Title>
                    {title === "" ? "Enter a title" : title}
                  </Card.Title>
                  <Card.Text>
                    {description === "" ? "Enter a description" : description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <CardColumns id="display-teams">{displayTeam}</CardColumns>
        </Container>
      </main>
    </>
  );
}

export default App;
