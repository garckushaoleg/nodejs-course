const fsPromises = require("fs").promises;
const path = require('path');
const { format } = require('date-fns');
const { v4: uuid } = require("uuid");
const logEvents = require("./logEvents");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {};

const myEmitter = new MyEmitter();

myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
	myEmitter.emit('log', "Log event emitted! It's amazing");
}, 2000);

console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));

const fileOps = async () => {
	try {
		await fsPromises.writeFile(path.join(__dirname, 'files', 'starter.txt'), 'Hi! I am learning Nodejs now.');
		const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
		console.log(data);
		await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'));
		await fsPromises.writeFile(path.join(__dirname, 'files', 'reply.txt'), "It's greate description!");
		await fsPromises.appendFile(path.join(__dirname, 'files', 'reply.txt'), "\n\nBut you can better!");
		await fsPromises.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'));
		const info = await fsPromises.readFile(path.join(__dirname, 'files', 'newReply.txt'), 'utf8');
		console.log(info);
	} catch(e) {
		console.error(e);
	}
}

fileOps();

console.log('Hello..');

console.log(uuid());

process.on('uncaughtException', err => {
	console.error(`There was an uncaught error: ${ err }`);
	process.exit(1);
})