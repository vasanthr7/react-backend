module.exports = (app,db) => {
    const apicontroller = require('./apicontroller')(db);
    const apicontroller1 = require('./apicontroller1')(db);

    app.get('/getuser', apicontroller.gellalluserdetails);
    app.post('/postuser', apicontroller.postalluserdetail);
    app.put('/putuser', apicontroller.putuserdetail);
    app.delete('/deleteuser', apicontroller.deleteuserdetail);
    app.post('/getdata', apicontroller.getdata);
    app.get('/filter', apicontroller.filtersearch);
    app.get('/filter1', apicontroller.filtersearch1);
    app.get('/limitation', apicontroller.limitaion);

    app.get('/About', apicontroller1.Aboutpage);
   
   
}