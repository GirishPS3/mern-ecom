import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import { useHistory, useParams } from "react-router";
import { clearErrors, getUserDetails, updateUser } from "../../../store/actions/user";
import { UPDATE_USER_RESET } from "../../../store/constants/user";
import Container from './Container';
import DashboardLayout from '../../common/DashboardLayout';
import Loader from "../../common/Loader";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useHistory();
  const { id } = useParams();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = id;

  useEffect(() => {
    if (!user || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user?.name);
      setEmail(user?.email);
      setRole(user?.role);
    }
    if (error) {
      dispatch(clearErrors());
    }

    if (updateError) {
      dispatch(clearErrors());
    }

    if (isUpdated) {
      dispatch({ type: UPDATE_USER_RESET });
      navigate.push("/admin/users");
    }
  }, [dispatch, error, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUser(userId, { name, email, role }));
  };

  return (
    <Container>
      <DashboardLayout selectedNav="User" >

        <div className="dashboard">
          <div className="newProductContainer">
            {loading ? (
              <Loader />
            ) : (
              <form
                className="createProductForm"
                onSubmit={updateUserSubmitHandler}
              >
                <h1>Update User</h1>

                <div>
                  <PersonIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <VerifiedUserIcon />
                  <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Choose Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                //disabled={
                //  updateLoading ? true : false || role === "" ? true : false
                //}
                >
                  Update
              </Button>
              </form>
            )}
          </div>
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default UpdateUser;