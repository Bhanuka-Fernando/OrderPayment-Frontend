import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderList from "./orderList";



const Cart = () => {

    const [orders,setOrders] = useState([]);
    const [restaurants,setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/orders/customer/cus001')
        .then(response => {
            setOrders(response.data)
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching cart data : ',error);
            setError(error.message);
            setLoading(false);
        });
    }, []);


    useEffect(() => {
        axios.get('/api/restaurants')
        .then(response => {
            setRestaurants(response.data)
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching restaurants data : ',error);
            setError(error.message);
            setLoading(false);
        });
    }, []);

    const handleRemove = async(orderId) => {
        try{
            await axios.delete(`/api/orders/${orderId}`);
            setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));

        }catch(error){
            console.error('Error removing item:', error);
            alert('Failed to remove item');
        }
    }

    if(loading){
        return <div>Loading cart .. </div>
    }

    if (error){
        return <div>Error : {error}</div>
    }


    return (
        <div>

            <h1>Order Status : </h1>
            <OrderList orders={orders} handleRemove={handleRemove} restaurants={restaurants}/>
        </div>
    )
}

export default Cart;