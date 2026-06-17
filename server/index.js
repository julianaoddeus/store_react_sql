require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
const sequelize = require("./config/database");

require("./models/users.model");
const routes = require("./routes/routes");



const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use(errorMiddleware);

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
  });
});
