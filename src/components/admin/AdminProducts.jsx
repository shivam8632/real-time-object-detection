import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { API } from '../../API';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export default function AdminProducts() {
    const [products, setGetProducts] = useState([]);
    useEffect(() => {
        axios.get(API.BASE_URL + 'auth/productlist/',{})
        .then(
          function(response) {
            console.log("Get Products",response);
            setGetProducts(response.data);
        }
        )
        .catch(function(error) {
          console.log(error.response);
        })
    }, [])

  return (
    <Container>
        <h1 className="title text-center my-3">Added Products</h1>
        <div className="product-container">
            {
                products.map((prod) => {
                    return(
                        <div className='products'>
                            <Card key={prod.id}>
                                <Card.Img variant='top' src={prod.url} alt={prod.title} />
                                <Card.Body>
                                    <Card.Title>{prod.title}</Card.Title>
                                    <Card.Subtitle style={{ paddingBottom: 10 }}>
                                        <span>$ {prod.price}</span>
                                    </Card.Subtitle>
                                
                                </Card.Body>
                            </Card>
                        </div>
                    )
                })
            }
        </div>
    </Container>
  )
}
