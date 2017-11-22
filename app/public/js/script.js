$(document).ready(function () {

    var socket = io(window.location.origin);
    
    $('#message').keyup(function(e){
        var value = $(this).val();
        if(e.keyCode == 13 && value.length > 0)
        {
            $('#send_message').click();
        }
    });

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

        html += '<div class="dialog ' +  data.class + '">';
            html += '<h4>' + data.nickname + '</h4>';
            html += '<p>' + data.message + '</p>';
        html += '</div>';

        $('#dialog').append(html);

        window.scrollTo(0,document.body.scrollHeight);
    });

});