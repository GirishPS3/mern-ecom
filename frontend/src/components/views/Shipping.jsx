import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { saveShippingInfo } from "../../store/actions/cart";
import styled from 'styled-components';
import { useHistory } from "react-router";
import CheckoutSteps from "../common/Stepper";

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useHistory()
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [zipcode, setPinCode] = useState(shippingInfo.zipcode);
  const [contactNo, setPhoneNo] = useState(shippingInfo.contactNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (contactNo.length < 10 || contactNo.length > 10) {
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, zipcode, contactNo })
    );
    navigate.push("/order/confirm");
  };

  return (
    <Container>

      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={zipcode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={contactNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <PublicIcon />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Shipping;
const Container = styled.div`
padding-top: 4vmax;
.shippingContainer {
  width: 100vw;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.shippingBox {
  background-color: white;
  width: 25vw;
  height: 90vh;
  box-sizing: border-box;
  overflow: hidden;
}

.shippingHeading {
  text-align: center;
  color: rgba(0, 0, 0, 0.664);
  font: 400 1.3vmax "Roboto";
  padding: 1.3vmax;
  border-bottom: 1px solid rgba(0, 0, 0, 0.205);
  width: 50%;
  margin: auto;
}

.shippingForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 2vmax;
  justify-content: space-evenly;
  height: 80%;
  transition: all 0.5s;
}

.shippingForm > div {
  display: flex;
  width: 100%;
  align-items: center;
}

.shippingForm > div > input,
.shippingForm > div > select {
  padding: 1vmax 4vmax;
  padding-right: 1vmax;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.267);
  border-radius: 4px;
  font: 300 0.9vmax cursive;
  outline: none;
}

.shippingForm > div > svg {
  position: absolute;
  transform: translateX(1vmax);
  font-size: 1.6vmax;
  color: rgba(0, 0, 0, 0.623);
}

.shippingBtn {
  border: none;
  background-color: tomato;
  color: white;
  font: 300 1vmax "Roboto";
  width: 100%;
  padding: 1vmax;
  cursor: pointer;
  transition: all 0.5s;
  outline: none;
  margin: 2vmax;
}

.shippingBtn:hover {
  background-color: rgb(179, 66, 46);
}

@media screen and (max-width: 600px) {
  .shippingBox {
    width: 100vw;
    height: 95vh;
  }

  .shippingHeading {
    font: 400 6vw "Roboto";
    padding: 5vw;
  }

  .shippingForm {
    padding: 11vw;
  }

  .shippingForm > div > input,
  .shippingForm > div > select {
    padding: 5vw 10vw;
    font: 300 4vw cursive;
  }

  .shippingForm > div > svg {
    font-size: 6vw;
    transform: translateX(3vw);
  }

  .shippingBtn {
    font: 300 4vw "Roboto";
    padding: 4vw;
  }
}
`;