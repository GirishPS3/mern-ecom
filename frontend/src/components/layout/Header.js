import React, { useEffect, useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ContactsIcon from '@material-ui/icons/Contacts';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ViewListIcon from '@material-ui/icons/ViewList';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../store/actions/user';
import styled from 'styled-components'
import { SpeedDial } from '@material-ui/lab';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link, useHistory, useLocation } from 'react-router-dom';
import logo from '../../images/logo.png'
import { Button, InputAdornment } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    marginRight: '30px'
  },
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  exampleWrapper: {
    position: 'relative',
    marginTop: theme.spacing(3),
    height: 380,
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },

}));

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation()
  const { cartItems } = useSelector((state) => state.cart);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchVal, setSearchVal] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { user } = useSelector(state => state.user);
  const [direction, setDirection] = React.useState('down');
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const logoutUser = () => {
    dispatch(logout());
    history.push('/signin')
  }
  const actions = [
    { icon: <Link to='/orders'> <ListAltIcon /></Link>, name: "Orders" },
    { icon: <Link to='/account'><PersonIcon /></Link>, name: "Profile", },
    {
      icon: (
        <Link to='/cart'><ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        /></Link>
      ),
      name: `Cart(${cartItems.length})`,
    },
    { icon: <Link onClick={user ? logoutUser : null} to='/signin' ><ExitToAppIcon /></Link>, name: "Logout" },
  ];

  if (user?.role === "admin") {
    actions.unshift({
      icon: <Link to='/dashboard'> <DashboardIcon /></Link>,
      name: "Dashboard",
    });
  }


  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  };

  const handleHiddenChange = (event) => {
    setHidden(event.target.checked);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const searchProducts = () => {
    if (searchVal?.trim()) {
      history.push(`/products/${searchVal}`)
    } else {
      history.push(`/products`)

    }
  };
  const onchangeSearch = (e) => {
    setSearchVal(e.target.value);
  }

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      id={mobileMenuId}
      keepMounted
      disableScrollLock={true}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const [isAdmin, setAdmin] = useState(false);
  useEffect(() => {
    location.pathname === '/dashboard' ? setAdmin(true) : setAdmin(false);
  }, [location])
  return (!isAdmin &&
    <div className={classes.grow}>
      <AppBar position="fixed" color="default">
        <StyledToolbar>
          <div>
            <Link to='/'><img src={logo} width="50px" alt="logo" /> </Link>
          </div>
          <SearchContainer>
            <input
              label="Search"
              value={searchVal}
              onChange={onchangeSearch}
              placeholder="Search Product name…"
            />
            <SearchIcon onClick={searchProducts} />
          </SearchContainer>
          <div className={classes.sectionDesktop}>
            <StyledButton startIcon={<ViewListIcon />} component={Link} to='/products'>Products</StyledButton>

            {!user ? <Button startIcon={<ExitToAppIcon />} component={Link} to='/signin'>Sign In</Button> :
              <><StyledButton startIcon={<ContactsIcon />} component={Link} to='/about'> About</StyledButton>
                <SpeedDialContainer>
                  <StyledSpeedDial
                    ariaLabel="SpeedDial example"
                    hidden={hidden}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                    image={user?.avatar?.url}
                    direction={direction}
                  >
                    {actions.map((action) => (
                      <SpeedDialAction
                        key={action.name}
                        className={classes.speedDialIcon}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={handleClose}
                        tooltipOpen={window.innerWidth >= 600 ? true : false}
                      />
                    ))}
                  </StyledSpeedDial>
                </SpeedDialContainer></>}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </StyledToolbar>
      </AppBar>
      {renderMobileMenu}


    </div>
  );
}
const StyledToolbar = styled(Toolbar)`
  &.MuiToolbar-root {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const StyledSpeedDial = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    background-image: ${props => props.image && `url(http://localhost:5001/${props.image})`};
    background-size: contain;
  }
`;
const StyledMenu = styled(Menu)`
  &.Menu-root {
    display flex,
    flex-direction: column;
  }
`;
const SpeedDialContainer = styled.div`
min-width: 60px;

.MuiSpeedDial-root{
  position: relative;
  margin-top: -10px;
  &.MuiSpeedDial-directionDown {
    position: absolute;
  }
}
`;
const StyledButton = styled(Button)`
  &.MuiButton-root{
    padding-right: 10px;
  }
`;
const SearchContainer = styled.div`
display: flex;
align-items: center;
background-color: #ffff;
border-radius: 5px;
&:hover{
  border: 1px solid gray;
}
input{
  border: none;
  width: 400px;
  max-width: 100%;
  outline: none;
  border-radius: 5px;
  padding: 1vmax;
  @media only screen and (max-width: 450px){
    width: 100%;
  }
 
}
@media only screen and (max-width: 650px){
  
  input{
    width: 100%;
    padding: 2vmax;
  }
}
`;