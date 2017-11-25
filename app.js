/* importing configs from server */
const app = require('./config/server'); 

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
	console.log('Server online');
});

const io = require('./config/socketio');

/* 
* BE AWARE HERE
* IF YOU ARE RUNNING LOCALY, PLEASE COMMENT THE LINE BELOW WITH PROCESS.ENV AND USE THE CONFIG.JSON
* process.env is used only for deploy
*/
// const config = process.env;
//const config = require('./config.json');

let config;

if(process.env.workspace_id){
	config = process.env;
} else {
	config = require('./config.json');
}

io.startSocket(server,config);

app.set('io',io);
