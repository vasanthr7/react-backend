const bcrypt = require("bcryptjs");
module.exports = (db) => {
  return {
    gellalluserdetails: (req, res) => {
      // if (req.query.id) {
      //   q = `select * from userinfo where UserId=${req.query.id}`;
      // } else {
      //   q = `select UserId,firstName,mobile,email from userinfo`;
      // }

      db.query(
        `select UserId,firstName,mobile,email from userinfo`,
        (err, data) => {
          if (err) {
            console.log(err);
            res.status(data).send("error");
          } else {
            console.log(data);
            res.status(200).send(data);
          }
        }
      );
    },

    postalluserdetail: (req, res) => {
      let value = [
        req.body.firstName,
        req.body.mobile,
        req.body.email,
        req.body.password,
      ];
      bcrypt.genSalt(10, function (err, Salt) {
        // The bcrypt is used for encrypting password.
        bcrypt.hash(req.body.password, Salt, function (err, hash) {
          if (err) {
            return console.log("Cannot encrypt");
          }

          if (hash) {
            value[3] = hash;
            console.log(value);
            db.query(
              `select count(email) AS count from userinfo where email= ? `,
              [req.body.email],
              (err, emailval) => {
                if (err) {
                  console.log(err), res.status(400).send(err);
                }
                console.log(emailval);

                if (emailval[0].count == 0) {
                  db.query(
                    `insert into userinfo (firstName,mobile,email,password)values(?,?,?,?)`,
                    value,
                    (err, data) => {
                      if (err) {
                        console.log(err), res.status(400).send(err);
                      } else {
                        console.log(data), res.status(200).send("success");
                      }
                    }
                  );
                } else {
                  console.log(emailval),
                    res.status(400).send("Email already exists");
                }
              }
            );
          }
          //   bcrypt.compare(
          //     req.body.password,
          //     hash,
          //     async function (err, isMatch) {
          //       // Comparing the original password to
          //       // encrypted password
          //       if (isMatch) {
          //         console.log("Encrypted password is: ", req.body.password);
          //         console.log("Decrypted password is: ", hash);
          //       }

          //       if (!isMatch) {
          //         // If password doesn't match the following
          //         // message will be sent
          //         console.log(
          //           hash + " is not encryption of " + req.body.password
          //         );
          //       }
          //     }
          // );
        });
      });
    },

    putuserdetail: (req, res) => {
      let value = [
        req.body.firstName,
        req.body.mobile,
        req.body.email,
        req.body.UserId,
        req.body.password,
      ];

      db.query(
        `select password from userinfo where UserId = ?`,
        [req.body.UserId],
        (err, pwd) => {
          if (err) {
            console.log(err), res.status(400).send(err);
          }
          if (pwd && pwd.length) {
            bcrypt.compare(
              req.body.password,
              pwd[0].password,
              function (err, result) {
                if (err) {
                  console.log(err), res.status(400).send(err);
                }
                if (result) {
                  console.log("compare", result);
                  db.query(
                    `update userinfo set firstName = ?, mobile= ?, email= ? where  UserId = ? `,
                    value,
                    (err, data) => {
                      if (err) {
                        console.log(err), res.status(400).send(err);
                      } else {
                        console.log(data), res.status(200).send("success");
                      }
                    }
                  );
                } else {
                  console.log(result), res.status(401).send("success");
                }
              }
            );
          }
        }
      );

      // db.query(`select password from userinfo where UserId = ?`, req.body.UserId, (err, pwd) => {
      //   if(pwd.password == hash){}})

      // var query = "update userinfo set ";
      // for (const property in req.body) {
      //   if (property != "UserId") {
      //     if (Number(req.body[property]))
      //       query += ` ${property} = ${req.body[property]},`;
      //     else query += ` ${property} = '${req.body[property]}',`;
      //   }
      // }
      // query = query.substring(0, query.length - 1);
      // query += ` WHERE UserId = ${req.body.UserId}`;
      // console.log(query);
      // db.query(query, (err, data) => {
      //   if (err) {
      //     console.log(err), res.status(400).send(err);
      //   } else {
      //     console.log(data), res.status(200).send("success");
      //   }
      // });
    },
    // `SELECT * FROM employee.userinfo WHERE firstName like '%${firstName}%'`,
    deleteuserdetail: (req, res) => {
      db.query(
        `delete from userinfo where UserId=?`,
        [req.query.id],
        (err, data) => {
          if (err) {
            console.log(err), res.status(400).send(err);
          } else {
            console.log(data), res.status(200).send("success");
          }
        }
      );
    },
    getdata: (req, res) => {
      db.query(
        `select count(*) AS count from manager where Name = ? and Password = ?`,
        [req.body.firstName, req.body.password],
        (err, data) => {
          if (err) {
            console.log(err), res.status(400).send(err);
          } else {
            if (data[0].count) {
              console.log(data), res.status(200).send("success");
            } else {
              res.status(400).send(err);
            }
          }
        }
      );
    },

    filtersearch: (req, res) => {
      
      // db.query(
      //   `SELECT * FROM userinfo WHERE firstName like '%${req.query.query}%' or mobile like '%${req.query.query}%' or email like '%${req.query.query}%'`,
      //   (err, data) => {
      //     if (err) {
      //       console.log(err), res.status(400).send(data);
      //     } else {
      //       console.log(data), res.status(200).send(data);
      //     }
      //   }
      // );
      db.query(
        // `SELECT * FROM userinfo limit ?, ?`,
        // [req.body.l1, req.body.l2],
        `SELECT * FROM userinfo WHERE firstName like '%${req.query.name}%' or mobile like '%${req.query.name}%' or email like '%${req.query.name}%' limit ${req.query.id1}, ${req.query.id2}`,[],
        
        (err, data) => {
          if (err) {
            console.log(err), res.status(400).send(err);
          } else {
            console.log(data), res.status(200).send(data);
          }
        }
      );
    },
    filtersearch1: (req, res) => {
      
      db.query(
        `SELECT * FROM userinfo WHERE firstName like '%${req.query.query}%' or mobile like '%${req.query.query}%' or email like '%${req.query.query}%'`,
        (err, data) => {
          if (err) {
            console.log(err), res.status(400).send(data);
          } else {
            console.log(data), res.status(200).send(data);
          }
        }
      );
      
    },
    limitaion: (req, res) => {
      db.query(
        // `SELECT * FROM userinfo limit ?, ?`,
        // [req.body.l1, req.body.l2],
        `SELECT * FROM userinfo limit ${req.query.id1}, ${req.query.id2}`,
        
        (err, data) => {
          if (err) {
            console.log(err), res.status(400).send(err);
          } else {
            console.log(data), res.status(200).send(data);
          }
        }
      );
    },
    Aboutpage: (req, res) => {
      // if(req.query.search){
      //   db.query(
      //     `SELECT * FROM userinfo WHERE firstName like '%${req.query.search}%' or mobile like '%${req.query.search}%' or email like '%${req.query.search}%'`,[],
          
      //     (err, data) => {
      //       if (err) {
      //         console.log(err), res.status(400).send(err);
      //       } else {
      //         console.log(data), res.status(200).send(data);
      //       }
      //     }
      //   );

      // }
      // else if (req.query.search && req.query.limit) {
      //   db.query(
      //     `SELECT * FROM userinfo WHERE firstName like '%${req.query.name}%' or mobile like '%${req.query.name}%' or email like '%${req.query.name}%' limit ${req.query.id1}, ${req.query.id2}`,[],
      //     (err, data) => {
      //       if (err) {
      //         console.log(err), res.status(400).send(err);
      //       } else {
      //         console.log(data), res.status(200).send(data);
      //       }
      //     }
      //   );
      // } else {
       
      // // }
      // db.query(
      //   // `SELECT * FROM userinfo limit ?, ?`,
      //   // [req.body.l1, req.body.l2],
      //   `SELECT * FROM userinfo WHERE firstName like '%${req.query.name}%' or mobile like '%${req.query.name}%' or email like '%${req.query.name}%' limit ${req.query.id1}, ${req.query.id2}`,[],
        
      //   (err, data) => {
      //     if (err) {
      //       console.log(err), res.status(400).send(err);
      //     } else {
      //       console.log(data), res.status(200).send(data);
      //     }
      //   }
      // );
      
    },
    
  };
};
