import { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        const res = await axios.get(`${url}/api/food/list`);
        if (res.data.success) {
            setList(res.data.data);
        } else {
            toast.error('Error');
        }
    }

    const removeFood = async (foodId) => {
        const res = await axios.post(`${url}/api/food/remove`, { id: foodId });
        await fetchList();
        if (res.data.success) {
            toast.success(res.data.message);
        } else {
            toast.error('Error');
        }
    }
    useEffect(() => {
        fetchList();
    }, [])

    return (
        <div className='list add flex-col'>
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => (
                    <div className="list-table-format" key={item._id || index}>
                        <img src={`${url}/images/` + item.image} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{item.price}</p>
                        <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default List
