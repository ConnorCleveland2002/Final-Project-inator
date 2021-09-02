import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Card, CardColumns, Container } from "react-bootstrap";
import { GET_ME } from "../utils/queries";

const WhoAmI = () => {
  const [meme, setMeme] = useState([]);
  const { loading, data } = useQuery(GET_ME);

  const goGetMe = async (event) => {
    try {
      // if (!response.ok) {
      //   throw new Error("something went wrong!");
      // }

      // const { items } = response.json();

      const meData = data.me.map((me) => ({
        _id: me._id,
        username: me.username,
        email: me.email,
      }));

      setMeme(meData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container>
        {goGetMe()}
        <CardColumns>
          {meme.map((me) => {
            return (
              <Card.Body>
                <Card.Title>{me.username}</Card.Title>
                <Card.Text>{me.email}</Card.Text>
                <p className="small">ID: {me._id}</p>
              </Card.Body>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default WhoAmI;
