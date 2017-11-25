$(document).ready(function () {

    var socket = io(window.location.origin);
    
    $('#message').keyup(function(e){
        var value = $('#message').val();
        if(e.keyCode == 13)
        {
            $('#send_message').click();
        }
    });

    $('#send_message').click(function(){
        var value = $('#message').val();
        
        let valid = value.replace(/\s/g, ''); 
        
        if(valid.length > 0)
        {
            socket.emit(
                'msgToServer',
                {
                    nickname : $('#nickname').val(),
                    message: value
                }
            );
            $('#message').val("");
        } 
    });

    socket.on('msgToClient', function(data){
        
        var html = '';

        var date = new Date();
        timeStr = date.toLocaleString();
        
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
        $('#dialog').append(html);

        window.scrollTo(0,document.body.scrollHeight);
    });

});