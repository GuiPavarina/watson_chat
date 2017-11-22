/* importing configs from server */
const app = require('./config/server'); 

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
	console.log('Server online');
});

const io = require('./config/socketio');

io.startSocket(server);

app.set('io',io);
