import express from "express";
import employees from "./routes/employees.routes.js";
import router from "./routes/index.routes.js";

const app = express();

app.use(express.json())

app.use('/api',employees)
app.use('/api',router)

// middleware

app.use((req, res, next) => {
  res.status(404).send({message: 'Page Not Found'});
})

export default app;