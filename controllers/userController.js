const sqlite3Handler = require('sqlite3').verbose();

let dbHandler = new sqlite3Handler.Database('system_db', (connectError)=>{
    if (connectError){
        console.log(connectError.message)
    }
    else {
        console.log('connected to the database')
    }
});

module.exports = function (app) {
    app.post('/users', function (requestObject, responseObject) {
        dbHandler.run('INSERT INTO users (userFullName, userEmail, userActive) ACTIVE (?,?,?)',
            [
                requestObject.body.userFullName,
                requestObject.body.userEmail,
                requestObject.body.userActive
            ], (insertError)=>{
                resultObject = {'error': "", 'data': ""}
                if (insertError){
                    resultObject.error = insertError
                    resultObject.data = ""
                }
                else {
                    resultObject.data = 'Record has been inserted Successfully'
                }
                responseObject.json(resultObject);
            })
    });

    function listUsers() {
        axios.get(serverURI + 'users').then ((response)=>{
            if (response.error != "") {
                console.log(response.data);
                generateUsersTable(response.data);
            } else {
                document.getElementById('status').innerHTML = error;
                showStatus(0);
            }
        }).catch ((connectionError)=>{
            console.log(connectionError);
            document.getElementById('status').innerHTML = connectionError;
            showStatus(0);
        })
    }

    app.get('/users/:id', function (requestObject, responseObject) {
        console.log('user id', requestObject.params.id)
        dbHandler.all('select * from users where userID = ?', [requestObject.params.id], (selectorError, result)=>{
            resultObject = {'error':"", 'data': ""}
            if (selectorError){
                resultObject.error = selectorError
                resultObject.data = ""
            } else {
                resultObject.data = result
            }
            responseObject.json(resultObject)
        })
    });

    app.delete('/users/:id', function (requestObject, responseObject) {
        console.log(requestObject.params.id);
        dbHandler.run('delete from users where userID = ?', [requestObject.params.id], (deleteError)=>{
            resultObject = {'error': "", 'data': ""}
            if (deleteError){
                resultObject.error = updateError
                resultObject.data = ""
            }
            else {
                resultObject.data = 'Record has been deleted Successfully'
            }
            responseObject.json(resultObject);
        })
    });

    app.put('/users/:id', function (requestObject, responseObject) {
        console.log(requestObject.body);
        dbHandler.run('update users set userFullName = ?, userEmail = ?, where userID = ?',
            [
                requestObject.body.userFullName,
                requestObject.body.userEmail,
                requestObject.body.id
            ], (updateError)=>{
                resultObject = {'error': "", 'data': ""}
                if (updateError){
                    resultObject.error = updateError
                    resultObject.data = ""
                }
                else {
                    resultObject.data = 'Record has been updated Successfully'
                }
                responseObject.json(resultObject);
            })
    });
};
