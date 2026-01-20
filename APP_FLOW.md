# Luồng Hoạt Động App Nghe Nhạc (Spotify Clone)

## 🎬 Khởi Động Ứng Dụng

```
[1] Start Application
    ↓
[2] Hiển thị Splash Screen (2.5 giây)
    ↓
[3] Kiểm tra trạng thái đăng nhập
    ├─ Nếu đã lưu session → Load user
    └─ Nếu chưa có → Guest Mode
    ↓
[4] Hiển thị Main App (AppShell + Home)
```

## 👤 Guest Mode (Chưa đăng nhập)

### Features có sẵn:
- ✅ **Nghe nhạc**: Chọn và phát nhạc từ home
- ✅ **Tìm kiếm**: Search bài hát
- ✅ **Điều khiển player**: Play/pause, next, previous
- ✅ **Xem thông tin**: Thông tin bài hát, artist

### Badge hiển thị:
```
TopBar: [Guest Mode Badge] | Sign up | Log in
```

### Hành động bị giới hạn (Restricted):
- ❌ **Thả tim** ❤️ → Trigger LoginRequiredModal
- ❌ **Tạo playlist** → Trigger LoginRequiredModal
- ❌ **Lưu bài hát** → Trigger LoginRequiredModal
- ❌ **Xem Library** → Redirect to /login
- ❌ **Xem Profile** → Redirect to /login

## 🔐 Luồng Login / Signup

### Login Flow:
```
[1] Click "Log in" button
    ↓
[2] Redirect → /login
    ↓
[3] Nhập email + password
    - Demo: demo@example.com / demo123
    ↓
[4] Validation:
    ├─ Nếu sai → Hiển thị error message
    └─ Nếu đúng → Lưu session → Redirect to /dashboard
```

### Signup Flow:
```
[1] Click "Sign up" button
    ↓
[2] Redirect → /signup
    ↓
[3] Nhập thông tin: Name, Email, Password
    ↓
[4] Validation:
    ├─ Email chưa tồn tại?
    ├─ Password >= 6 characters?
    └─ Tất cả fields bắt buộc?
    ↓
[5] Tạo account + Auto-login + Redirect to /dashboard
```

## 🎵 Logged-in Mode (Đã đăng nhập)

### Features đầy đủ:
- ✅ **Nghe nhạc** (giống guest)
- ✅ **Thả tim** ❤️ → Lưu vào likedTracks
- ✅ **Tạo playlist** → New playlist
- ✅ **Quản lý bài hát yêu thích** → Xem liked tracks
- ✅ **Quản lý playlist** → Add/remove tracks
- ✅ **Xem profile** → User info

### TopBar - Logged-in:
```
TopBar: [User Avatar + Name] (Click → /profile)
```

## 🎯 Luồng Restricted Actions

### Khi guest cố thực hiện hành động bị giới hạn:

```
User Click "❤️ Like"
    ↓
[Check] isGuest === true?
    ↓ YES
[Show] LoginRequiredModal
    ↓
User chọn:
├─ "Sign In" → Redirect to /login
├─ "Create Account" → Redirect to /signup
└─ "Continue as Guest" → Close modal
```

### LoginRequiredModal:
```
┌─────────────────────────────────┐
│  Sign in to continue             │
│                                  │
│  Enjoy your favorite music and   │
│  create playlists with your acc. │
│                                  │
│  [Sign In Button]                │
│  [Create Account Button]         │
│  [Continue as Guest Button]      │
└─────────────────────────────────┘
```

## 👤 Profile Page

### Logged-in User:
```
[1] Click profile button
    ↓
[2] Redirect to /profile
    ↓
[3] View:
    ├─ Avatar
    ├─ Name
    ├─ Email
    ├─ Member since
    └─ Account ID
    ↓
[4] Actions:
    ├─ Edit Profile → Update name/avatar
    └─ Log Out → setUser(null) → setGuest(true) → Redirect to /login
```

## 📊 Data Flow

### Zustand Store (useAuthStore):
```typescript
{
  // Auth
  user: UserAccount | null
  isGuest: boolean
  isLoading: boolean
  error: string | null

  // Actions
  login(email, password) → bool
  signup(name, email, password) → bool
  logout() → void
  updateProfile(name, avatar) → bool

  // Liked Tracks
  toggleLikeTrack(trackId) → void
  isLiked(trackId) → bool

  // Playlists
  createPlaylist(name, desc) → Playlist
  deletePlaylist(id) → void
  addTrackToPlaylist(playlistId, trackId) → void
  removeTrackFromPlaylist(playlistId, trackId) → void
}
```

### Storage:
```
localStorage: spotify-auth-storage
├─ accounts: UserAccount[]
├─ user: UserAccount | null
├─ isGuest: boolean
└─ likedTracks, playlists (trong user)
```

## 🔄 Complete User Journey

```
┌─────────────────┐
│   Start App     │
└────────┬────────┘
         ↓
┌─────────────────────┐
│  Splash Screen      │
│  (2.5 seconds)      │
└────────┬────────────┘
         ↓
    ┌────────────┐
    │ Check Auth │
    └────┬───────┘
         │
    ┌────┴────────────────┐
    │                     │
   YES                   NO
    │                     │
    ↓                     ↓
┌────────────┐    ┌──────────────┐
│ Load User  │    │  Guest Mode  │
│ (Logged-in)│    │              │
└─────┬──────┘    └──────┬───────┘
      │                  │
      └──────┬───────────┘
             ↓
      ┌───────────────┐
      │  Home Page    │
      │  + AppShell   │
      └───┬───────────┘
          │
      ┌───┴──────────────────────────────────┐
      │ User Actions:                         │
      │ ├─ Play music                        │
      │ ├─ Search                            │
      │ ├─ Try restricted action?            │
      │ └─ Go to profile                     │
      └────┬────────────────────────────────┘
           │
      ┌────┴──────────────┐
      │                   │
   [Restricted]     [Normal]
      │                   │
      ↓                   ↓
┌──────────────┐    ┌───────────┐
│LoginRequired │    │Continue   │
│Modal         │    │Playing    │
└──────┬───────┘    └───────────┘
       │
    ┌──┴──────────────┐
    │                 │
 [Sign In]      [Continue]
    │              as Guest
    ↓
┌─────────────┐
│Login/Signup │
│  Page       │
└─────┬───────┘
      ↓
┌──────────────┐
│Logged-in     │
│Mode + Full   │
│Features      │
└──────┬───────┘
       │
    [Profile]
       │
       ↓
   [Logout]
       │
       ↓
┌──────────────┐
│Back to Guest │
│Mode          │
└──────────────┘
```

## 📝 Summary

| Feature | Guest | Logged-in |
|---------|-------|-----------|
| Play Music | ✅ | ✅ |
| Search | ✅ | ✅ |
| Like Songs | ❌ | ✅ |
| Create Playlists | ❌ | ✅ |
| View Library | ❌ | ✅ |
| User Profile | ❌ | ✅ |
| Persistent Data | ❌ | ✅ |

## 🛠 Implementation Details

### Components:
- `SplashScreen.tsx` - Intro animation
- `LoginRequiredModal.tsx` - Restricted action prompt
- `TrackRow.tsx` - Like button with restriction
- `TopBar.tsx` - Guest Mode badge

### Hooks:
- `useLoginRequired()` - Manage restricted actions

### Store (useAuthStore):
- Guest Mode state
- Like tracks functionality
- Playlist management
- Session persistence

---

**Flow tóm tắt**: Splash → Check Auth → Guest/Logged-in → Actions → Restricted? → LoginModal → Continue/Login → Logout → Guest
