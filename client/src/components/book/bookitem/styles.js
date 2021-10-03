import { colors } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(5),
  },
  root: {
    flexGrow: 1,
    maxWidth: 300,
    height:'100%',
    margin: "auto",
    paddingLeft:'10px', 
    paddingRight:'10px', 
    paddingTop:'10px',
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  searchs: {
    justifyContent: 'center',
    display: 'flex',
    marginTop: '40px',
    },

  searchb: {
    marginBottom: '10px',
    height: '50%',
    width: '50%',
    paddingLeft: '10px',
    },
    cardActions:{
      justifyContent: 'center',
      display: 'flex',
    },
    button: {
      color:'#FFFFFF',
      backgroundColor:'#004d40',
    }
}));