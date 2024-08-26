import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true });
    } else {
        return res.json({ loginStatus: false, Error:"wrong email or password" });
    }
  });
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})



router.post('/add_employee', (req, res) => {
  const { name, category_id } = req.body;

  // Validate input
  if (!name || !category_id) {
      return res.status(400).json({ Status: false, Error: "Name and category_id are required." });
  }

  const sql = "INSERT INTO employee (name, category_id) VALUES (?, ?)";
  const values = [name, category_id];

  con.query(sql, values, (err, result) => {
      if (err) {
          return res.status(500).json({ Status: false, Error: "Query Error: " + err.message });
      }
      return res.json({ Status: true });
  });
});

// Add a new route for fetching students by subject
router.get('/students/:category_id', (req, res) => {
  const category_id = req.params.category_id;
  const sql = "SELECT * FROM employee WHERE category_id = ?";
  con.query(sql, [category_id], (err, result) => {
      if (err) return res.status(500).json({ Status: false, Error: "Query Error: " + err.message });
      return res.json({ Status: true, Result: result });
  });
});



router.get('/employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

router.put('/edit_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employee 
      set name = ?, category_id = ? 
      Where id = ?`
  const values = [
      req.body.name,

      req.body.category_id
  ]
  con.query(sql,[...values, id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

router.delete('/delete_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = "delete from employee where id = ?"
  con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})
router.get('/students/:category_id', (req, res) => {
  const category_id = req.params.category_id;
  const sql = "SELECT * FROM employee WHERE category_id = ?";
  con.query(sql, [category_id], (err, result) => {
      if (err) return res.status(500).json({ Status: false, Error: "Query Error: " + err.message });
      return res.json({ Status: true, Result: result });
  });
});

// Add a new route for marking attendance
router.post('/mark_attendance', (req, res) => {
  const { date, category_id, attendance } = req.body;
  // Iterate over attendance data and update the database
  attendance.forEach(student => {
      const sql = "INSERT INTO attendance (date, student_id, category_id, present) VALUES (?, ?, ?, ?)";
      const values = [date, student.id, category_id, student.present];
      con.query(sql, values, (err, result) => {
          if (err) console.error("Error marking attendance:", err);
      });
  });
  return res.json({ Status: true });
});
// Fetch employee data with category name
router.get('/employee', (req, res) => {
  const sql = `
      SELECT employee.id, employee.name, category.name AS category_name
      FROM employee
      INNER JOIN category ON employee.category_id = category.id
  `;
  con.query(sql, (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true, Result: result });
  });
});





// Example backend route
router.get('/attendance/:date/:category_id', (req, res) => {
  const { date, category_id } = req.params;
  // Fetch attendance data from the database based on date and category_id
  // Return the attendance data as JSON
  const sql = `
      SELECT employee.name AS student_name, attendance.present 
      FROM employee 
      LEFT JOIN attendance ON employee.id = attendance.student_id 
      WHERE attendance.date = ? AND attendance.category_id = ?
  `;
  con.query(sql, [date, category_id], (err, result) => {
      if (err) return res.status(500).json({ Status: false, Error: "Query Error: " + err.message });
      return res.json({ Status: true, Result: result });
  });
});



router.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ Status: true });
});






 




export { router as adminRouter };