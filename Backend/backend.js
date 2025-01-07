const http = require('http');
const mongoose = require('mongoose');
const { AdminModel, UserModel } = require('./models/UserSchema');
const url = require('url');

const PORT = 3000;
const mongoURI = 'mongodb://localhost:27017/allUsers';

mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected to allUsers database'))
  .catch((err) => console.error('Failed to connect to the database', err));

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let body = '';

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight response for OPTIONS
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST') {
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const data = JSON.parse(body);

      if (parsedUrl.pathname === '/signup') {
        try {
          const { email, password, role } = data;

          // Check if user already exists
          const existingUser = await UserModel.findOne({ email });
          if (existingUser) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Email already in use' }));
            return;
          }

          // Create new user
          const newUser = new AdminModel({ email, password, role });
          await newUser.save();

          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Signup successful', role: role }));
        } catch (err) {
          console.error('Error during signup:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
      } else if (parsedUrl.pathname === '/login') {
        try {
          const { email, password } = data;

          // Check if user exists and password matches
          const user = await UserModel.findOne({ email });
          if (!user || user.password !== password) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid email or password' }));
            return;
          }

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Login successful' }));
        } catch (err) {
          console.error('Error during login:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Endpoint not found' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid request method' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
