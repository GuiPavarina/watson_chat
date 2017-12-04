$(document).ready( () => {

    // Getting actual URL, useful to deploy
    var socket = io(window.location.origin);
    
    // Check if the user press Enter
    $('#message').keyup((e) => {
        if(e.keyCode == 13)
        {
            $('#send_message').click();
        }
    });

    // Button to send message
    $('#send_message').click(() => {
        // Getting value from input
        let value = $('#message').val();
        
        //replacing all spaces to valid if the user only type spaces
        let valid = value.replace(/\s/g, ''); 
        
        //if the user pressed only spaces
        if(valid.length > 0)
        {
            // Sending to server message from user
            socket.emit(
                'msgToServer',
                {
                    nickname : $('#nickname').val(),
                    message: value
                }
            );
            
            // Clear input after send
            $('#message').val("");
        } 

        //if the input is not valid, nothing will happen;
    });

    // Send the message to the ui
    socket.on('msgToClient', (data) => {
        
        var html = '';

        // getting new date
        var date = new Date();
        timeStr = date.toLocaleString();
        
        // There are two types of messages, from user and the other from bot.
        if(data.nickname === 'Watson'){
            html += '<li class="clearfix">';
                html += '<div class="message-data">'
                    html += '<span class="message-data-name"><i class="fa fa-circle online"></i> ' + data.nickname + '</span>'
                    html += '<span class="message-data-time">' + timeStr + '</span>'
                html += '</div>'
                html += '<div class="message my-message float-left">'
                    html += data.message;
                html += '</div>'
            html += '</li>'
        } else {
            html += '<li class="clearfix">';
                html += '<div class="message-data align-right">'
                    html += '<span class="message-data-time" >' + timeStr + '</span> &nbsp; &nbsp;'
                    html += '<span class="message-data-name" >'+ data.nickname +'</span> <i class="fa fa-circle me"></i>'
                html += '</div>'
                html += '<div class="message other-message float-right">'
                    html += data.message;
                html += '</div>'
            html += '</li>'
        }

        // appending to dialog div
        $('#dialog').append(html);

        // scroll down the screen everytime the UI receive a new message
        window.scrollTo(0,document.body.scrollHeight);
    });

});