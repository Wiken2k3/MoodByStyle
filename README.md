# MoodByStyle 🎵

**MoodByStyle** là một ứng dụng nghe nhạc trực tuyến hiện đại, được xây dựng với giao diện lấy cảm hứng từ Spotify, sử dụng sức mạnh của **Next.js 14**, **TypeScript** và **Tailwind CSS**. Dự án tập trung vào trải nghiệm người dùng mượt mà, giao diện đẹp mắt (Glassmorphism) và khả năng tương thích đa nền tảng.

## ✨ Tính Năng Nổi Bật

### 🎧 Trình Phát Nhạc (Music Player)
- **Điều khiển toàn diện**: Play, Pause, Next, Previous.
- **Chế độ phát**: Shuffle (Trộn bài), Repeat (Lặp lại 1 bài/tất cả).
- **Thanh tiến trình**: Kéo thả để tua nhạc (Seek) mượt mà.
- **Âm lượng**: Điều chỉnh âm lượng trực quan.
- **Queue System**: Xem và quản lý danh sách bài hát đang chờ phát (Right Sidebar).

### 👤 Quản Lý Người Dùng & Phân Quyền
- **Guest Mode**: Cho phép trải nghiệm nghe nhạc, tìm kiếm mà không cần đăng nhập.
- **User Mode**: Đăng nhập để mở khóa các tính năng cá nhân hóa.
- **Restricted Actions**: Hệ thống tự động nhắc nhở đăng nhập khi khách thực hiện các hành động như "Thả tim", "Tạo Playlist".
- **Profile**: Trang cá nhân hiển thị thông tin người dùng và các playlist công khai.

### 📱 Giao Diện & UX
- **Responsive Design**: Tương thích hoàn hảo trên Desktop, Tablet và Mobile.
- **Mobile Navigation**: Thanh điều hướng tối ưu cho thiết bị di động.
- **Animations**: Hiệu ứng chuyển cảnh, loading (Splash Screen), và tương tác mượt mà.
- **Search**: Tìm kiếm bài hát và nghệ sĩ theo thời gian thực.
- **Library**: Quản lý bài hát yêu thích và playlist cá nhân.

## 🛠️ Công Nghệ Sử Dụng

- **Core**: [Next.js 14](https://nextjs.org/) (App Router), [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (Quản lý Auth & Player state)
- **Fonts**: [Geist](https://vercel.com/font)

## 🚀 Cài Đặt & Chạy Dự Án

Làm theo các bước sau để chạy dự án trên máy local của bạn:

### 1. Clone Repository
```bash
git clone https://github.com/username/moodbystyle.git
cd moodbystyle
```

### 2. Cài Đặt Dependencies
```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

### 3. Cấu Hình Dữ Liệu (Tùy chọn)
Dự án sử dụng file tĩnh cho nhạc và ảnh.
- Tham khảo file `ALBUM_GUIDE.md` trong thư mục gốc để biết cách thêm album và bài hát mới vào thư mục `public/`.
- Dữ liệu mẫu được cấu hình tại `src/constants/albums.ts`.

### 4. Chạy Server Development
```bash
npm run dev
```

Mở trình duyệt và truy cập http://localhost:3000.

## 📂 Cấu Trúc Thư Mục

```
src/
├── app/                 # Next.js App Router pages (Home, Search, Library...)
├── components/          # React components
│   ├── home/            # Components cho trang chủ (Header, Sections)
│   ├── layout/          # Layout chính (Sidebar, TopBar, PlayerBar...)
│   ├── player/          # Các thành phần của trình phát nhạc & Queue
│   ├── ui/              # Reusable UI components (Card, Button...)
│   └── modals/          # Các modal (LoginRequired...)
├── constants/           # Dữ liệu tĩnh (Albums, Tracks mock data)
├── store/               # Zustand stores (useAuthStore, usePlayerStore)
└── types/               # TypeScript definitions
public/
├── audio/               # Files nhạc (.mp3)
└── images/              # Ảnh albums, avatars
```

## 🤝 Đóng Góp (Contributing)

Mọi đóng góp đều được hoan nghênh! Nếu bạn muốn cải thiện dự án:

1. Fork dự án.
2. Tạo branch tính năng mới (`git checkout -b feature/AmazingFeature`).
3. Commit thay đổi của bạn (`git commit -m 'Add some AmazingFeature'`).
4. Push lên branch (`git push origin feature/AmazingFeature`).
5. Mở một Pull Request.

---
*Được phát triển bởi MoodByStyle Team*
