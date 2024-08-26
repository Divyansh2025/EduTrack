import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Category = () => {

    const [category, setCategory] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:3000/auth/category')
        .then(result => {
            if(result.data.Status) {
                setCategory(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }, [])

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center mt-5'>
                <div className='col-md-8'>
                    <div className='d-flex justify-content-between align-items-center mb-4'>
                        <h1 className='text-primary'>Subject List</h1> {/* Changed text color to primary */}
                        <Link to="/dashboard/add_category" className='btn btn-primary'>Add Subject</Link> {/* Changed button color to primary */}
                    </div>
                    <div className='table-responsive'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {category.map(c => (
                                    <tr key={c.id}>
                                        <td>{c.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category
