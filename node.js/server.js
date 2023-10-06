#!/usr/bin/env node

const http = require('http');
const MongoClient = require('mongodb').MongoClient;

const host = process.argv[3] || '127.0.0.1';
const port = parseInt(process.argv[2] || 8080);

// MongoDB connection URL
const mongoUrl = 'mongodb://mongodb-container:27017/mydb'; // Use the MongoDB container's IP or hostname

http.createServer(async function(req, res) {
  // Initialize a MongoDB client
  const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    // Access the "mycollection" collection
    const collection = client.db('mydb').collection('mycollection');

    // Handle HTTP GET request
    if (req.method === 'GET') {
      // Read data from MongoDB and send it as a JSON response
      const data = await collection.find().toArray();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    }

    // Handle HTTP POST request
    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', async () => {
        // Parse the JSON data from the request
        const newData = JSON.parse(body);

        // Insert the data into MongoDB
        await collection.insertOne(newData);
        
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Data inserted successfully' }));
      });
    }
  } catch (error) {
    console.error('Error:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}).listen(port, host);

console.error('Server listening on ' + host + ':' + port);