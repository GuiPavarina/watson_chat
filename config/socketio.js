module.exports.startSocket = (server) => { 

    const io = require('socket.io').listen(server)

    const watson = require('watson-developer-cloud');

    const config = require('../config.json');
    
    const conversation = watson.conversation({
        username: config.username,
        password: config.password,
        version: config.version,
        version_date: config.version_date
    });

    /* creating connection for websocket*/
    io.on('connection', function(socket){
        
        socket.on('msgToServer',function(data){
            
            socket.emit('msgToClient',{
                class: "col-md-offset-2 col-md-10",
                nickname: data.nickname, 
                message: data.message
            })
            sendMessage(data.message);

        });

        function sendMessage(message){  
            conversation.message({
            workspace_id: config.workspace_id,
            input: {'text': message}
            },  function(err, response) {
            if (err)
                console.log('error:', err);
            else
                applyMessage(response.output.text[0]);
            });
        }

        function applyMessage(message){
            socket.emit(
                'msgToClient',
                {
                    class: "col-md-10",
                    nickname: 'Watson', 
                    message: message}
                );
        }
    });
}

