require('dotenv').config();
const user = require('./user');

user.createTable().then((values) => {
    console.log('User Table Created!');
}).catch((values) => {
    console.log('Failed to create User table');
});