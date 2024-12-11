const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
  // Create a websocket object
  const server = new WebSocketServer({ noServer: true });

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    server.handleUpgrade(request, socket, head, function done(ws) {
      server.emit('connection', ws, request);
    });
  });

  // Keep track of all the connections so we can forward messages
  // userConnections is a map with username as key and a list of connections as values
  const userConnections = {};

  server.on('connection', (ws, req) => {
    // const connection = { alive: true, ws: ws };
    // get userID from query parameter
    const urlParams = new URLSearchParams(new URL(req.url).search);
    const userID = urlParams.get('userID');

    const connection = { id: uuid.v4(), alive: true, ws: ws}

    if (!(userID in userConnections)) {
      userConnections[userID] = [];
    }
    userConnections[userID].push(connection);
    
    // Forward messages to all connections with of same user except the sender
    ws.on('message', function message(data) {
      userConnections[userID].forEach((c) => {
        if (c.id !== connection.id) {
          c.ws.send(data);
        }
      });
    });

    // Remove the closed connection so we don't try to forward anymore
    ws.on('close', () => {
      const pos = userConnections[userID].findIndex((o, i) => o.id === connection.id);

      if (pos >= 0) {
        userConnections[userID].splice(pos, 1);
      }
    });

    // Respond to pong messages by marking the connection alive
    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  // kill dead connections
  setInterval(() => {
    for (u in userConnections) {
      connections.forEach((c) => {
        // Kill any connection that didn't respond to the ping last time
        if (!c.alive) {
          c.ws.terminate();
        } else {
          c.alive = false;
          c.ws.ping();
        }
      });
    }
  }, 10000);
}

module.exports = { peerProxy };
