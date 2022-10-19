module.exports = {
    HOST: "ec2-54-80-123-146.compute-1.amazonaws.com",
    USER: "qzngpkbjncvrai",
    PASSWORD: "5d2831c14a55b479b86732938d32d0ad0ee3eaa4f8db6a3c3b894acb7765e1ee",
    DB: "deitg2b1o2l1cd",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};