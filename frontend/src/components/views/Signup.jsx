import { Button, Paper, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { clearErrors, login, register } from "../../store/actions/user";
import Loader from "../common/Loader";

export default function Signup({}) {
  const [selectedTab, setTab] = useState(0);
  const navigate = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [loginData, setloginData] = useState({ email: "", password: "" });
  const [signInData, setsignInData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    profileImg: "",
  });
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const handleLoginForm = (e) => {
    setloginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignInForm = (e) => {
    if (e.target.name === "profileImg") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setsignInData({ ...signInData, [e.target.name]: reader.result });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setsignInData({ ...signInData, [e.target.name]: e.target.value });
    }
  };

  const loginUser = () => {
    const { email, password } = loginData;
    const isValid = true;
    if (!email) {
      enqueueSnackbar("email required", { variant: "error" });
      isValid = false;
    }
    if (!password) {
      enqueueSnackbar("password required", { variant: "error" });
      isValid = false;
    }
    if (isValid) {
      dispatch(login(loginData.email, loginData.password));
    }
  };
  const registerUser = () => {
    const { email, name, password, confirmPassword, profileImg } = signInData;
    if (!email) {
      return;
    }
    if (!name) {
      return;
    }
    if (!password) {
      return;
    }
    if (!confirmPassword) {
      return;
    }
    if (password !== confirmPassword) {
      return;
    }
    let formData = new FormData();
    formData.set("email", email);
    formData.set("name", name);
    formData.set("password", password);
    formData.set("avatar", profileImg);

    dispatch(register(formData));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      const isRedirect = window.location.search.split("=")[1];
      navigate.push(isRedirect ? isRedirect : "/account");
    }
  }, [isAuthenticated, error]);
  return (
    <PageContainer>
      {loading ? (
        <Loader />
      ) : (
        <Conatiner elevation="3" selectedTab={selectedTab}>
          <Tab>
            <TabItems isSelected={selectedTab === 0} onClick={() => setTab(0)}>
              Login
            </TabItems>
            <TabItems isSelected={selectedTab === 1} onClick={() => setTab(1)}>
              signup
            </TabItems>
          </Tab>
          {selectedTab === 0 ? (
            <Form action="" id="loginForm">
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={loginData.email}
                onChange={handleLoginForm}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginForm}
              />
              <Link to="/forgot-password">Forgot password?</Link>
              <Button variant="contained" color="primary" onClick={loginUser}>
                Login
              </Button>
            </Form>
          ) : (
            <Form action="" id="singupForm">
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={signInData.email}
                onChange={handleSignInForm}
              />
              <TextField
                label="Name"
                variant="outlined"
                name="name"
                value={signInData.name}
                onChange={handleSignInForm}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                name="password"
                value={signInData.password}
                onChange={handleSignInForm}
              />
              <TextField
                label="Confirm Password"
                variant="outlined"
                name="confirmPassword"
                value={signInData.confirmPassword}
                onChange={handleSignInForm}
              />
              <input
                type="file"
                name="profileImg"
                onChange={handleSignInForm}
              />
              {signInData.profileImg && (
                <img
                  src={signInData.profileImg}
                  width="30px"
                  alt="Avatar Preview"
                />
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={registerUser}
              >
                Signup
              </Button>
            </Form>
          )}
        </Conatiner>
      )}
    </PageContainer>
  );
}
const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
const Form = styled.form`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  a {
    text-align: right;
  }
  input::file-selector-button {
    cursor: pointer;
    width: 100%;
    z-index: 2;
    border: 1px solid gray;
    border-radius: 3px;
    height: 5vh;
    margin: 0%;
    transition: all 0.5s;
    padding: 0 1vmax;
    color: rgba(0, 0, 0, 0.623);
    background-color: rgb(255, 255, 255);
  }
  .MuiFormControl-root,
  .MuiButton-root {
    margin: 5px 0;
  }
`;
const Conatiner = styled(Paper)`
  &.MuiPaper-root {
    padding: 2vmax;
    margin-top: 1vmax;
    min-width: 25vw;
    min-height: 70vh;
  }
`;

const Tab = styled.div`
  display: flex;
  width: 100%;
`;
const TabItems = styled.p`
  padding: 1vmax;
  width: inherit;
  text-align: center;
  border-bottom: ${(props) => props.isSelected && "3px solid tomato"};
  color: ${(props) => props.isSelected && "tomato"};
  transition: all 0.5s ease-in-out;
`;
