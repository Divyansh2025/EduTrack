import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MarkAttendance = () => {
    const { date, category_id } = useParams();
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/auth/students/${category_id}`)
            .then(result => {
                if (result.data.Status) {
                    const initialAttendance = result.data.Result.map(student => ({
                        id: student.id,
                        name: student.name,
                        present: false
                    }));
                    setStudents(result.data.Result);
                    setAttendance(initialAttendance);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.error('Error fetching students:', err));
    }, [category_id]);

    const handleCheckboxChange = (studentId) => {
        const updatedAttendance = attendance.map(item =>
            item.id === studentId ? { ...item, present: !item.present } : item
        );
        setAttendance(updatedAttendance);
    };

    const handleMarkAttendance = () => {
        const data = {
            date,
            category_id,
            attendance
        };
        axios
            .post('http://localhost:3000/auth/mark_attendance', data)
            .then(result => {
                if (result.data.Status) {
                    alert("Attendance marked successfully!");
                } else {
                    alert("Failed to mark attendance");
                }
            })
            .catch(err => console.error('Error marking attendance:', err));
    };

    return (
        <div className="container">
            <h1 className="mt-5 mb-4 text-center">Mark Attendance for {date}</h1>
            <div className="row justify-content-center mb-3">
                <div className="col-md-6">
                    <h2 className="mb-3">Students:</h2>
                    {students.map(student => (
                        <div key={student.id} className="form-check mb-2">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={attendance.find(item => item.id === student.id).present}
                                onChange={() => handleCheckboxChange(student.id)}
                            />
                            <label className="form-check-label">{student.name}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-center">
                <button className="btn btn-primary btn-lg" onClick={handleMarkAttendance}>Submit Attendance</button>
            </div>
        </div>
    );
};

export default MarkAttendance;
