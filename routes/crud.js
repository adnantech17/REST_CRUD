const pool = require("../db");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");

    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    const newTodo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);

    res.json(newTodo.rows);
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const newTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE id = $2",
      [description, id]
    );

    res.json("TODO UPDATED!");
  } catch (err) {
    console.log(err.message);
  }
});

router.delete("/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    const newTodo = await pool.query("DELETE FROM todo WHERE id = $1", [id]);

    res.json("TODO WAS DELETED!");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
