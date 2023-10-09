const express = require('express');
const router = express.Router();
const { signToken } = require('../helper/signToken');
const pool = require('../config.js');

router.post('/register', async (req, res, next) => {
  try {
    const { id, email, password, gender, role } = req.body;
    const insertQuery = `INSERT INTO users(id, email, password, gender, role)
        VALUES
        ($1, $2, $3, $4, $5)
        `;
    const result = await pool.query(insertQuery, [id, email, password, gender, role]);
    res.status(201).json({
      message: 'user created successfully',
      email,
      gender,
      role,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post('/login', (req, res) => {
  pool.query(`SELECT * FROM users WHERE email = $1 AND password = $2`, [req.body.email, req.body.password], (error, results) => {
    if (error) {
      return res.status(500).json(error);
    }
    console.log(results.rows[0]);
    const token = signToken(results.rows[0]);
    res.json({
      token: token,
    });
  });
});

router.delete('/users/:id', (req, res) => {
  pool.query(`DELETE FROM users WHERE id = '${req.params.id}'`, (error, results) => {
    if (error) {
      return res.status(500).json(error);
    }
    res.status(201).json({
      status: 'Success',
    });
  });
});

module.exports = router;
