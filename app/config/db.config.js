module.exports = {
    HOST: "ec2-44-210-36-247.compute-1.amazonaws.com",
    USER: "cpbglqzzlnfyaz",
    PASSWORD: "b12545187f33523e41fae81220e6da9c9124aff8dc889a3a7e6d2bc3767638e1",
    DB: "djm7q46l9n4t6",
    dialect: "postgres",
    ssl: true,
    dialectOptions:{
        ssl: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};