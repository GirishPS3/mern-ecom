import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { Collapse } from '@material-ui/core';
import logo from '../../images/logo.png'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    color: "#ffff"
  },
}));

export default function MiniDrawer({ selectedNav, children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [showProducList, setshowProducList] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleProducts = () => {
    setshowProducList(!showProducList)
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        color="default"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <h2>
            Admin Dashboard
          </h2>
        </Toolbar>
      </AppBar>
      <StyledDrawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Link to='/'><img src={logo} width="50px" alt="" /></Link>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <StyledListItem component={Link} to="/dashboard" isSelected={selectedNav === 'Dashboard'}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <p>Dashboard</p>
          </StyledListItem>
          <StyledListItem button onClick={handleProducts} isSelected={selectedNav === 'Products'}>
            <ListItemIcon><ListAltIcon /></ListItemIcon>
            <p>Products</p>
          </StyledListItem>
          <StyledCollapse in={showProducList} timeout="auto" unmountOnExit>
            <List component="div" >
              <StyledListItem component={Link} to="/admin/products">
                <ListItemIcon>
                  <PostAddIcon />
                </ListItemIcon>
                <p>All</p>
              </StyledListItem>
              <StyledListItem component={Link} to="/admin/product">
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <p>Create</p>
              </StyledListItem>
            </List>
          </StyledCollapse>
          <StyledListItem component={Link} to="/admin/orders" isSelected={selectedNav === 'Orders'}>
            <ListItemIcon><ImportExportIcon/></ListItemIcon>
            <p>Orders</p>
          </StyledListItem>
          <StyledListItem component={Link} to="/admin/users" isSelected={selectedNav === 'User'}>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <p>Users</p>
          </StyledListItem>
          <StyledListItem component={Link} to="/admin/reviews" isSelected={selectedNav === 'Reviews'}>
            <ListItemIcon><RateReviewIcon /></ListItemIcon>
            <p>Reviews</p>
          </StyledListItem>
        </List>
      </StyledDrawer>
      <ContentContainer >
        {children}
      </ContentContainer>
    </div>
  );
}
const ContentContainer = styled.main`
  padding: 20px;
  width: 100%;
  display:flex;
}
`;
const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    background-color: #03045e;
    border: none;
  }
  .MuiIconButton-root{
    color: #ffff;
  }
`;
const StyledListItem = styled(ListItem)`
  &.MuiListItem-root {
    background-color: ${props => props.isSelected ? '#ffff' : '#03045e'};
    border-radius: ${props => props.isSelected && '26px 0 0 26px'};
    cursor: pointer;
  }
  .MuiListItemIcon-root,p{
    font-size: 16px;
    color: ${props => props.isSelected ? '#000000' : '#ffff'};
  }
  p{
    margin: 8px 0
  }
  .
`;
const StyledCollapse = styled(Collapse)`
  padding-left: 15px;
`;