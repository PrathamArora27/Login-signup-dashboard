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
          const { email, password, role, name } = data;
      
          // Input validation
          if (!email || !password || !['admin', 'user'].includes(role)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid input' }));
            return;
          }
      
          const model = role === 'admin' ? AdminModel : UserModel;
      
          // Check if email exists
          const existingUser = await model.findOne({ email });
          if (existingUser) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Email already in use' }));
            return;
          }
      
          // Hash the password
          const bcrypt = require('bcrypt');
          const hashedPassword = await bcrypt.hash(password, 10);
      
          // Create new user
          const newUser = new model({ name,email, password: hashedPassword, role });
          await newUser.save();
      
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Signup successful', role }));
        } catch (err) {
          console.error('Error during signup:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
      }
      else if (parsedUrl.pathname === '/login') {
        try {
            const { email, password } = data;
    
            // Check if user exists in UserModel
            let user = await UserModel.findOne({ email });
    
            // If not found in UserModel, check in AdminModel
            if (!user) {
                user = await AdminModel.findOne({ email });
            }
    
            // If no user is found in both collections
            if (!user) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid email or password' }));
                return;
            }
    
            // Check password
            const bcrypt = require('bcrypt');
            const isPasswordValid = await bcrypt.compare(password, user.password);
    
            if (!isPasswordValid) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid email or password' }));
                return;
            }
    
            // Successful login
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Login successful', role: user.role, name: user.name }));
        } catch (err) {
            console.error('Error during login:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    }
     else {
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
