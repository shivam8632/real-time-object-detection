import React from 'react';
import SingleProduct from '../products/SingleProduct';
import { Container } from 'react-bootstrap';

import { CartState } from '../context/UserContext';

export default function Products() {
    const { state: { products } } = CartState();
  return (
    <Container>
        <div className="product-container">
        <h2 className="smart">Smart Billing</h2>
        {
          products.map((prod) => {
            return (
              <SingleProduct prod={prod} key={prod.id} />
            )
          })
        }
      </div>
    </Container>
  )
}
