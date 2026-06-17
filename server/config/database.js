 const { Sequelize } = require("sequelize");
//-- quando era local
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: "postgres",
//   },
// );

// usando neon
const sequelize = new Sequelize(
  process.env.DATABASE_URL,
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Banco sincronizado."))
  .catch((err) => console.log("Error: " + err));
  
module.exports = sequelize;
