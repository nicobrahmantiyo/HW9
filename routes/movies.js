const express = require('express');
const { authentication } = require('../middleware/auth');
const router = express.Router();
const pool = require('../config.js');

router.get('/', (req, res) => {
  pool.query(`SELECT * FROM public.movies ${req.query.limit ? 'LIMIT ' + req.query.limit : ''} `, (error, results) => {
    if (error) {
      return res.status(500).json(error);
    }
    res.json(results.rows);
  });
});

router.get('/:id', (req, res) => {
  pool.query(`SELECT * FROM public.movies WHERE id =${req.params.id}`, (error, results) => {
    if (error) {
      return res.status(500).json(error);
    }
    res.json(results.rows);
  });
});

router.post('/', (req, res) => {
  pool.query(`INSERT INTO public.movies ("id","title","genres","year")VALUES ($1,$2,$3,$4);`, [req.body.id, req.body.title, req.body.genres, req.body.year], (error, results) => {
    if (error) {
      return res.status(500).json(error);
    }
    res.status(201).json({
      status: 'Success',
    });
  });
});

router.put('/:id', authentication, (req, res) => {
  pool.query(`UPDATE public.movies SET genres = '${req.body.genres}' WHERE id = ${req.body.id}`, (error, results) => {
    if (error) {
      return res.status(500).json(error);
    }
    res.status(201).json({
      status: 'Success',
    });
  });
});

router.delete('/:id', authentication, (req, res) => {
  pool.query(`DELETE FROM public.movies WHERE id = '${req.params.id}'`, (error, results) => {
    if (error) {
      return res.status(500).json(error);
    }
    res.status(201).json({
      status: 'Success',
    });
  });
});

module.exports = router;
