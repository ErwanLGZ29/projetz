const { exec } = require('child_process');
const waitOn = require('wait-on');

// Démarrez le serveur
const serverProcess = exec('npm run dev'); // Remplacez par votre commande

// Attendez que le serveur soit opérationnel
waitOn({ resources: ['http://localhost:3000'], timeout: 30000 }) // Modifiez le port si nécessaire
  .then(() => {
    console.log('Server is ready');
  })
  .catch(err => {
    console.error('Error waiting for server:', err);
    process.exit(1);
  });

// Écoutez les erreurs du processus serveur
serverProcess.stderr.on('data', (data) => {
  console.error(`Server error: ${data}`);
});
