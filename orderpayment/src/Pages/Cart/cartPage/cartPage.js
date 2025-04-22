import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderList from "../orderListPage/orderList";


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

    const handleRemove = async (orderId, itemId) => {
        try {
            await axios.delete(`/api/orders/${orderId}/items/${itemId}`);

            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId
                        ? {
                              ...order,
                              items: order.items.filter(item => item.itemId !== itemId)
                          }
                        : order
                ).filter(order => order.items.length > 0) 
            );
        } catch (error) {
            console.error('Error removing item:', error);
            alert('Failed to remove item');
        }
    };
    

    


    return (
        <div>

            
            <OrderList orders={orders} handleRemove={handleRemove} restaurants={restaurants}/>
            
        </div>
    )
}

export default Cart;