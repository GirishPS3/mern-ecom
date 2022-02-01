import React,{useEffect} from 'react'
import styled from 'styled-components';
import banner from '../../images/banner.jpg'
import ProductCard from './ProductCard';
import { useDispatch, useSelector} from 'react-redux';
import { getAllProduct } from '../../store/actions/product';
import Loader from '../common/Loader';
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProduct())
  }, [dispatch])
  
  const {products, error, loading} = useSelector(state => state.products);
  return <>
  {loading ? <Loader/>:
  <>
    <Banner>
      <p>Welcom to React website</p>
      <h3>Find All Products here</h3>
      <a href="#features-title">
      <button>Featured Products</button>
      </a>
    </Banner>
    <FeaturedContainer>
      <h2 id='features-title'>Feature Products</h2>
      <ProductsContainer >
        {products?.map(product=>(
          <ProductCard product={product}/>
        ))}
      </ProductsContainer>
    </FeaturedContainer>
    </>}
  </>
}
export default Home;
const FeaturedContainer = styled.section`
  padding:  1vmax;
  text-align: center;
  #features-title {
    font-size: 1.4vmax;
    border-bottom: 1px solid rgba(21, 21, 21, 0.5);
    width: 20vmax;
    padding: 1vmax;
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
`;
const Banner = styled.div`
background-position: center;
background-repeat: no-repeat;
background-size: cover;
height: 100vmin;
display: flex;
flex-direction: column;
text-align: center;
align-items: center;
justify-content: center;
color: white;
background-image: url(${banner});
h3{
  font: 600 2.5vmax;
}
p{
  font: 300 1.4vmax;
}
button{
  margin-bottom: 5vmax;
  cursor: pointer;
  border: 1px solid white;
  padding: 1vmax;
  transition: all 0.5s;
  font: 500 1vmax "Roboto";
  background-color: #ffff;
  color: #000310;
  border-radius: 3px;
  &:hover {
    background-color:  #E86C4A;
    color:  #ffff;
    transform: scale(1.1)
  }
}

&:after {
  content: "";
  width: 100%;
  height: 100vmin;
  position: absolute;
  top: 0;
  bottom: 0;
  left:0;
  background-color: #ffff;
  clip-path: polygon(100% 68%, 0 100%, 100% 100%);
}
`;