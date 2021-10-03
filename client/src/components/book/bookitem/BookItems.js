import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, Button,CardActionArea} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import useStyles from './styles';


const BookItem = ({product: bookItem, onAddToCart}) => {
    const classes = useStyles();
    return (
        <Card className={classes.root} style={{width:'100%', width:'200px', paddingLeft:'10px', paddingRight:'10px', paddingTop:'10px'}} >
        <Link to={`product-view/${bookItem.id}`} >
        <CardActionArea>
        <CardMedia className={classes.media} style={{height: '300px', paddingTop: '56.25%'}}  image={bookItem.image} title={bookItem.title}  />
        </CardActionArea>
        </Link>
        <CardContent>
          <div className={classes.cardContent}>
            <Typography  variant="h5">
            {bookItem.title}
            </Typography>
            <Typography variant="h6" color="secondary">
              Rs.<b>{bookItem.price}</b> 
            </Typography>
          </div>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          <Button variant="contained" className={classes.button} endIcon={<AddShoppingCart />} onClick={() => onAddToCart(bookItem.id, 1)} >
            <b>ADD TO CART</b>
          </Button>
        </CardActions>
        </Card>
    )
}

export default BookItem;