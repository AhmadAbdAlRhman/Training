const Sequelize = require('sequelize');

const sequelize = new Sequelize("training","root","Ahmad45@2000",{
    host: "localhost",
    port:3000,
    dialect:'mysql',   
});

module.exports = sequelize;