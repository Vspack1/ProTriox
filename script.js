// ProTriox script.js - Logic chính cho lớp học online

$(function() {
  // ====== Biến toàn cục ======
  let socket, user = {}, room = '', roomLimit = 10;
  let localStream, screenStream;

  // ====== Hàm show/hide page ======
  function showLogin() { $('#loginPage').show(); $('#mainPage').hide(); }
  function showMain() { $('#loginPage').hide(); $('#mainPage').show(); }

  // ====== Đăng ký tài khoản ======
  $('#btnRegister').click(function() {
    const email = $('#loginEmail').val().trim();
    const password = $('#loginPassword').val().trim();
    const name = $('#loginName').val().trim();
    room = $('#roomName').val().trim();
    roomLimit = parseInt($('#roomLimit').val());
    if (!email || !password || !name || !room) return $('#loginError').text('Vui lòng nhập đủ thông tin!');
    $.post('/api/register', { email, password, name }, function(res) {
      $('#loginError').css('color','#0a84ff').text('Đăng ký thành công! Đăng nhập ngay.');
    }).fail(function(xhr) {
      $('#loginError').css('color','#e0245e').text(xhr.responseJSON?.error||'Lỗi đăng ký');
    });
  });

  // ====== Đăng nhập ======
  $('#btnLogin').click(function() {
    const email = $('#loginEmail').val().trim();
    const password = $('#loginPassword').val().trim();
    const name = $('#loginName').val().trim();
    room = $('#roomName').val().trim();
    roomLimit = parseInt($('#roomLimit').val());
    if (!email || !password || !name || !room) return $('#loginError').text('Vui lòng nhập đủ thông tin!');
    $.post('/api/login', { email, password }, function(res) {
      user = { email, name };
      connectSocket();
      showMain();
    }).fail(function(xhr) {
      $('#loginError').css('color','#e0245e').text(xhr.responseJSON?.error||'Lỗi đăng nhập');
    });
  });

  // ====== Đăng nhập ẩn danh ======
  $('#btnAnon').click(function() {
    room = $('#roomName').val().trim();
    roomLimit = parseInt($('#roomLimit').val());
    if (!room) return $('#loginError').text('Vui lòng nhập tên phòng/lớp!');
    const rand = Math.floor(Math.random()*9000)+1000;
    user = {
      email: `anon${rand}@protriox.dev`,
      name: `Anonymous${rand}`
    };
    connectSocket();
    showMain();
  });

  // ====== Kết nối Socket.io ======
  function connectSocket() {
    socket = io();
    // Khi join phòng
    socket.emit('join', { email: user.email, name: user.name, room, roomLimit });
    // Nhận danh sách user thật
    socket.on('users', function(users) {
      $('#participants').html(users.map(u => `<div class='participant-item'><img src='https://i.pravatar.cc/100?u=${u.email}'> ${u.name}${u.email===user.email?' (Bạn)':''}</div>`).join(''));
    });
    // Nhận chat realtime
    socket.on('chat', function(msg) {
      $('#chatMessages').append(`
        <div class="chat-item">
          <img src="https://i.pravatar.cc/100?u=${msg.name}">
          <div class="chat-meta">${msg.name} · ${msg.time}</div>
          <div class="chat-msg">${msg.text}</div>
        </div>`);
      $('#chatMessages').scrollTop($('#chatMessages')[0].scrollHeight);
    });
    // Thông báo nếu phòng đầy
    socket.on('room_full', function() {
      alert('Phòng đã đủ số lượng tối đa!');
      socket.disconnect();
      showLogin();
    });
  }

  // ====== Gửi chat ======
  $('#sendBtn').click(function() {
    const text = $('#chatBox').val().trim();
    if (text && socket) {
      socket.emit('chat', { room, name: user.name, text });
      $('#chatBox').val('');
    }
  });
  $('#chatBox').keydown(function(e) { if (e.key==='Enter') $('#sendBtn').click(); });

  // ====== Chuyển tab sidebar ======
  $('.tab').click(function() {
    $('.tab').removeClass('active');
    $('.tab-content').hide();
    $(this).addClass('active');
    $('#' + $(this).data('panel')).show();
  });
  $('#participants').show();

  // ====== Điều khiển mic/cam/share (giữ nguyên logic cũ) ======
  let micOn = true, camOn = true;
  $('#btnMic').click(function() {
    micOn = !micOn;
    if (localStream) localStream.getAudioTracks().forEach(t => t.enabled = micOn);
    $(this).toggleClass('on', micOn);
  });
  $('#btnCam').click(function() {
    camOn = !camOn;
    if (localStream) localStream.getVideoTracks().forEach(t => t.enabled = camOn);
    $(this).toggleClass('on', camOn);
  });
  $('#btnShare').click(async function() {
    if (screenStream) { // Dừng chia sẻ
      screenStream.getTracks().forEach(t => t.stop());
      screenStream = null;
      $(this).removeClass('on');
      return;
    }
    try {
      screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      createTile(screenStream, 'Screen');
      $(this).addClass('on');
      screenStream.getVideoTracks()[0].onended = () => $('#btnShare').click();
    } catch(e) {
      alert('Từ chối chia sẻ màn hình');
    }
  });

  // ====== Rời phòng ======
  $('#btnLeave').click(function() {
    if (socket) socket.disconnect();
    showLogin();
  });

  // ====== Hàm tạo video tile (giữ nguyên logic cũ) ======
  function createTile(stream, label) {
    const tile = $('<div class="video-tile"></div>');
    const video = $('<video autoplay playsinline></video>');
    video[0].srcObject = stream;
    if (label === user.name) video[0].muted = true;
    tile.append(video);
    tile.append(`<span class="label">${label}</span>`);
    $('#videoGrid').append(tile);
  }
}); 