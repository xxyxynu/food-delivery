import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ food, id }) => {
    const { name, price, description, image } = food
    const { cartItems, addItemToCart, removeItemFromCart, url } = useContext(StoreContext)

    return (
        <div className='food-item'>
            <div className="food-item-image-container">
                <img className="food-item-image" src={url + 'images/' + image} alt={name} />
                {!cartItems?.[id]
                    ? <img className='add' onClick={() => addItemToCart(id)} src={assets.add_icon_white} alt='' />
                    : <div className='food-item-counter'>
                        <img onClick={() => removeItemFromCart(id)} src={assets.remove_icon_red} alt='' />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addItemToCart(id)} src={assets.add_icon_green} alt='' />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt='' />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    )
}

export default FoodItem
