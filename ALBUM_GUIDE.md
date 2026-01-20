# Album & Track Management Guide

## Cấu Trúc Thư Mục

```
public/
├── images/
│   └── albums/
│       ├── chill-vibes.jpg
│       ├── electronic-beats.jpg
│       ├── ambient-nature.jpg
│       └── urban-groove.jpg
└── audio/
    ├── chill-1.mp3
    ├── chill-2.mp3
    ├── electronic-1.mp3
    ├── electronic-2.mp3
    ├── ambient-1.mp3
    ├── ambient-2.mp3
    ├── urban-1.mp3
    └── urban-2.mp3
```

## Cách Thêm Album Mới

Các album được định nghĩa trong file: `src/constants/albums.ts`

### Bước 1: Tạo thư mục và tải file
1. Tạo thư mục `public/images/albums/`
2. Tạo thư mục `public/audio/`
3. Tải ảnh album vào `public/images/albums/`
4. Tải audio file vào `public/audio/`

### Bước 2: Thêm Album vào Constants

Ví dụ thêm album mới:

```typescript
export const NEW_ALBUM_NAME: Album = {
  id: 'album-unique-id',
  title: 'Album Title',
  description: 'Album description',
  genre: 'Genre Name',
  imageUrl: '/images/albums/album-image.jpg',
  tracks: [
    {
      id: '9',
      title: 'Track Title 1',
      artist: 'Artist Name',
      duration: '3:45',
      src: '/audio/track-name-1.mp3',
    },
    {
      id: '10',
      title: 'Track Title 2',
      artist: 'Artist Name',
      duration: '4:12',
      src: '/audio/track-name-2.mp3',
    },
  ],
};
```

### Bước 3: Thêm vào ALBUMS Array

```typescript
export const ALBUMS: Album[] = [
  CHILL_VIBES_ALBUM,
  ELECTRONIC_BEATS_ALBUM,
  AMBIENT_NATURE_ALBUM,
  URBAN_GROOVE_ALBUM,
  NEW_ALBUM_NAME,  // ← Thêm dòng này
];
```

## Cấu Trúc Album Type

```typescript
export interface Album {
  id: string;              // Unique identifier (album-name-format)
  title: string;           // Album title
  description: string;     // Album description/subtitle
  genre: string;          // Music genre (Chill, Electronic, etc.)
  imageUrl: string;       // Path to album cover image
  tracks: Track[];        // Array of tracks in album
}

export interface Track {
  id: string;             // Unique track ID
  title: string;          // Track name
  artist: string;         // Artist name
  duration: string;       // Duration (mm:ss format)
  src: string;           // Path to audio file
  imageUrl?: string;      // Optional individual track image
}
```

## Features Theo Auth State

### Guest Mode (Chưa Đăng Nhập)
✅ Xem các album
✅ Phát nhạc từ album
✅ Xem danh sách track trong album
❌ Yêu thích bài hát (Like)
❌ Tạo playlist
❌ Lưu album

### Logged In Mode
✅ Tất cả tính năng của Guest
✅ Yêu thích bài hát (Like)
✅ Tạo playlist
✅ Lưu album
✅ Tùy chỉnh profile
✅ Quản lý saved items

## File Structure

```
src/
├── constants/
│   └── albums.ts              # Album & Playlist data
├── types/
│   └── index.ts               # Type definitions (Album, Track, etc.)
├── components/
│   └── ui/
│       ├── AlbumCard.tsx       # Album card component
│       ├── Card.tsx            # Playlist card component
│       └── ...
├── app/
│   ├── page.tsx                # Home page (visible to all)
│   ├── dashboard/
│   │   └── page.tsx            # Dashboard (logged-in users)
│   └── album/
│       └── [id]/
│           └── page.tsx        # Album detail page
```

## Naming Convention

**Album IDs**: `album-kebab-case` (e.g., `album-chill-vibes`)
**Track IDs**: Simple numbers incrementing (e.g., '1', '2', '3')
**Audio files**: `kebab-case.mp3` (e.g., `chill-vibes-track-1.mp3`)
**Image files**: `kebab-case.jpg` (e.g., `chill-vibes.jpg`)

## URL Patterns

- Home page: `/`
- Album detail: `/album/unique-id`
- Dashboard (logged in): `/dashboard`
- Profile: `/profile`
- Playlist: `/playlist/[id]`

## Best Practices

1. **Image Optimization**
   - Kích thước album cover: 300x300px hoặc 500x500px
   - Format: JPG hoặc PNG
   - File size: < 200KB

2. **Audio Files**
   - Format: MP3
   - Bitrate: 128-320 kbps
   - File size: 3-10MB per song

3. **Metadata**
   - Độ dài track: Chính xác ở format mm:ss
   - Track IDs: Unique và không thay đổi
   - Album IDs: Không thay đổi để duy trì links

## Thêm Logo/Icon

Bạn có thể thêm custom gradient hoặc emoji nếu không có ảnh:

```typescript
// Cách 1: Sử dụng emoji
imageUrl: 'emoji:🎵',

// Cách 2: Sử dụng gradient (fallback trong component)
// Component tự động hiển thị gradient nếu image không có
```

## Troubleshooting

**Ảnh không hiển thị?**
- Kiểm tra đường dẫn file
- Đảm bảo file tồn tại trong `public/images/albums/`
- Rebuild project: `npm run build`

**Audio không phát?**
- Kiểm tra đường dẫn trong `src`
- Đảm bảo file tồn tại trong `public/audio/`
- Kiểm tra format file (phải là .mp3)

**Build lỗi?**
- Xóa `.next` folder: `rm -r .next`
- Cài lại dependencies: `npm install`
- Build lại: `npm run build`
