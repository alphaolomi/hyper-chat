const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;

// Connect to mongo
const url = "mongodb://localhost:27017/";
let mongoClientPromise;
mongoClientPromise = mongo.connect(url, {useNewUrlParser: true}, function (err, db) {
  if (err) {
    throw err;
  }
  console.log('MongoDB connected...');

  // Connect to Socket.io
  client.on('connection', function (socket) {
    const dbo = db.db("mongochat");
    const chat = dbo.collection('chats');

    // Create function to send status
    let sendStatus = function (s) {
      socket.emit('status', s);
    };

    // Get chats from mongo collection
    chat.find().limit(100).sort({_id: 1}).toArray(function (err, res) {
      if (err) {
        throw err;
      }

      // Emit the messages
      socket.emit('output', res);
    });

    // Handle input events
    socket.on('input', function (data) {
      let name = data.name;
      let message = data.message;

      // Check for name and message
      if (name === '' || message === '') {
        // Send error status
        sendStatus('Please enter a name and message');
      } else {
        // Insert message
        chat.insertOne({name: name, message: message}, function () {
          client.emit('output', [data]);

          // Send status object
          sendStatus({
            message: 'Message sent',
            clear: true
          });
        });
      }
    });

    // Handle clear
    socket.on('clear', function (data) {
      // Remove all chats from collection
      let deleteOne = chat.deleteOne({}, function () {
        // Emit cleared
        socket.emit('cleared');
      });
    });
  });
});
