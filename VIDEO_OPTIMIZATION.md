# Video Performance Optimization - Documentation

## Overview

Implementasi optimasi untuk video 4K agar menghindari frame drop dengan menunda rendering konten hingga video selesai dimuat dan mempercepat playback video.

## Changes Made

### 1. **HeroSection/index.tsx** - Video Loading State Management

#### Added Global Video Loading State:

```tsx
// Global state untuk video loading - accessible dari komponen lain
let globalVideoLoaded = false;
let videoLoadedCallbacks: (() => void)[] = [];

const setGlobalVideoLoaded = () => {
  globalVideoLoaded = true;
  videoLoadedCallbacks.forEach((callback) => callback());
  videoLoadedCallbacks = [];
};

export const useVideoLoaded = () => {
  // Hook untuk mengakses video loading state dari komponen lain
};
```

#### Enhanced Video Configuration:

- **Faster Playback**: `playbackRate = 1.3` (30% faster)
- **Better Loading Events**:
  - `onCanPlayThrough` - dipanggil setelah video bisa diputar tanpa buffering
  - `onLoadStart` - tracking awal loading
  - `onError` - error handling dengan graceful fallback

#### Optimized Video Loading Sequence:

```tsx
const handleVideoReady = async () => {
  if (videoRef.current) {
    try {
      // Set playback rate untuk mempercepat video (1.3x speed)
      videoRef.current.playbackRate = 1.3;

      // Tunggu video siap, lalu play
      await videoRef.current.play();

      // Set video sebagai loaded secara global
      if (!globalVideoLoaded) {
        setGlobalVideoLoaded();
        setVideoLoaded(true);
      }
    } catch (error) {
      // Graceful fallback jika auto-play gagal
      if (!globalVideoLoaded) {
        setGlobalVideoLoaded();
        setVideoLoaded(true);
      }
    }
  }
};
```

### 2. **page.tsx** - Conditional Rendering Strategy

#### Loading Screen:

```tsx
{
  !videoLoaded && (
    <div className="fixed inset-0 z-[1000] bg-primary flexcc">
      <motion.div className="text-secondary/80 flexcc flex-col gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-8 h-8 border-2 border-secondary/30 border-t-secondary/80 rounded-full"
        />
        <p className="text-sm font-medium">Loading 4K Video...</p>
      </motion.div>
    </div>
  );
}
```

#### Conditional Content Rendering:

- **HeroSection**: Selalu dirender untuk mulai loading video
- **Featured Products Section**: Hanya render setelah `videoLoaded === true`
- **Footer**: Render dengan delay setelah video loaded

```tsx
{
  videoLoaded && (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full py-20 bg-primary_dark"
    >
      {/* Content */}
    </motion.section>
  );
}
```

## Performance Benefits

### 1. **No Frame Drops**

- Konten halaman tidak di-render bersamaan dengan video loading
- Video mendapat prioritas resources untuk decoding 4K
- UI rendering ditunda hingga video ready

### 2. **Faster Video Experience**

- Video diputar 30% lebih cepat (`playbackRate: 1.3`)
- Lebih dinamis dan engaging
- Durasi loading yang dirasakan user lebih pendek

### 3. **Better User Experience**

- Loading indicator yang informatif
- Smooth transition setelah video ready
- Graceful error handling jika video gagal dimuat

### 4. **Resource Optimization**

- Video loading tidak compete dengan DOM rendering
- Memory allocation lebih optimal
- Browser dapat fokus pada video decoding

## Technical Implementation

### Event Sequence:

1. **onLoadStart**: Video mulai dimuat
2. **onCanPlayThrough**: Video siap diputar tanpa buffering
3. **handleVideoReady**: Set playback rate dan play video
4. **setGlobalVideoLoaded**: Update global state
5. **page.tsx re-render**: Render konten lain dengan animasi

### Error Handling:

- Auto-play prevention: Graceful fallback tetap set video sebagai loaded
- Video loading errors: Fallback ke loaded state agar UI tidak stuck
- Network issues: Timeout handling dan user feedback

## Browser Compatibility

- **Modern Browsers**: Full support untuk `playbackRate` dan `onCanPlayThrough`
- **Safari**: Optimal dengan `playsInline` untuk mobile
- **Chrome**: Best performance dengan hardware acceleration
- **Firefox**: Good compatibility dengan fallback handling

## Performance Monitoring

### Console Logs:

- "Video loading started..." - Tracking awal loading
- "Video loading error:" - Error monitoring
- "Auto-play prevented by browser:" - Auto-play issues

### Metrics to Monitor:

- Time to video ready
- Frame drop frequency
- Loading completion rate
- User interaction delays

## Future Improvements

1. **Adaptive Quality**: Load different video qualities based on connection
2. **Preload Optimization**: Smart preloading based on user behavior
3. **Background Loading**: Load video on previous pages
4. **Progressive Enhancement**: Fallback images untuk slow connections

## Usage

Video loading state dapat digunakan di komponen lain:

```tsx
import { useVideoLoaded } from "./components/HeroSection";

function MyComponent() {
  const videoLoaded = useVideoLoaded();

  return (
    <div>
      {videoLoaded ? (
        <div>Content after video loaded</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
```
