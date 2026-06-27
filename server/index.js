require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
const sequelize = require("./config/database");

require("./models");
const routes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: [
      "http://localhost:5173", // React/Vite local
      "https://tinystore.netlify.app", // URL da netlify
    ],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api", routes);

app.use(errorMiddleware);

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
  });
});
