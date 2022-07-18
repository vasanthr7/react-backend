const express = require('express');
const app = express();
const cors = require('cors');
const bodyParse = require('body-parser');
const router = require('./Router');
const bcrypt = require('bcryptjs');

let port = 4000;

app.use(cors())

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));


const mysql = require('mysql');
//connection configurationn
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Soft1234',
    database: 'employee',
    multipleStatements: true,
    raw: true
});

//connect to database
db.connect();


app.listen(port);

console.log("api server starter on : " + port);

 router(app, db)

// Requiring module
// const password = 'pass123';
// var hashedPassword;

// // Encryption of the string password
// bcrypt.genSalt(10, function (err, Salt) {

// 	// The bcrypt is used for encrypting password.
// 	bcrypt.hash(password, Salt, function (err, hash) {

// 		if (err) {
// 			return console.log('Cannot encrypt');
// 		}

// 		hashedPassword = hash;
// 		console.log(hash);

// 		bcrypt.compare(password, hashedPassword,
// 			async function (err, isMatch) {

// 			// Comparing the original password to
// 			// encrypted password
// 			if (isMatch) {
// 				console.log('Encrypted password is: ', password);
// 				console.log('Decrypted password is: ', hashedPassword);
// 			}

// 			if (!isMatch) {
			
// 				// If password doesn't match the following
// 				// message will be sent
// 				console.log(hashedPassword + ' is not encryption of '
// 				+ password);
// 			}
// 		})
// 	})
// })
