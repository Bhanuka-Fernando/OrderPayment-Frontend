import React, { useState } from 'react';

const OrderList = ({ orders, handleRemove, restaurants }) => {
    const [filteredItems, setFilteredItems] = useState([]);

    const totalItems = orders.reduce(
        (total, order) => total + (order.items ? order.items.length : 0),
        0
    );

    const handleRestaurantClick = (restaurantName) => {
   

        const filtered = [];

        orders.forEach(order => {
            (order.items || []).forEach(item => {
                console.log("Checking item:", item);
                // Now compare restaurantId from order's item with restaurantName from restaurant model
                if (item.restaurantId === restaurantName) {
                    filtered.push({
                        ...item,
                        orderId: order.id
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
                    <h2>Filter by Restaurant:</h2>
                    <div style={{ marginBottom: '1rem' }}>
                        {restaurants.map(restaurant => (
                            <button
                                key={restaurant._id}
                                onClick={() => handleRestaurantClick(restaurant.restaurantName)} // Pass restaurantName
                                style={{
                                    marginRight: '10px',
                                    padding: '8px 12px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                {restaurant.restaurantName}
                            </button>
                        ))}
                    </div>

                    <div>
                        {filteredItems.length > 0 ? (
                            <ul>
                                {filteredItems.map((item, index) => (
                                    <li key={index} style={{ marginBottom: '1rem' }}>
                                        <h4>Order Status: {item.status}</h4>
                                        {item.name} - Quantity: {item.quantity} - Price: ${item.price}
                                        <br />
                                        <button
                                            onClick={() => handleRemove(item.orderId, item.itemId)}
                                            style={{
                                                marginTop: '5px',
                                                backgroundColor: 'red',
                                                color: 'white',
                                                border: 'none',
                                                padding: '5px 10px',
                                                borderRadius: '4px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Select a restaurant to view its items</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderList;
