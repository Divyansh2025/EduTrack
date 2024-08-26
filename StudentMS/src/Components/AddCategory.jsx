import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {
    const [category, setCategory] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_category', {category})
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/category')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center mt-5'>
                <div className='col-md-6'>
                    <div className='p-4 rounded border bg-light'>
                        <h1 className='text-primary mb-4'>Add Subject</h1>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor="category" className='form-label'><strong>Subject:</strong></label>
                                <input type="text" name='category' placeholder='Enter Category'
                                    value={category} onChange={(e) => setCategory(e.target.value)} className='form-control'/>
                            </div>
                            <button className='btn btn-primary w-100 rounded-pill'>Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCategory
