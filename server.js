const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cors()); 
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
})

let messages = [

]

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);

    //enviar todas as menssagensa anteriores
    socket.emit('previousMessages', messages)

    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    })
})

server.listen(3000,'0.0.0.0');