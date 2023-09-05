import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CartState } from '../context/UserContext';

const SingleProduct = ({ prod }) => {

  const { state: { cart }, dispatch } = CartState();
  console.log(cart);
  return (
    <div className='products'>
      <Card>
        <Card.Img variant='top' src={prod.image} alt={prod.name} />
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>$ {prod.price.split(".")[0]}</span>
          </Card.Subtitle>

          {cart.some(p=>p.id===prod.id) ? (
            <Button variant='danger' onClick={() => {
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: prod,
              })
            }}>Remove form Cart</Button>
          ) :(
            <Button onClick={() => {
              dispatch({
                type: "ADD_TO_CART",
                payload: prod,
              })
            }}>Add to Cart</Button>
          )}
          
          
        </Card.Body>
      </Card>
    </div>
  )
}

export default SingleProduct
