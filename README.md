# ProTriox – Website học online realtime (Node.js + Socket.io)

## 📝 Giới thiệu
ProTriox là dự án lớp học online mô phỏng Zoom/Google Meet, xây dựng bằng HTML, CSS, JavaScript, jQuery và Node.js + Socket.io. Hỗ trợ đăng nhập email/password, chat, danh sách người tham gia realtime.

---

## 🚀 Hướng dẫn chạy local
1. Cài Node.js (>=16)
2. Cài dependencies:
   ```bash
   cd ProTriox
   npm install express socket.io cors
   ```
3. Chạy server:
   ```bash
   node server.js
   ```
4. Mở trình duyệt: http://localhost:3000/index.html

---

## 🌐 Deploy lên Render/Railway
- Tạo tài khoản [Render](https://render.com/) hoặc [Railway](https://railway.app/)
- Tạo project mới, upload toàn bộ thư mục ProTriox
- Chọn file start là `server.js`
- Sau khi deploy, truy cập link public để sử dụng

---

## 🔑 Đăng nhập & sử dụng
- Đăng ký tài khoản (email, password, tên)
- Đăng nhập để vào phòng học
- Danh sách người tham gia và chat realtime giữa các user thật
- Có thể mở nhiều tab/trình duyệt để test nhiều user

---

## 💡 Lưu ý
- Demo lưu user trong RAM, không có database thật (deploy production cần bổ sung database)
- Có thể mở rộng thêm: video call thật, whiteboard, upload file...

---

## 📚 Tài liệu tham khảo
- [Socket.io Docs](https://socket.io/docs/)
- [Express.js](https://expressjs.com/)
- [Render Deploy Guide](https://render.com/docs/deploy-node-express-app)

---

> **Tác giả:** [Quang] – 2025 #