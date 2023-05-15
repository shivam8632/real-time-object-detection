import React, { createContext, useContext, useReducer } from "react";

import LogImage from '../../assets/img/login.png'
import { cartReducer } from "./reducers";

const Cart = createContext();

export const Context = ({children})=>{
    const [captureImg, setCaptureImg] = React.useState();

    const products = [
        {
            id: 1,
            name: "Product 1",
            price: "300",
            image: LogImage,
        },

        {
            id: 2,
            name: "Product 2",
            price: "300",
            image: LogImage,
        },

        {
            id: 3,
            name: "Product 3",
            price: "300",
            image: LogImage,
        },

        {
            id: 4,
            name: "Product 4",
            price: "300",
            image: LogImage,
        },

        {
            id: 5,
            name: "Product 5",
            price: "300",
            image: LogImage,
        },

        {
            id: 6,
            name: "Product 6",
            price: "300",
            image: LogImage,
        },

        {
            id: 7,
            name: "Product 7",
            price: "300",
            image: LogImage,
        },

        {
            id: 8,
            name: "Product 8",
            price: "300",
            image: LogImage,
        },
    ]

    const [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart: []
    })

    console.log(products);

    return (
        <Cart.Provider value={{ state, dispatch, captureImg, setCaptureImg }}>{children}</Cart.Provider>
    )
}

export default Cart;

export const CartState = () => {
    return useContext(Cart)
}