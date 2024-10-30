import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

import axiosInstance from "../utils/AxiosInstance";
import Book from "../components/Book";

const HomeScreen = () => {
  const [books, setBooks] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await axiosInstance.get("/api/books/");
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const sendBooksEmail = async () => {
    await axiosInstance.post("/api/books/sendEmail", { email });
  };

  return (
    <>
      <h1> Catálogo de Libros </h1>
      <button onClick={sendBooksEmail}>Enviar Correo</button>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Row>
        {books.map((book) => (
          <Col key={book.id} sm={12} md={6} lg={4} xl={3}>
            <Book book={book} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
