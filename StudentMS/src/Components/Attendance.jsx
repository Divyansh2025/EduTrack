import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Attendance = () => {
    const { category_id } = useParams();
    const [selectedDate, setSelectedDate] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:3000/auth/category")
            .then((result) => {
                if (result.data.Status) {
                    setCategories(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleMarkAttendance = () => {
        if (selectedDate && selectedCategory) {
            navigate(`/dashboard/mark_attendance/${selectedDate}/${selectedCategory}`);
        } else {
            alert("Please select both date and category.");
        }
    };

    return (
        <div className="container">
            <h1 className="mt-5 mb-4 text-center">Mark Attendance</h1>
            <div className="row justify-content-center mb-3">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Select Date:</label>
                        <input type="date" className="form-control" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Select Subject:</label>
                        <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value="">Select Subject</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <button className="btn btn-primary btn-lg" onClick={handleMarkAttendance}>Mark Attendance</button>
            </div>
        </div>
    );
};

export default Attendance;
