const bcrypt = require("bcryptjs");
module.exports = (db) => {
  return {
    Aboutpage: (req, res) => {
      if (req.query.search || req.query.rowperpage || req.query.nopage) {
        if (req.query.search && req.query.rowperpage && req.query.nopage) {
          db.query(
            `select count(*) AS count FROM userinfo WHERE firstName like '%${req.query.search}%' or mobile like '%${req.query.search}%' or email like '%${req.query.search}%';
            SELECT * FROM userinfo WHERE firstName like '%${req.query.search}%' or mobile like '%${req.query.search}%' or email like '%${req.query.search}%' limit ${req.query.rowperpage}, ${req.query.nopage}`,
            [],
            (err, resultData) => {
              if (err) {
                console.log(err), res.status(400).send(err);
              } else {
                let resp = {
                    totalCount: resultData[0][0].count,
                    data: resultData[1],
                    msg: "User details fetched successfully"
                }
                console.log(data), res.status(200).send(resp);
              }
            }
          );
        } 
        if (req.query.rowperpage && req.query.nopage) {
            db.query(
                `select count(*) AS count from userinfo;
              SELECT * FROM userinfo limit ${req.query.rowperpage}, ${req.query.nopage}`,
              (err, resultData) => {
                if (err) {
                  console.log(err), res.status(400).send(err);
                } else {
                    console.log(resultData[1]);
                    let resp = {
                        totalCount: resultData[0][0].count,
                        data: resultData[1],
                        msg: "User details fetched successfully"
                    }
                  res.status(200).send(resp);
                }
              }
            );
          }
      }
      //   else if(){}
    //   else {
       
    //     db.query(`select * from userinfo`, [], (err, data) => {
    //       if (err) {
    //         res.status(data).send("error");
    //       } else {
    //         res.status(200).send(data);
    //       }
    //     });
    //   }
    },
  };
};
