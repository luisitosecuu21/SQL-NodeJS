import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees");
    res.json(rows);
  } catch (err) {
    res.status(500).send("something goes wrong");
  }
};

export const getEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query("SELECT * FROM employees WHERE id =?", [
      id,
    ]);
    if (rows.length <= 0) {
      return res.status(404).send({ message: "employee not found" });
    }

    res.send(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "something goes wrong" });
  }
};

export const postEmployees = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO employees (name, salary) VALUES (?,?)",
      [name, salary]
    );
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    res.status(404).json({ message: "employee not found" });
  }
};

export const putEmployees = async (req, res) => {
  const id = req.params.id;
  const { name, salary } = req.body;
  const [result] = await pool.query(
    "UPDATE employees SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id =?",
    [name, salary, id]
  );

  if (result.affectedRows <= 0) {
    return res.status(404).send({ message: "employee not found" });
  }

  const [rows] = await pool.query("SELECT * FROM employees WHERE id =?", [id]);

  res.json(rows[0]);
};

export const deleteEmployees = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query("DELETE FROM employees WHERE id =?", [id]);
    if (rows.affectedRows <= 0) {
      return res.status(404).send({ message: "employee not found" });
    }
    res.status(204);
  } catch (error) {
    res.status(404).send({ message: "employee not found" });
  }
};
