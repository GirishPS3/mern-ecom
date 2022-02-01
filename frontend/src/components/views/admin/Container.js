import styled from 'styled-components';

const Container = styled.div`
.dashboard {
  width: -webkit-fill-available;
}

.dashboardContainer {
  border-left: 1px solid rgba(0, 0, 0, 0.13);
  background-color: rgb(255, 255, 255);
  padding: 3rem 0;
}

.dashboardContainer > h1 {
  color: rgba(0, 0, 0, 0.733);
  font: 300 2rem "Roboto";
  text-align: center;
  width: 50%;
  padding: 1.5rem;
  margin: auto;
}

.dashboardSummary {
  margin: 2rem 0;
}

.dashboardSummary > div {
  display: flex;
  background-color: white;
  justify-content: center;
}
.dashboardSummary > div > p {
  background-color: rgba(70, 117, 218, 0.932);
  color: white;
  font: 300 1.3rem "Roboto";
  text-align: center;
  padding: 1.5rem;
  width: 100%;
  margin: 0 2rem;
}
.dashboardSummaryBox2 > a {
  color: rgb(0, 0, 0);
  font: 300 2rem "Roboto";
  text-align: center;
  background-color: rgb(255, 233, 174);
  text-decoration: none;
  padding: 1.5rem;
  width: 10vmax;
  height: 10vmax;
  margin: 2rem;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.dashboardSummaryBox2 > a:first-child {
  background-color: rgb(255, 110, 110);
  color: rgb(255, 255, 255);
}

.dashboardSummaryBox2 > a:last-child {
  background-color: rgb(51, 51, 51);
  color: rgb(255, 255, 255);
}

.lineChart {
  width: 80%;
  margin: auto;
}

.doughnutChart {
  width: 30vmax;
  margin: auto;
}
.confirmOrderPage {
  height: 100vh;
  background-color: white;
  display: grid;
  grid-template-columns: 6fr 3fr;
}

.confirmOrderPage > div:last-child {
  border-left: 1px solid rgba(0, 0, 0, 0.247);
}
.confirmshippingArea {
  padding: 5vmax;
  padding-bottom: 0%;
}

.confirmshippingArea > p {
  font: 400 1.8vmax "Roboto";
}

.confirmshippingAreaBox,
.confirmCartItemsContainer {
  margin: 2vmax;
}
.confirmCartItems > p {
  font: 400 1.8vmax "Roboto";
}

.confirmCartItems {
  padding: 5vmax;
  padding-top: 2vmax;
}

.confirmCartItemsContainer {
  max-height: 20vmax;
  overflow-y: auto;
}

.confirmCartItemsContainer > div {
  display: flex;
  font: 400 1vmax "Roboto";
  align-items: center;
  justify-content: space-between;
  margin: 2vmax 0;
}

.confirmCartItemsContainer > div > img {
  width: 3vmax;
}

.confirmCartItemsContainer > div > a {
  color: #575757;
  margin: 0 2vmax;
  width: 60%;
  text-decoration: none;
}

.confirmCartItemsContainer > div > span {
  font: 100 1vmax "Roboto";
  color: #5e5e5e;
}

.confirmshippingAreaBox > div {
  display: flex;
  margin: 1vmax 0;
}

.confirmshippingAreaBox > div > p {
  font: 400 1vmax "Roboto";
  color: black;
}
.confirmshippingAreaBox > div > span {
  margin: 0 1vmax;
  font: 100 1vmax "Roboto";
  color: #575757;
}
.orderDetailsContainerBox,
.orderDetailsCartItemsContainer {
  margin: 2vmax;
}

.orderDetailsContainerBox > div {
  display: flex;
  margin: 1vmax 0;
}

.orderDetailsContainerBox > div > p {
  font: 400 1vmax "Roboto";
  color: black;
}
.orderDetailsContainerBox > div > span {
  margin: 0 1vmax;
  font: 100 1vmax "Roboto";
  color: #575757;
}
@media screen and (max-width: 600px) {
  .orderDetailsContainer > p {
    font: 400 6vw "Roboto";
  }

  .orderDetailsContainerBox > div {
    margin: 6vw 0;
  }

  .orderDetailsContainerBox > div > p {
    font: 400 4vw "Roboto";
  }
  .orderDetailsContainerBox > div > span {
    font: 100 4vw "Roboto";
  }

  .orderDetailsCartItems > p {
    font: 400 6vw "Roboto";
  }

  .orderDetailsCartItemsContainer > div {
    font: 400 4vw "Roboto";
    margin: 4vw 0;
  }

  .orderDetailsCartItemsContainer > div > img {
    width: 10vw;
  }

  .orderDetailsCartItemsContainer > div > a {
    margin: 2vw;
    width: 30%;
  }

  .orderDetailsCartItemsContainer > div > span {
    font: 100 4vw "Roboto";
  }
}

@media screen and (max-width: 600px) {
  .dashboard {
    grid-template-columns: 1fr;
  }

  .dashboardContainer {
    border-left: none;
  }

  .dashboardSummary > div > p {
    margin: 0;
  }

  .dashboardSummaryBox2 > a {
    padding: 0.5rem;
    margin: 1rem;
    font: 300 0.9rem "Roboto";
  }
}

.newProductContainer {
  width: 100%;
  padding-top: 50px;
  box-sizing: border-box;
  background-color: rgb(221, 221, 221);
  border-left: 1px solid rgba(0, 0, 0, 0.158);
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.newProductContainer h1 {
  color: rgba(0, 0, 0, 0.733);
  font: 300 2rem "Roboto";
  text-align: center;
}

.createProductForm {

  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 3vmax;
  justify-content: space-evenly;
  height: 70%;
  width: 40vh;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.267);
}

.createProductForm > div {
  display: flex;
  width: 100%;
  align-items: center;
}
.createProductForm > div > input,
.createProductForm > div > select,
.createProductForm > div > textarea {
  padding: 1vmax 4vmax;
  padding-right: 1vmax;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.267);
  border-radius: 4px;
  font: 300 0.9vmax cursive;
  outline: none;
}

.createProductForm > div > svg {
  position: absolute;
  transform: translateX(1vmax);
  font-size: 1.6vmax;
  color: rgba(0, 0, 0, 0.623);
}

#createProductFormFile > input {
  display: flex;
  padding: 0%;
}

#createProductFormFile > input::file-selector-button {
  cursor: pointer;
  width: 100%;
  z-index: 2;
  height: 5vh;
  border: none;
  margin: 0%;
  font: 400 0.8vmax cursive;
  transition: all 0.5s;
  padding: 0 1vmax;
  color: rgba(0, 0, 0, 0.623);
  background-color: rgb(255, 255, 255);
}

#createProductFormFile > input::file-selector-button:hover {
  background-color: rgb(235, 235, 235);
}

#createProductFormImage {
  width: 100%;
  overflow: auto;
}

#createProductFormImage > img {
  width: 3vmax;
  margin: 0 0.5vmax;
}
#createProductBtn {
  border: none;
  background-color: tomato;
  color: white;
  font: 300 0.9vmax "Roboto";
  width: 100%;
  padding: 0.8vmax;
  cursor: pointer;
  transition: all 0.5s;
  border-radius: 4px;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.219);
}

#createProductBtn:hover {
  background-color: rgb(179, 66, 46);
}

@media screen and (max-width: 600px) {
  .newProductContainer {
    background-color: rgb(255, 255, 255);
  }
  .createProductForm {
    padding: 5vmax;
  }

  .createProductForm > div > input,
  .createProductForm > div > select,
  .createProductForm > div > textarea {
    padding: 2.5vmax 5vmax;
    font: 300 1.7vmax cursive;
  }

  .createProductForm > div > svg {
    font-size: 2.8vmax;
  }

  #createProductFormFile > img {
    width: 8vmax;
    border-radius: 100%;
  }

  #createProductFormFile > input::file-selector-button {
    height: 7vh;
    font: 400 1.8vmax cursive;
  }

  #createProductBtn {
    font: 300 1.9vmax "Roboto";
    padding: 1.8vmax;
  }
}
.updateOrderForm {
  
  margin: 5vmax 0;
  padding: 3vmax;
  background-color: white;
}

.updateOrderForm > div {
  display: flex;
  width: 100%;
  align-items: center;
}
.updateOrderForm > div > select {
  padding: 1vmax 4vmax;
  margin: 2rem 0;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.267);
  border-radius: 4px;
  font: 300 0.9vmax cursive;
  outline: none;
}

.updateOrderForm > div > svg {
  position: absolute;
  transform: translateX(1vmax);
  font-size: 1.6vmax;
  color: rgba(0, 0, 0, 0.623);
}

@media screen and (max-width: 600px) {
  .updateOrderForm {
    padding: 5vmax;
  }

  .updateOrderForm > div > select {
    padding: 2.5vmax 5vmax;
    font: 300 1.7vmax cursive;
  }

  .updateOrderForm > div > svg {
    font-size: 2.8vmax;
  }
}
.productListContainer {
  padding-top: 50px;
  width: 100%;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  border-left: 1px solid rgba(0, 0, 0, 0.158);
  display: flex;
  flex-direction: column;
  height: 100vh;
}

#productListHeading {
  font: 400 2rem "Roboto";
  padding: 0.5vmax;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.637);
  transition: all 0.5s;
  margin: 2rem;
  text-align: center;
}

.productListTable {
  background-color: white;
  border: none !important;
}
.MuiDataGrid-columnHeader{
  background-color: tomato;
  padding: 1rem;
}
.productListTable div {
  font: 300 1vmax "Roboto";
  color: rgba(0, 0, 0, 0.678);
  border: none !important;
}

.productListTable a,
.productListTable button {
  color: rgba(0, 0, 0, 0.527);
  transition: all 0.5s;
}

.productListTable a:hover {
  color: tomato;
}

.productListTable button:hover {
  color: rgb(236, 30, 30);
}

.MuiDataGrid-columnHeader div {
  color: rgb(255, 255, 255);
}

@media screen and (max-width: 600px) {
  .productListTable div {
    font: 300 4vw "Roboto";
  }
}
.productReviewsContainer {
  padding-top: 50px;
  width: 100%;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  border-left: 1px solid rgba(0, 0, 0, 0.158);
  height: 100vh;
}

.productReviewsForm {
  width: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 3vmax;
  background-color: white;
}

.productReviewsFormHeading {
  margin-top: 40px;
  color: rgba(0, 0, 0, 0.733);
  font: 300 2rem "Roboto";
  text-align: center;
}

.productReviewsForm > div {
  display: flex;
  width: 100%;
  align-items: center;
  margin: 2rem;
}
.productReviewsForm > div > input {
  padding: 1vmax 4vmax;
  padding-right: 1vmax;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.267);
  border-radius: 4px;
  font: 300 0.9vmax cursive;
  outline: none;
}

.productReviewsForm > div > svg {
  position: absolute;
  transform: translateX(1vmax);
  font-size: 1.6vmax;
  color: rgba(0, 0, 0, 0.623);
}

@media screen and (max-width: 600px) {
  .productReviewsContainer {
    border-left: none;
    border-top: 1px solid rgba(0, 0, 0, 0.158);
  }
  .productReviewsForm > div > input {
    padding: 2.5vmax 5vmax;
    font: 300 1.7vmax cursive;
  }

  .productReviewsForm > div > svg {
    font-size: 2.8vmax;
  }
}
.sidebar {
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.sidebar > a:first-child {
  padding: 0;
}
.sidebar > a > img {
  width:50px;
  transition: all 0.5s;
}

.sidebar > a > img:hover {
  filter: drop-shadow(0 0 10px tomato);
}
.sidebar a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.493);
  font: 200 1rem "Roboto";
  padding: 2rem;
  transition: all 0.5s;
}
.sidebar a:hover {
  color: tomato;
  transform: scale(1.1);
}

.sidebar a > P {
  display: flex;
  align-items: center;
}
.sidebar a > p > svg {
  margin-right: 0.5rem;
}

.MuiTypography-root {
  background-color: #fff !important;
}


`;
export default Container;