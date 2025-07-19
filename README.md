# ProTriox – Website học online realtime (Node.js + Socket.io)

## 📝 Giới thiệu
ProTriox là dự án lớp học online mô phỏng Zoom/Google Meet, xây dựng bằng HTML, CSS, JavaScript, jQuery và Node.js + Socket.io. Hỗ trợ đăng nhập email/password hoặc ẩn danh, tạo/join phòng học với tên và số lượng tùy chọn, chat, danh sách người tham gia realtime, responsive UI.

---

## 🚀 Cấu trúc file
```
ProTriox/
├── index.html      # Giao diện chính, chỉ chứa HTML
├── style.css       # Toàn bộ CSS, responsive, mobile friendly
├── script.js       # Toàn bộ logic JS/jQuery
├── server.js       # Node.js + Express + Socket.io backend
├── package.json    # Thông tin project, dependencies
└── README.md       # Hướng dẫn sử dụng
```

---

## 🌟 Tính năng mới
- Không còn user giả lập (Alice, Bob)
- Tạo phòng/lớp với tên tùy ý, chọn số lượng tối đa (5–200)
- Join phòng bằng email/password hoặc ẩn danh
- Responsive UI cho mobile/tablet/desktop
- Danh sách thành viên và chat realtime chỉ hiển thị user thật
- Giới hạn số lượng user trong phòng

---

## 🚀 Hướng dẫn sử dụng
1. **Chạy local:**
   ```bash
   cd ProTriox
   npm install
   node server.js
   ```
   Truy cập: http://localhost:3000/index.html
2. **Deploy Render:**
   - Đảm bảo repo có đủ file như trên
   - Root Directory: ProTriox (nếu code nằm trong thư mục này)
   - Build Command: npm install
   - Start Command: npm start
   - Truy cập link public sau khi deploy

---

## 🔑 Đăng nhập & tạo phòng
- Nhập email, password, tên, **tên phòng/lớp** (vd: math12A), **số lượng tối đa** (5–200)
- Hoặc bấm "Đăng nhập ẩn danh" để test nhanh
- Nếu phòng chưa tồn tại sẽ tự tạo mới, nếu đã đủ số lượng sẽ báo lỗi
- Có thể mở nhiều tab, tạo/join nhiều phòng khác nhau để test

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

> **Tác giả:** [Quang] – 2025