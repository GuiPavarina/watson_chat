module.exports.startSocket = (server) => { 

    // starting server
    const io = require('socket.io').listen(server)

    // watson
    const watson = require('watson-developer-cloud');

    // getting configs
    // const config = require('../config.json');
    const config = process.env;
    
    // starting watson
    const conversation = watson.conversation({
        username: config.username,
        password: config.password,
        version: config.version,
        version_date: config.version_date
    });

    /* creating connection for websocket*/
    io.on('connection', function(socket){
        
        // Send the first massage, when the user connect he will see a message from bot.
        sendMessage('oi');

        socket.on('msgToServer',function(data){
            
            // writing in UI the message from User
            socket.emit('msgToClient',{
                nickname: data.nickname, 
                message: data.message
            })

            // Sending massage to Watson
            sendMessage(data.message);

        });

        // Function used to get response from watson
        function sendMessage(message){  
            conversation.message({
            workspace_id: config.workspace_id,
            input: {'text': message}
            },  function(err, response) {
            if (err){
                console.log('error:', err);
                applyMessage("Oh no, something wrong happened");
            }
            else{
                let msg = response.output.text[0];
                
                // Default message defined
                applyMessage((msg ? msg : " We sorry about it, but we got no answer "));
            }
            });
        }

        // Writing in UI message from watson
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

