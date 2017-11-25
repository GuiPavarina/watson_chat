/* importing configs from server */
const app = require('./config/server'); 

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
	console.log('Server online');
});

const io = require('./config/socketio');

// Check if it is running on heroku or locally
let config;

if(process.env.workspace_id){
	config = process.env;
} else {
	config = require('./config.json');
}

io.startSocket(server,config);

app.set('io',io);
