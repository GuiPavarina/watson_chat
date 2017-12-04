module.exports.startSocket = (server,config) => { 

    // starting server
    const io = require('socket.io').listen(server)

    // watson
    const watson = require('watson-developer-cloud');
    
    // starting watson
    const conversation = watson.conversation({
        username: config.username,
        password: config.password,
        version: config.version,
        version_date: config.version_date
    });

    /* creating connection for websocket*/
    io.on('connection', (socket) => {
        
        // Send the first massage, when the user connect he will see a message from bot.
        sendMessage('oi');

        socket.on('msgToServer',(data) => {
            
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
                },  (err, response) => {
                if (err){
                    console.log('error:', err);
                    applyMessage("Oh no, something wrong happened");
                }
                else{
                    let msg = response.output.text[0];
                    
                    if(msg){
                        while(msg.includes(' http://')){
                            let startLink = msg.indexOf(' http://');
                            let endLink;
                            for( let index = startLink+1 ; index < msg.length; index++ ){
                                if(msg.charAt(index) == (' ')){
                                    endLink = index;
                                    break;
                                } else if ( index + 1 == msg.length){
                                    endLink = msg.length;
                                    if(msg.charAt(endLink-1) == ('.'))
                                        endLink = endLink -1;
                                    break;
                                }
                            }
                            let link = msg.substring(startLink+1,endLink);
                            msg = msg.replace(' ' + link, ' <a href="' + link + '">' + link + '</a>');                        
                        }
                    }
                    // Default message defined
                    applyMessage( msg || " We sorry about it, but we got no answer " );
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

