import React, { useState, useEffect } from 'react';
import PaymentDetails from '../paymentComponent/paymentDetails';
import './orderListStyle.css'
import { useNavigate } from 'react-router-dom';

const OrderList = ({ orders, handleRemove, restaurants }) => {

    const navigate = useNavigate();
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const subtotal = filteredItems.reduce((sum, item) => sum + (item.price*item.quantity), 0);
    console.log("price",subtotal);

    const handleRestaurantClick = (name) => {
        setSelectedRestaurant(name)
        const filtered = [];

        orders.forEach(order => {
            (order.items || []).forEach(item => {
                console.log("Checking item:", item);
                if (item.restaurantId === name) {
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

    // to select restaurant at first
    useEffect(() => {
        if(restaurants.length > 0 && !selectedRestaurant){
            const firstRestaurant = restaurants[0].name;
            setSelectedRestaurant(firstRestaurant);
            handleRestaurantClick(firstRestaurant);
        }
    }, [restaurants])

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
       
           
                <div className='cart-page'>
                    <div className='cart-heading'>
                        <h2>My Cart</h2>
                        <hr />
                    </div>
                    <div >
                        {restaurants.map(restaurant => (
                            <button
                            className={`rest-btn ${selectedRestaurant === restaurant.name ? 'selected-button' : ''}`}
                                key={restaurant._id}
                                onClick={() => handleRestaurantClick(restaurant.name)} 
                               
                            >
                                {restaurant.name}
                            </button>
                        ))}
                    </div>
                    <div className='division'>
                        <div className='orders'>
                            
                            <div className='cart-orders'>
                                {filteredItems.length > 0 ? (
                                    <>
                                    <div className='order-status'>
                                        <h4>Order Status : <button>PaymentDue</button></h4>
                                    </div>
                                    <ul className="cart-list">
                                    
                                        {filteredItems.map((item, index) => (
                                            
                                                <li key={index} className="cart-item">
                                                    <div className='order-details'>
                                                        <h4 className="item-name">{item.name}</h4>
                                                        <p className="item-price"><b>Price :</b> LKR {item.price}</p>

                                                        <div className="quantity-control">
                                                        <p className="item-price"><b>Quantity :</b>  </p>
                                                            <button onClick={() => handleDecrease(index)} className="quantity-btn">−</button>
                                                            <div className='quantity'>{item.quantity}</div>
                                                            <button onClick={() => handleIncrease(index)} className="quantity-btn">+</button>
                                                        </div>

                                                        <button
                                                            className="remove-btn"
                                                            onClick={() => handleRemove(item.orderId, item.itemId)}
                                                        >
                                                            Remove
                                                        </button>   
                                                    </div>
                                                    <div className='order-image'>
                                                    {item.orderImage && (
                                                        <img src={item.orderImage} alt={item.name} className="item-image" />
                                                    )}   
                                                    </div>                                 
                                                    
                                                </li>
                                            
                                        ))}
                                        
                                    </ul>
                                    </>
                                ) : (
                                    <div className="empty-cart-container">
                                        <p className="empty-cart-msg">No any orders are added to cart. <br /> Please navigate to the Homepage using below button to add orders to cart</p>
                                        <button className="go-home-btn" onClick={() => navigate('/')}>
                                            Go to Homepage
                                        </button>
                                    </div>

                                )}
                            </div>
                        </div>
                        <div className='payment-page'>
                            <PaymentDetails subtotal={subtotal} />
                        </div>
                    </div>
                    
                </div>
           
       
    );
};

export default OrderList;
