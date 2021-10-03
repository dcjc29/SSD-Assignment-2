import React from 'react';
import {AppBar, Toolbar, IconButton, Badge, Typography} from '@material-ui/core';
import {ShoppingCart, BookmarksRounded} from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import useStyles from './styles';
import logo from '../../assets/logos.png';
import GoogleLogin from 'react-google-login';

const Navbar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();
    const handleLogin = async googleData => {
      const res = await fetch("/api/v1/auth/google", {
          method: "POST",
          body: JSON.stringify({
          token: googleData.tokenId
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json();
      localStorage.setItem('googleToken',googleData.tokenId);
      console.log(data)
    }

    return (
        <div>
         <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography component={Link} to="/" variant="h4" className={classes.title} color="inherit">
            {/* <BookmarksRounded style={{ fontSize: 45 }}/> */}
            <img src={logo} alt="Book Store App" height="50px" />
              <strong >Fantastic Book Store</strong> 
          </Typography>

            <div className={classes.grow} />
            {location.pathname === '/' && (
            <div className={classes.button}>
                <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                    <Badge badgeContent={totalItems} color="secondary">
                        <ShoppingCart style={{ fontSize: 35 }} />
                    </Badge>
                </IconButton>
          </div>
          )}
        </Toolbar>
        <a href='/' className="btn btn-block btn-primary">
          <span className="fa fa-google"></span> Login
        </a>
      </AppBar>
            
        </div>
    )
}

export default Navbar
