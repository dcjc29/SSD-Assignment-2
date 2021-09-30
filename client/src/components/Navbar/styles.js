import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 0;

export default makeStyles((theme) => ({
  appBar: {
    color:'white',
    boxShadow: 'none',
    background:'#0D7F8C',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    
  },
  title: {
    flexGrow: 1,
    alignItems: 'center',
    marginRight: '10px',
    fontFamily:'Cursive',
    display: 'flex',
    textDecoration: 'none',
    '&:hover': {
      color: '#F2F2F2',
      boxShadow: 'none',    
    },
    
  },
  cartt : {
    '&:hover': {
      color: '#F2F2F2',
      boxShadow: 'none',    
    },
  },
  image: {
    marginRight: '10px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  grow: {
    flexGrow: 1,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


