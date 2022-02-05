import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import ContactsIcon from "@material-ui/icons/Contacts";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import MoreIcon from "@material-ui/icons/MoreVert";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ViewListIcon from "@material-ui/icons/ViewList";
import { SpeedDial } from "@material-ui/lab";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../../images/logo.png";
import { logout } from "../../store/actions/user";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    marginRight: "30px",
  },
  root: {
    transform: "translateZ(0px)",
    flexGrow: 1,
  },
  exampleWrapper: {
    position: "relative",
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
  const location = useLocation();
  const { cartItems } = useSelector((state) => state.cart);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchVal, setSearchVal] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { user } = useSelector((state) => state.user);
  const [direction, setDirection] = React.useState("down");
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const logoutUser = () => {
    dispatch(logout());
    history.push("/signin");
  };
  const actions = [
    {
      icon: (
        <StyledLink to="/orders">
          {" "}
          <ListAltIcon />
        </StyledLink>
      ),
      name: "Orders",
      to: "/orders",
    },
    {
      icon: (
        <StyledLink to="/account">
          <PersonIcon />
        </StyledLink>
      ),
      name: "Profile",
      to: "/account",
    },
    {
      icon: (
        <StyledLink to="/cart">
          <ShoppingCartIcon
            style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
          />
        </StyledLink>
      ),
      to: "/cart",
      name: `Cart(${cartItems.length})`,
    },
    {
      icon: (
        <StyledLink onClick={user ? logoutUser : null} to="/signin">
          <ExitToAppIcon />
        </StyledLink>
      ),
      to: "/signin",
      name: "Logout",
    },
  ];

  if (user?.role === "admin") {
    actions.unshift({
      icon: (
        <StyledLink to="/dashboard">
          {" "}
          <DashboardIcon />
        </StyledLink>
      ),
      name: "Dashboard",
      to: "/dashboard",
    });
  }

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
      history.push(`/products/${searchVal}`);
    } else {
      history.push(`/products`);
    }
  };
  const onchangeSearch = (e) => {
    setSearchVal(e.target.value);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
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
      {actions.map((menu) => (
        <MenuItem component={Link} to={menu.to} onClick={menu?.onClick}>
          <IconButton aria-label={menu.name} color="inherit">
            {menu.icon}
          </IconButton>
          <p>{menu.name}</p>
        </MenuItem>
      ))}
    </Menu>
  );
  const [isAdmin, setAdmin] = useState(false);
  useEffect(() => {
    location.pathname === "/dashboard" ? setAdmin(true) : setAdmin(false);
  }, [location]);
  return (
    !isAdmin && (
      <div className={classes.grow}>
        <AppBar position="fixed" color="default">
          <StyledToolbar>
            <div>
              <StyledLink to="/">
                <img src={logo} width="50px" alt="logo" />{" "}
              </StyledLink>
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
              <StyledButton
                startIcon={<ViewListIcon />}
                component={Link}
                to="/products"
              >
                Products
              </StyledButton>

              {!user ? (
                <Button
                  startIcon={<ExitToAppIcon />}
                  component={Link}
                  to="/signin"
                >
                  Sign In
                </Button>
              ) : (
                <>
                  <StyledButton
                    startIcon={<ContactsIcon />}
                    component={Link}
                    to="/about"
                  >
                    {" "}
                    About
                  </StyledButton>
                  <SpeedDialContainer>
                    <StyledSpeedDial
                      ariaLabel="SpeedDial example"
                      hidden={hidden}
                      color="default"
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
                  </SpeedDialContainer>
                </>
              )}
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
    )
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
  .MuiFab-primary {
    background-image: url(${(props) => props.image});
    background-size: contain;
  }
`;
const StyledMenu = styled(Menu)`
  &.Menu-root {
    display flex,
    flex-direction: column;
  }
`;
const StyledLink = styled(Link)`
  color: #535454;
`;
const SpeedDialContainer = styled.div`
  min-width: 60px;

  .MuiSpeedDial-root {
    position: relative;
    margin-top: -10px;
    &.MuiSpeedDial-directionDown {
      position: absolute;
    }
  }
`;
const StyledButton = styled(Button)`
  &.MuiButton-root {
    padding-right: 10px;
  }
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffff;
  border-radius: 5px;
  &:hover {
    border: 1px solid gray;
  }
  input {
    border: none;
    width: 400px;
    max-width: 100%;
    outline: none;
    border-radius: 5px;
    padding: 1vmax;
    @media only screen and (max-width: 450px) {
      width: 100%;
    }
  }
  @media only screen and (max-width: 650px) {
    input {
      width: 100%;
      padding: 2vmax;
    }
  }
`;
