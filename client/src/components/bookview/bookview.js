import React from 'react'
import { Container, Grid, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {commerce} from '../../lib/commerce';
import { useState, useEffect } from "react";
import './style.css'

const createMarkup = (text) => {
    return { __html: text };
  };

const BookView = () => {

    const [book, setBook] = useState({});

    const fetchBook = async (id) => {
        const response = await commerce.products.retrieve(id);
        console.log({ response });
        const { name, price, media, quantity, description } = response;
        setBook({
          name,
          quantity,
          description,
          src: media.source,
          price: price.formatted_with_symbol,
        });
      };

      useEffect(() => {
        const id = window.location.pathname.split("/");
        fetchBook(id[2]);
      }, []);

    return (
        <Container className="book-view">
          <Grid container>
            <Grid item xs={12} md={6} className="image-wrapper">
              <img src={book.src} alt={book.name}
              />
            </Grid>
            <Grid item xs={12} md={5} className="text">
              <Typography variant="h2"><b>{book.name}</b></Typography>
              <hr />
              <Typography variant="p" dangerouslySetInnerHTML={createMarkup(book.description)} />
              <Typography variant="h3" color="secondary" >Price: <b> {book.price} </b> </Typography>
              <br/>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Button size="large" className="custom-button" component={Link} to='/' >
                     Continue Shopping
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      );
    };
    
    export default BookView;
