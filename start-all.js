// Starts the common server and both interfaces at once (one process each).
const { spawn } = require('child_process');
const path = require('path');

const procs = ['server/server.js', 'seller/server.js', 'consumer/server.js'].map((f) =>
  spawn(process.execPath, [path.join(__dirname, f)], { stdio: 'inherit', env: process.env })
);

const stop = () => procs.forEach((p) => p.kill());
procs.forEach((p) => p.on('exit', (code) => { if (code) { console.error('A process exited with code', code); stop(); process.exit(code); } }));
process.on('SIGINT', () => { stop(); process.exit(0); });
process.on('SIGTERM', () => { stop(); process.exit(0); });
