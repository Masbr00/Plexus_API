module.exports = {
    URL: "postgres://btrltsctsgfmtm:f8333b8e6dca716ee769c0f08b516adacb713d1a352b57298324cd0719d5e610@ec2-54-173-237-110.compute-1.amazonaws.com:5432/d2ca7i104ug1ha",
    HOST: "ec2-54-173-237-110.compute-1.amazonaws.com",
    USER: "btrltsctsgfmtm",
    PASSWORD: "f8333b8e6dca716ee769c0f08b516adacb713d1a352b57298324cd0719d5e610",
    PORT: 5432,
    DB: "d2ca7i104ug1ha",
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