$(document).ready(function () {

    var socket = io(window.location.origin);
    
    $('#send_message').click(function(){
        socket.emit(
            'msgToServer',
            {
                nickname : $('#nickname').val(),
                message: $('#message').val()
            }
        );

        $('#message').val("");
    });

    socket.on('msgToClient', function(data){
        var html = '';

        html += '<div class="dialog">';
            html += '<h4>' + data.nickname + '</h4>';
            html += '<p>' + data.message + '</p>';
        html += '</div>';

        $('#dialog').append(html);

        window.scrollTo(0,document.body.scrollHeight);
    });

});