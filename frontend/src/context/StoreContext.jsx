import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({})
    const [token, setToken] = useState('')
    const url = 'http://localhost:5000/'
    const [food_list, setFoodList] = useState([])

    const addItemToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + 'api/cart/add', { itemId }, {
                headers: { token }
            })
        }
    }

    const removeItemFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + 'api/cart/remove', { itemId }, {
                headers: { token }
            })
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                let itemInfo = food_list.find((product) => product._id === itemId);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[itemId];
                }
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const res = await axios.get(url + 'api/food/all')
        setFoodList(res.data.data)
    }

    const loadCartData = async (token) => {
        const res = await axios.post(url + 'api/cart/get', {}, {
            headers: { token }
        })

        setCartItems(res.data.cartData || {});
    }

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('token');
        if (tokenFromStorage) {
            setToken(tokenFromStorage);
            loadCartData(tokenFromStorage);
        }
        fetchFoodList();
    }, []);


    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addItemToCart,
        removeItemFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider