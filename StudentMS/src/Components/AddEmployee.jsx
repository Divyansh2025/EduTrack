import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    category_id: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      name: employee.name,
      category_id: employee.category_id,
    };

    axios
      .post("http://localhost:3000/auth/add_employee", requestData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card p-4">
            <h3 className="text-center mb-4">Add Student</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="inputName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  placeholder="Enter Name"
                  value={employee.name}
                  onChange={(e) =>
                    setEmployee({ ...employee, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Subject
                </label>
                <select
                  name="category"
                  id="category"
                  className="form-select"
                  onChange={(e) =>
                    setEmployee({ ...employee, category_id: e.target.value })
                  }
                >
                  <option value="">Select Subject</option>
                  {category.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-100">
                Add Student
              </button> {/* Applied btn-lg class for larger button size */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
