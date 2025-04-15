// src/components/OrderList.js
import React from 'react';


const OrderList = ({ orders, handleRemove, restaurants }) => {
    const totalItems = orders.reduce(
        (total, order) => total + (order.items ? order.items.length : 0),
        0
    );
    

    return (
        <div>
            {totalItems === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                
                <div>
                    <div>
                    {restaurants.map(restaurant => (
                        <div key={restaurant.restaurantId}>
                            <ul>
                            <h3>{restaurant.restaurantName}</h3>
                            </ul>
                        </div>
                    ))}
                    </div>
                    <div>
                    {orders.map(order => (
                        <div key={order.id}>
                            <ul>
                                {order.items && order.items.map(item => (
                                    <li key={item.itemId}>
                                        {item.name} - Quantity: {item.quantity} - Price: ${item.price} -
                                         <button onClick={() => handleRemove(order.id)}>Remove</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    </div>
                    
                </div>
            )}
        </div>
    );
};

export default OrderList;