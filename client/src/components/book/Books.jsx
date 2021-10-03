import React, { useState, useEffect } from "react";
import { Grid, InputAdornment, Input, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import BookItem from "./bookitem/BookItems";
import useStyles from "./styles";
import Carousel from "react-bootstrap/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo1 from "../../assets/2.png";
import logo2 from "../../assets/3.png";
import logo3 from "../../assets/4.png";
import { Link } from "react-router-dom";
import axios from 'axios';

function Books({ products, onAddToCart }) {
  const classes = useStyles();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([])

  useEffect(() => {
    axios.get('https://ssd-assignment-2-backend.herokuapp.com/api/v1/books')
    .then(res => {
      console.log(res)
      setBooks(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  },[])
  
  return(
    <main >

    <div className={classes.content} >
    <div className={classes.toolbar} />
    <Carousel fade infiniteLoop useKeyboardArrows autoPlay>
      <Carousel.Item>
        <img className="d-block w-100" src={logo1} alt=" slide" />
        <Carousel.Caption>
            <Button
              className={classes.but}
              size="large"
              variant="contained"
              color="secondary"
              href="#pro"
            >
              Explore
            </Button>
          </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={logo3} alt="Second slide" />
        <Carousel.Caption>
            <Button
              className={classes.but}
              size="large"
              variant="contained"
              color="secondary"
              href="#pro"
            >
              Explore
            </Button>
          </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={logo2} alt="Third slide" />
        <Carousel.Caption>
            <Button
              className={classes.but}
              size="large"
              variant="contained"
              color="secondary"
              href="#pro"
            >
              Explore
            </Button>
          </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

   <br />


  <div className={classes.searchs}>
    <Input
        className={classes.searchb}
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
    />
 </div>

    <Grid className={classes.content} container justify="center" spacing={5}>
      {books
        .filter((product) => {
          if (searchTerm === "") {
            return product;
          } else if (
            product.title
              .toLowerCase()
              .includes(searchTerm.toLocaleLowerCase())
          ) {
            return product;
          }
        })
        .map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} id="pro">
            <BookItem product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
    </Grid>
    </div>

   
  </main>

  )
}

export default Books;