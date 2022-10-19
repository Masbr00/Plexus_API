module.exports = {
    URL: "postgres://qkbsgvbwhmgqoh:3498152f3abda72c4d7f8d495d129790f1775a78e157067408aaedec204c09b4@ec2-3-223-242-224.compute-1.amazonaws.com:5432/d8sg2gr9eit0le",
    HOST: "ec2-3-223-242-224.compute-1.amazonaws.com",
    USER: "qkbsgvbwhmgqoh",
    PASSWORD: "3498152f3abda72c4d7f8d495d129790f1775a78e157067408aaedec204c09b4",
    PORT: 5432,
    DB: "d8sg2gr9eit0le",
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