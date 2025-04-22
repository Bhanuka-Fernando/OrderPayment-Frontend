// src/components/PaymentDetails.js
import React, { useState } from 'react';
import { FaLock, FaCreditCard } from "react-icons/fa";
import { IoCardOutline } from "react-icons/io5";
import { BsCash } from "react-icons/bs";
import './paymentDetails.css';

const PaymentDetails = ({ subtotal = 0, deliveryFee = 300, handlingFee = 150, onCheckout }) => {
    const [paymentMethod, setPaymentMethod] = useState('cash');

    const total = subtotal + deliveryFee + handlingFee;

    const handleCheckout = async() => {

        if (paymentMethod === 'cash'){
            alert('order placed successfully');
            return;
        }
        
        try{
            const response = await fetch('http://localhost:8080/product/v1/checkout', {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    amount: total, 
                    quantity: 1,
                    currency: 'LKR',
                    name: 'books',
                }),
            });

            const data = await response.json();
            if(data && data.status === 'SUCCESS'){
                window.location.href = data.sessionUrl;
            }else{
                alert('Failed to do the payment session')
            }

        }catch(error){
            console.error('checkout error', error);
            alert('An error occurred during checkout.');
        }
    };

    return (
        <div className="payment-container">
            <h1 className='payment-secure'>Secure</h1>
            <h2 className="payment-title">Payment Details</h2>

            <div className="payment-section">
                <div className="payment-row">
                    <span>Subtotal (LKR)</span>
                    <span>{subtotal.toFixed(2)}</span>
                </div>
                <div className="payment-row">
                    <span>Delivery Fee (LKR)</span>
                    <span>{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="payment-row">
                    <span>Handling Fee (LKR)</span>
                    <span>{handlingFee.toFixed(2)}</span>
                </div>
                <hr className="payment-divider" />
                <div className="payment-row total-row">
                    <strong>Total (LKR)</strong>
                    <strong> {total.toFixed(2)}</strong>
                </div>
            </div>

            <div className="payment-method-section">
                <p className="payment-method-title">Choose Payment Method</p>

                <label className="radio-label">
                    <input
                        type="radio"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <BsCash />
                    <span>Pay by Cash</span>
                </label>

                <label className="radio-label">
                    <input
                        type="radio"
                        value="visa"
                        checked={paymentMethod === 'visa'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <IoCardOutline />
                    <span>Pay with Visa</span>
                </label>

                <label className="radio-label">
                    <input
                        type="radio"
                        value="mastercard"
                        checked={paymentMethod === 'mastercard'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <FaCreditCard />
                    <span>Pay with MasterCard</span>
                </label>

                <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
            </div>
  
            <h6 className='payment-rule'>
                By placing an order, you are agreeing to our 
                <span className='highlight-link'> privacy policy</span> and <span className='highlight-link'><br />terms of use</span>
            </h6>

        </div>
    );
};

export default PaymentDetails;
