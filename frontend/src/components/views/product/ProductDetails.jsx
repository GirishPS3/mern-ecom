import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { clearErrors, getProductDetails, newReview } from '../../../store/actions/product';
import Carousel from "react-material-ui-carousel";
import styled from 'styled-components';
import { Button, Grid, Paper } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { addItemsToCart } from '../../../store/actions/cart';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import Loader from '../../../components/common/Loader';
import avatar from '../../../images/avatar3.png'
import { useSnackbar } from 'notistack';
import { NEW_REVIEW_RESET } from '../../../store/constants/product';

export default function ProductDetails({match }) {
  const { product, error, loading } = useSelector(state => state.productDetails);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [qty, setqty] = useState(1)
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comments, setComment] = useState("");
  const dispatch = useDispatch();

  let { id } = useParams();
  const reduceQty = () => {
    qty > 0 && setqty(qty - 1);
  }
  const increaseQty = () => {

    qty <= product.stock && setqty(qty + 1);
  }
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    dispatch(newReview({rating, comments}, id));

    setOpen(false);
  };
  const handleAddtoCart = () => {
    dispatch(addItemsToCart(id, qty));
    enqueueSnackbar("Item Added To Cart", {variant: 'success'});

  }
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {variant: 'error'});
      dispatch(clearErrors());
    }

    if (reviewError) {
      enqueueSnackbar(reviewError, {variant: 'error'});
      dispatch(clearErrors());
    }
    if(success){
      enqueueSnackbar('Review Submitted', {variant: 'success'});
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, match.params.id, error, success])
  const stock = 0;
  return (
    <div>
      {loading ? <Loader/> : product &&
        <Grid container alignItems="center" justifyContent="center">
          <CarouselConatiner item xs={12} sm={6} md={7}>
            <Carousel >
              <CarouselImage src={"https://5.imimg.com/data5/KC/PC/MY-38629861/dummy-chronograph-watch-500x500.jpg"} alt="" />
              <CarouselImage src={"https://5.imimg.com/data5/KC/PC/MY-38629861/dummy-chronograph-watch-500x500.jpg"} alt="" />
              <CarouselImage src={"https://5.imimg.com/data5/KC/PC/MY-38629861/dummy-chronograph-watch-500x500.jpg"} alt="" />
            </Carousel>
          </CarouselConatiner>
          <Grid item xs={12} sm={6} md={5}>
            <DetailsContainer>
              <h1> <font color="grey">{product.name}</font></h1>
              <h2>{`₹ ${product.price}`}</h2>
              {product.stock > 0 ? <StockInfo isgreen>InStock</StockInfo> :
                <StockInfo>OutofStock</StockInfo>}
              <p>Description: {product.description} </p>
              <ReviewText> <Rating value={product.rating} precision={0.5} />{product.noOfReviews} reviews</ReviewText>

              <CartOptions>
                <button id="btn" onClick={reduceQty}>-</button>
                <input readOnly type="number" value={qty} />
                <button onClick={increaseQty}>+</button>
              </CartOptions>
              <CartActions>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={product.stock < 1}
                  onClick={handleAddtoCart}
                >
                  Add to Cart
              </Button>
                <Button variant="outlined" size="small" color="primary" onClick={submitReviewToggle}>Submit Review</Button>
              </CartActions>
            </DetailsContainer>
          </Grid>
          <h2>Reviews</h2>
          <ReviewsContainer item xs={12} id='reviews'>
            {product?.reviews?.length > 0 ? product.reviews.map(review => (<ReviewCard>
              <Rating value={review.rating} />
              <p>{review.comments}</p>
              <strong><img src={avatar} alt="profile"/>{review.name}</strong>
            </ReviewCard>)) : <p>No Reviews Yet</p>}
          </ReviewsContainer>
        </Grid>
      }
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <StyledDialogContent className="submitDialog">
          <Rating
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            size="large"
          />

          <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comments}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </StyledDialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
              </Button>
          <Button onClick={reviewSubmitHandler} color="primary">
            Submit
              </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const CarouselImage = styled.img`
  width: 20vmax;
  min-height: 100%;
`;
const StockInfo = styled.span`
  background-color: ${props => props.isgreen ? "green" : "tomato"};
  font-size: 14px;
  padding: 5px;
  border-radius: 3px;
  color: #ffff;
`;
const ReviewsContainer = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  max-width: 100%;
  justify-content: flex-start;
  p{
    text-align: center;
    width: 100%
  }
`;
const ReviewCard = styled(Paper)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2vmax;
  min-width: 30vmax;
  img {
    border-radius: 50%;
    width: 50px;
  }
  strong {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ReviewText = styled.p`
  display: flex;
  align-items: center;
`;

const DetailsContainer = styled.div`
  padding: 4vmax;
`;
const CarouselConatiner = styled(Grid)`
&.MuiGrid-root{
  text-align: center;
}
`;
const CartActions = styled.section`
  margin: 10px 10px 0 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 200px;
  .MuiButton-containedSizeSmall {
    margin: 10px 0;
  }
`;

const CartOptions = styled.div`
  input {
    border: none;
    padding: 1vmax;
    width: 1.5vmax;
    text-align: center;
    outline: none;
    font: 400 0.8vmax "Roboto";
    color: rgba(0, 0, 0, 0.74);

  }
  button{
    border: none;
    background-color: rgba(0, 0, 0, 0.616);
    padding: 1vmax;
    cursor: pointer;
    color: white;
    transition: all 0.5s;
  }
`;
const StyledDialogContent= styled(DialogContent)`
&.MuiDialogContent-root{
  disply: flex;
  flex-direction: column;
  &.MuiRating-sizeLarge{
    disply: flex;

  }
}
`;