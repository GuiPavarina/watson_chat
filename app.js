/* importing configs from server */
const app = require('./config/server'); 

const config = require('./config.json');

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
	console.log('Server online');
});

const io = require('socket.io').listen(server);

app.set('io',io);

const watson = require('watson-developer-cloud');

const conversation = watson.conversation({
	username: config.username,
	password: config.password,
	version: config.version,
	version_date: config.version_date
});

/* creating connection for websocket*/
io.on('connection', function(socket){

	socket.on('msgToServer',function(data){
		
		socket.emit('msgToClient',{nickname: data.nickname, message: data.message})
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
				nickname: 'Watson', message: message}
			);
	}

});