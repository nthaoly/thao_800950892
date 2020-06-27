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
    app.get('/', function (requestObject, responseObject) {
        console.log('entry id', requestObject.params.id)
        dbHandler.all('select * from posts where ENTRY_ID = ?', [requestObject.params.id], (selectorError, result)=>{
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

    app.get('post/:id', function (requestObject, responseObject) {
        console.log('entry id', requestObject.params.id)
        dbHandler.all('select * from posts where ENTRY_ID = ?', [requestObject.params.id], (selectorError, result)=>{
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

    app.post('/add_post', function (requestObject, responseObject) {
        dbHandler.run('INSERT INTO posts (postEntry, postTitle, postContent)',
            [
                requestObject.body.postEntry,
                requestObject.body.postTitle,
                requestObject.body.postContent
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

    app.get('update_post/:id', function (requestObject, responseObject) {
        console.log('post entry', requestObject.params.id)
        dbHandler.all('select * from posts where postEntry = ?', [requestObject.params.id], (selectorError, result)=>{
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
};

function listPosts() {
    axios.get(serverURI + 'posts').then ((response)=>{
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