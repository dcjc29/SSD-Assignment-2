import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, Button,CardActionArea} from '@material-ui/core';
import { SaveAlt  } from '@material-ui/icons';
import Divider from "@material-ui/core/Divider";
import { Link } from 'react-router-dom';
import useStyles from './styles';


const BookItem = ({product: bookItem, onAddToCart}) => {
    const classes = useStyles();
    return (
        <Card className={classes.root} >
        <Link to={`product-view/${bookItem.id}`} >
        <CardActionArea>
        <CardMedia className={classes.media} style={{height: '300px', paddingTop: '56.25%'}}  image={bookItem.image} title={bookItem.title}  />
        </CardActionArea>
        </Link>
        <CardContent>
          <div className={classes.cardContent} style={{textAlign:'center'}}>
            <Typography  variant="h4"  style={{fontWeight:'bold'}}>
            {bookItem.title}
            </Typography>
            <Typography  variant="h5"  style={{textAlign:'right', marginTop:'20px', color:'#808080'}}>
            {bookItem.author}
            </Typography>
            <Divider light style={{marginTop:'20px'}}/>
            <Typography
            style={{lineHeight: 1.8,textAlign:'left'}}
            variant="h6"
          >
            {bookItem.description}
          </Typography>

            <Typography variant="h4" gutterBottom color="secondary" >
              Rs.<b>{bookItem.price}.00 </b>
            </Typography>
          </div>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          <Button variant="contained" className={classes.button} endIcon={<SaveAlt  />} onClick={() => onAddToCart(bookItem.id, 1)} >
            <b>Get Digital Copy</b>
          </Button>
        </CardActions>
        </Card>
    )
}

export default BookItem;