import React from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext)
    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list.map((food, index) => {
                    if (category === 'All' || category === food.category) {
                        return <FoodItem key={food._id} id={food._id} food={food} />
                    }
                })}
            </div>
        </div>
    )
}

export default FoodDisplay
