import { useState } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

const Orders = ({ url }) => {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        const res = await axios.get(url + '/api/order/list');
        if (res.data.success) {
            setOrders(res.data.data);
            console.log(res.data.data);
        } else {
            toast.error(res.data.message);
        }
    }

    const statusHandler = async (e, orderId) => {
        e.preventDefault();

        const res = await axios.post(url + '/api/order/status', {
            orderId,
            status: e.target.value
        });
        if (res.data.success) {
            await fetchAllOrders();
            toast.success(res.data.message);
        } else {
            toast.error(res.data.message);
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, [])

    return (
        <div className='order add'>
            <h3>Orders</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className="order-item">
                        <img src={assets.parcel_icon} />
                        <div>
                            <p className='order-item-food'>
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + 'x ' + item.quantity
                                    } else {
                                        return item.name + 'x' + item.quantity + ', '
                                    }
                                })}
                            </p>
                            <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
                            <div className="order-item-address">
                                <p>{order.address.street + ','}</p>
                                <p>{order.address.city + ',' + order.address.state + ',' + order.address.country + ',' + order.address.zipcode}</p>
                            </div>
                            <p className='order-item-phone'>{order.address.phone}</p>
                        </div>
                        <p>Items : {order.items.length}</p>
                        <p>${order.amount}</p>
                        <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
                            <option value="Food Processing">Food Processing</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders
