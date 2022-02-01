import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../../store/actions/product';
import ProductCard from '../ProductCard';
import { useParams } from 'react-router';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@material-ui/core';
import Loader from '../../common/Loader';

const Home = ({ location }) => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const [currentPage, setPage] = useState(1);
  const [price, setPrice] = React.useState([0, 10000]);
  const [category, setCategory] = React.useState("");

  const handleSlider = (event, newValue) => {
    setPrice(newValue);
  };

  const handlePage = (val) => {
    setPage(val.target.innerText)
  }
  const handleCategory = (e) => {
    let val = category===e.target.value ?false: e.target.value;
    setCategory(val)
  }
  useEffect(() => {
    dispatch(getAllProduct(keyword, currentPage,price,category))
  }, [dispatch, keyword, currentPage, price,category])

  const { products, error, loading, perPageCount, productsCount } = useSelector(state => state.products);
  return <>
    {loading ? <Loader/> :
      <>
        <FeaturedContainer>
          <Grid container>
            <Grid item xs={12} sm={4} md={2}>
              <h3 > Filter</h3>
              <FilterContainer>
                <Typography variant="subtitle">Price</Typography>
                <Slider
                  value={price}
                  onChange={handleSlider}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={10000}
                />
                <FormControl component="fieldset">
                  <FormLabel component="legend">Categories</FormLabel>
                  <RadioGroup
                    aria-label="Category"
                    name="radio-buttons-group"
                    value={category}
                    onChange={handleCategory} 
                  >
                    <FormControlLabel value="laptops" control={<Radio />} label="Laptops" />
                    <FormControlLabel value="bags" control={<Radio />} label="Bags" />
                    <FormControlLabel value="mobiles" control={<Radio />} label="Mobiles" />
                    <FormControlLabel value="watches" control={<Radio />} label="Watches" />
                  </RadioGroup>
                </FormControl>
              </FilterContainer>
            </Grid>
            <Grid item  xs={12} sm={8} md={10}>
            <h1 > Products</h1>

              <ProductsContainer >
                {products?.map(product => (
                  <ProductCard product={product} />
                ))}
              </ProductsContainer>
            </Grid>
          </Grid>
          <PaginationContainer>
            <Pagination count={Math.round(Number(productsCount / (perPageCount)))} defaultPage={1} page={Number(currentPage)} onChange={handlePage} color="secondary" />
          </PaginationContainer>
        </FeaturedContainer>
      </>}
  </>
}
export default Home;
const PaginationContainer = styled.div`
display: flex;
  nav {
    margin: 10px auto;
  }
`;
const FilterContainer = styled.div`
display: flex;
flex-direction: column;
min-width: 20vmax;
align-items: flex-start;
ul>li {
  list-style: none;
  color: rgba(0, 0, 0, 0.61);
  margin-left: -30px;
  cursor: pointer;
  transition: all 0.5s;
}
ul > li:hover {
  color: tomato;
}
`;
const FeaturedContainer = styled.section`
  padding:  2vmax;
  text-align: center;
  #features-title {
    font-size: 1.4vmax;
    border-bottom: 1px solid rgba(21, 21, 21, 0.5);
    width: 20vmax;
    padding: 2vmax 0;
    text-align: center;
    margin: auto;
  }
} 
`;

const ProductsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap:wrap;
  h1{
    margin-top: 50px;
  }
`;