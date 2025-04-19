import React, { useState } from 'react';
import PaymentDetails from './paymentDetails';

const OrderList = ({ orders, handleRemove, restaurants }) => {
    const [filteredItems, setFilteredItems] = useState([]);

    const subtotal = filteredItems.reduce((sum, item) => sum + (item.price*item.quantity), 0);

    const handleRestaurantClick = (restaurantName) => {
        const filtered = [];

        orders.forEach(order => {
            (order.items || []).forEach(item => {
                console.log("Checking item:", item);
                if (item.restaurantId === restaurantName) {
                    filtered.push({
                        ...item,
                        orderId: order.id,
                        quantity:item.quantity || 1
                    });
                }
            });
        });

        setFilteredItems(filtered);
    };

    const handleIncrease = (index) => {
        const updatedItems = [...filteredItems];
        updatedItems[index].quantity += 1;
        setFilteredItems(updatedItems);
    };

    const handleDecrease = (index) => {
        const updatedItems = [...filteredItems];
        if(updatedItems[index].quantity > 1){
            updatedItems[index].quantity -= 1;
            setFilteredItems(updatedItems);
        }
    };

    return (
        <div>
           
                <div>
                    <h2>Filter by Restaurant:</h2>
                    <div >
                        {restaurants.map(restaurant => (
                            <button
                                key={restaurant._id}
                                onClick={() => handleRestaurantClick(restaurant.restaurantName)} 
                            >
                                {restaurant.restaurantName}
                            </button>
                        ))}
                    </div>
                    <div>
                    <h4>Order Status: </h4>
                    </div>
                    <div>
                        {filteredItems.length > 0 ? (
                            <>
                            <ul>
                                {filteredItems.map((item, index) => (
                                    <li key={index} style={{ marginBottom: '1rem' }}>
                                        
                                        Item Name : {item.name} <br />

                                        <button onClick={() => handleDecrease(index)}>-</button>
                                        <span style={{ margin: '0 10px' }}>
                                        Quantity : {item.quantity} </span> 
                                        <button onClick={() => handleIncrease(index)}>+</button>
                                      
                                        <br />Price : ${item.price}
                                        <br />
                                        <button
                                            onClick={() => handleRemove(item.orderId, item.itemId)}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <PaymentDetails subtotal={subtotal} />
                            </>
                        ) : (
                            <p>Select a restaurant to view its items</p>
                        )}
                    </div>
                </div>
           
        </div>
    );
};

export default OrderList;
