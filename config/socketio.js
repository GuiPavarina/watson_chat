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
        
        sendMessage('oi');

        socket.on('msgToServer',function(data){
            
            socket.emit('msgToClient',{
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
            else{
                let msg = response.output.text[0];
                applyMessage((msg ? msg : " We sorry about it, but we got no answer "));
            }
            });
        }

        function applyMessage(message){
            socket.emit(
                'msgToClient',
                {
                    nickname: 'Watson', 
                    message: message
                }
            );
        }
    });
}

