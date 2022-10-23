module.exports = {
    URL: "postgres://frlnbomh:as2o90J7I8r7PFTJvI8UhQwdpsdQZKWA@tiny.db.elephantsql.com/frlnbomh",
    HOST: "tiny.db.elephantsql.com",
    USER: "frlnbomh",
    PASSWORD: "as2o90J7I8r7PFTJvI8UhQwdpsdQZKWA",
    PORT: 5432,
    DB: "frlnbomh",
    dialect: "postgres",
    dialectOptions: {
        ssl: {
          require: true, // This will help you. But you will see nwe error
          rejectUnauthorized: false // This line will fix new error
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
// module.exports = {
//     // URL: "postgres://frlnbomh:as2o90J7I8r7PFTJvI8UhQwdpsdQZKWA@tiny.db.elephantsql.com/frlnbomh",
//     HOST: "localhost",
//     USER: "postgres",
//     PASSWORD: "1234",
//     PORT: 5432,
//     DB: "db_plexus",
//     dialect: "postgres",
//     dialectOptions: {
//         ssl: {
//           require: true, // This will help you. But you will see nwe error
//           rejectUnauthorized: false // This line will fix new error
//         }
//     },
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };