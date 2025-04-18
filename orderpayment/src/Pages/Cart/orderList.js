// src/components/OrderList.js
import React, { useState } from 'react';

const OrderList = ({ orders, handleRemove, restaurants }) => {
    const [filteredItems, setFilteredItems] = useState([]);

    const totalItems = orders.reduce(
        (total, order) => total + (order.items ? order.items.length : 0),
        0
    );

    const handleRestaurantClick = (restaurantId) => {
        const restaurant = restaurants.find(r => r.restaurantId === restaurantId);
        const restaurantName = restaurant ? restaurant.restaurantName : "Unknown";
    
        const filtered = [];
    
        orders.forEach(order => {
            (order.items || []).forEach(item => {
                if (item.restaurantId === restaurantName) {
                    filtered.push({
                        ...item,
                        orderId: order.id // ⚠️ Attach orderId for later use
                    });
                }
            });
        });
    
        setFilteredItems(filtered);
    };
    

    return (
        <div>
            {totalItems === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    <div>
                        {restaurants.map(restaurant => (
                            <div key={restaurant.restaurantId}>
                                <button onClick={() => handleRestaurantClick(restaurant.restaurantId)}>
                                    {restaurant.restaurantName}
                                    
                                </button>
                            </div>
                        ))}
                    </div>

                    <div>
                        {filteredItems.length > 0 ? (
                            
                            <ul>
                                {filteredItems.map((item, index) => (
                                    <li key={index}>
                                        <h1>Order Status : {item.status}</h1>
                                        {item.name} - Quantity: {item.quantity} - Price: ${item.price} 
                                        <button onClick={() => handleRemove(item.orderId, item.itemId)}>Remove</button>

                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p></p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderList;
