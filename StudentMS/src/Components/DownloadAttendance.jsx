import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DownloadAttendance = () => {
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories when the component mounts
        axios.get('http://localhost:3000/auth/category')
            .then(response => {
                setCategories(response.data.Result);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleDownload = () => {
        setLoading(true);
        if (date && category) {
            axios.get(`http://localhost:3000/auth/attendance/${date}/${category}`)
                .then(response => {
                    if (response.data.Status) {
                        const attendanceData = response.data.Result;
                        setAttendanceData(attendanceData);
                        setLoading(false);
                        downloadAttendanceFile(attendanceData);
                    } else {
                        console.error('Error fetching attendance:', response.data.Error);
                        setLoading(false);
                    }
                })
                .catch(error => {
                    console.error('Error fetching attendance:', error);
                    setLoading(false);
                });
        } else {
            console.error('Please select both date and category.');
            setLoading(false);
        }
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const downloadAttendanceFile = (attendanceData) => {
        if (attendanceData.length === 0) {
            console.error('No attendance data available for the selected date and category.');
            return;
        }
        const filename = `attendance_${date}_${category}.csv`;
        const csv = attendanceData.map(student => `${student.student_name},${student.present ? 'Present' : 'Absent'}`).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    };

    return (
        <div className="container">
            <h1 className="mt-5 mb-4 text-center">Download Attendance</h1>
            <div className="row mb-3">
                <div className="col-sm-6">
                    <label className="form-label">Select Date:</label>
                    <input type="date" className="form-control" value={date} onChange={handleDateChange} />
                </div>
                <div className="col-sm-6">
                    <label className="form-label">Select Subject:</label>
                    <select className="form-select" value={category} onChange={handleCategoryChange}>
                        <option value="">Select Subject</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button className="btn btn-primary btn-lg" onClick={handleDownload} disabled={loading}>
                {loading ? 'Downloading...' : 'Download Attendance'}
            </button>

            {loading && <p className="text-center">Loading...</p>}

            {attendanceData.length > 0 && (
                <div>
                    <h2 className="mt-5 mb-3">Attendance Data</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Attendance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.student_name}</td>
                                    <td>{student.present ? 'Present' : 'Absent'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DownloadAttendance;
