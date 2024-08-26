import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployees(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/auth/delete_employee/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setEmployees(employees.filter((employee) => employee.id !== id));
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center mt-5">
        <div className="col-md-10">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Student List</h3>
              <Link
                to="/dashboard/add_employee"
                className="btn btn-success btn-sm ms-auto"
              >
                Add Student
              </Link>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Subject</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.name}</td>
                        <td>{employee.category_name}</td> {/* Display category name */}
                        <td>
                          <Link
                            to={`/dashboard/edit_employee/${employee.id}`}
                            className="btn btn-primary btn-sm me-2"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => handleDelete(employee.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
