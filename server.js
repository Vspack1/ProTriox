// ProTriox server.js - Node.js + Express + Socket.io
// Server realtime cho phòng học online, quản lý user, chat, join/leave

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());

// Lưu user và phòng học trong RAM (demo, không có database)
let users = {}; // { socketId: { email, name, room } }
let rooms = {}; // { roomId: [user1, user2, ...] }
let credentials = {}; // { email: password } (demo, không mã hóa)

// Đăng ký tài khoản
app.post('/api/register', (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) return res.status(400).json({ error: 'Thiếu thông tin' });
  if (credentials[email]) return res.status(409).json({ error: 'Email đã tồn tại' });
  credentials[email] = password;
  res.json({ success: true });
});

// Đăng nhập
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Thiếu thông tin' });
  if (credentials[email] !== password) return res.status(401).json({ error: 'Sai email hoặc mật khẩu' });
  res.json({ success: true });
});

// Socket.io realtime
io.on('connection', (socket) => {
  // Khi user join phòng
  socket.on('join', ({ email, name, room, roomLimit }) => {
    if (!rooms[room]) rooms[room] = [];
    // Giới hạn số lượng user trong phòng
    if (rooms[room].length >= (roomLimit || 10)) {
      socket.emit('room_full');
      return;
    }
    users[socket.id] = { email, name, room };
    rooms[room].push({ socketId: socket.id, email, name });
    io.to(room).emit('users', rooms[room]);
    socket.join(room);
    socket.to(room).emit('chat', { name: 'System', text: `${name} đã tham gia phòng!`, time: new Date().toLocaleTimeString() });
  });

  // Chat message
  socket.on('chat', ({ room, name, text }) => {
    io.to(room).emit('chat', { name, text, time: new Date().toLocaleTimeString() });
  });

  // Khi user rời phòng hoặc disconnect
  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user && rooms[user.room]) {
      rooms[user.room] = rooms[user.room].filter(u => u.socketId !== socket.id);
      io.to(user.room).emit('users', rooms[user.room]);
      socket.to(user.room).emit('chat', { name: 'System', text: `${user.name} đã rời phòng!`, time: new Date().toLocaleTimeString() });
      delete users[socket.id];
    }
  });
});

// Serve static files (nếu deploy lên Render/Railway)
app.use(express.static('.'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('ProTriox server running on port', PORT);
}); 