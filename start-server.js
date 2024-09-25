const { exec } = require('child_process');
const waitOn = require('wait-on');

// Start the server
const serverProcess = exec('npm run dev');

// Wait for the server to start
waitOn({ resources: ['http://localhost:3000'], timeout: 30000 }) 
  .then(() => {
    console.log('Server is ready');
  })
  .catch(err => {
    console.error('Error waiting for server:', err);
    process.exit(1);
  });

// Handle server errors
serverProcess.stderr.on('data', (data) => {
  console.error(`Server error: ${data}`);
});
