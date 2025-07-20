import './PlaceOrder.css'
import { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
    const navigate = useNavigate();
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChanngeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({
            ...data,
            [name]: value
        }))
    }

    const placeOrder = async (e) => {
        e.preventDefault();

        const orderItems = [];

        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo['quantity'] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
        }

        let res = await axios.post(url + 'api/order/place', orderData, {
            headers: { token }
        });

        if (res.data.success) {
            const { session_url } = res.data;
            window.location.replace(session_url);
        } else {
            alert('Error');
        }
    }

    useEffect(() => {
        if (!token) {
            navigate('/cart');
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>

                <div className="multi-fields">
                    <input name='firstName' onChange={onChanngeHandler} value={data.firstName} type="text" placeholder="First Name" required />
                    <input name='lastName' onChange={onChanngeHandler} value={data.lastName} type="text" placeholder="Last Name" required />
                </div>

                <input name='email' onChange={onChanngeHandler} value={data.email} type="text" placeholder="Email Address" required />
                <input name='street' onChange={onChanngeHandler} value={data.street} type="text" placeholder="Street" required />

                <div className="multi-fields">
                    <input name='city' onChange={onChanngeHandler} value={data.city} type="text" placeholder="City" required />
                    <input name='state' onChange={onChanngeHandler} value={data.state} type="text" placeholder="State" required />
                </div>

                <div className="multi-fields">
                    <input name='zipcode' onChange={onChanngeHandler} value={data.zipcode} type="text" placeholder="Zip code" required />
                    <input name='country' onChange={onChanngeHandler} value={data.country} type="text" placeholder="Country" required />
                </div>

                <input name='phone' onChange={onChanngeHandler} value={data.phone} type="text" placeholder="Phone" required />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form >
    )
}

export default PlaceOrder
