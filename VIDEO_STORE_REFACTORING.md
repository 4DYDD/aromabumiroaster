# Video Store Refactoring - Documentation

## Overview

Refactoring video state management dari global variables ke dedicated Zustand store untuk konsistensi arsitektur dan kemudahan maintenance.

## Changes Made

### 1. **Created New Video Store** - `app/store/videoStore.ts`

#### Core State Interface:

```typescript
interface VideoState {
  isLoaded: boolean; // Video sudah dimuat dan siap diputar
  isPlaying: boolean; // Video sedang diputar
  loadingError: string | null; // Error loading jika ada
  setLoaded: (value: boolean) => void;
  setPlaying: (value: boolean) => void;
  setError: (error: string | null) => void;
  resetVideo: () => void; // Reset semua state
}
```

#### Convenience Hooks:

```typescript
export const useVideoLoaded = () => useVideoStore((state) => state.isLoaded);
export const useVideoPlaying = () => useVideoStore((state) => state.isPlaying);
export const useVideoError = () => useVideoStore((state) => state.loadingError);
```

### 2. **Updated HeroSection** - Removed Global Variables

#### Before (Global Variables):

```typescript
// ❌ Global state dengan callbacks manual
let globalVideoLoaded = false;
let videoLoadedCallbacks: (() => void)[] = [];

const setGlobalVideoLoaded = () => {
  globalVideoLoaded = true;
  videoLoadedCallbacks.forEach((callback) => callback());
  videoLoadedCallbacks = [];
};

export const useVideoLoaded = () => {
  const [loaded, setLoaded] = useState(globalVideoLoaded);
  // Manual callback management...
};
```

#### After (Zustand Store):

```typescript
// ✅ Clean store integration
import { useVideoStore } from "../../store/videoStore";

const {
  setLoaded: setVideoLoaded,
  setPlaying: setVideoPlaying,
  setError: setVideoError,
} = useVideoStore();
```

#### Enhanced Video Handler:

```typescript
const handleVideoReady = async () => {
  if (videoRef.current) {
    try {
      // Set playback rate untuk mempercepat video (1.3x speed)
      videoRef.current.playbackRate = 1.3;

      // Tunggu video siap, lalu play
      await videoRef.current.play();

      // Update video state di store
      setVideoLoaded(true);
      setVideoPlaying(true);
    } catch (error) {
      console.log("Auto-play prevented by browser:", error);

      // Graceful fallback
      setVideoLoaded(true);
      setVideoError("Auto-play prevented");
    }
  }
};
```

### 3. **Updated page.tsx** - Simplified Import

#### Before:

```typescript
import HeroSection, { useVideoLoaded } from "./components/HeroSection";
// ❌ Hook exported dari component
```

#### After:

```typescript
import { useVideoLoaded } from "./store/videoStore";
// ✅ Hook dari dedicated store
```

## Architecture Benefits

### 1. **Separation of Concerns**

- **HeroSection**: Fokus pada video rendering dan playback
- **VideoStore**: Dedicated state management untuk video
- **page.tsx**: Clean consumption dari store

### 2. **Consistent Pattern**

```
app/store/
├── heroAnimationStore.ts  # Animation state management
├── cartStore.ts          # Shopping cart state
└── videoStore.ts         # Video state management ✅
```

### 3. **Better Maintainability**

- State logic terpusat di store
- No manual callback management
- Type-safe dengan TypeScript
- Easy testing dan debugging

### 4. **Improved Developer Experience**

```typescript
// Multiple ways to access video state:

// Full store access
const videoStore = useVideoStore();

// Specific state access
const videoLoaded = useVideoLoaded();
const videoPlaying = useVideoPlaying();
const videoError = useVideoError();

// Actions
const { setLoaded, setPlaying, setError, resetVideo } = useVideoStore();
```

## Store API Reference

### State Properties:

- `isLoaded: boolean` - Video ready to play without buffering
- `isPlaying: boolean` - Video currently playing
- `loadingError: string | null` - Any loading errors

### Actions:

- `setLoaded(value: boolean)` - Set video loaded state
- `setPlaying(value: boolean)` - Set video playing state
- `setError(error: string | null)` - Set loading error
- `resetVideo()` - Reset all states to initial values

### Convenience Hooks:

- `useVideoLoaded()` - Returns just isLoaded boolean
- `useVideoPlaying()` - Returns just isPlaying boolean
- `useVideoError()` - Returns just loadingError string

## Usage Examples

### Basic Usage:

```typescript
import { useVideoLoaded } from "./store/videoStore";

function MyComponent() {
  const videoLoaded = useVideoLoaded();

  return <div>{videoLoaded ? <Content /> : <Loading />}</div>;
}
```

### Advanced Usage:

```typescript
import { useVideoStore } from "./store/videoStore";

function VideoControls() {
  const { isLoaded, isPlaying, loadingError, setPlaying, resetVideo } =
    useVideoStore();

  return (
    <div>
      {loadingError && <ErrorMessage error={loadingError} />}
      {isLoaded && (
        <button onClick={() => setPlaying(!isPlaying)}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      )}
      <button onClick={resetVideo}>Reset</button>
    </div>
  );
}
```

### Error Handling:

```typescript
import { useVideoError } from "./store/videoStore";

function VideoErrorHandler() {
  const error = useVideoError();

  if (error) {
    return <div className="error">Video Error: {error}</div>;
  }

  return null;
}
```

## Migration Guide

For existing components using video state:

1. **Remove** global variable imports
2. **Import** from video store: `import { useVideoLoaded } from "./store/videoStore"`
3. **Replace** manual state management with store hooks
4. **Use** convenience hooks for simple use cases
5. **Use** full store for complex interactions

## Performance Impact

- **Positive**: No manual callback management overhead
- **Positive**: Optimized re-renders with Zustand selectors
- **Positive**: Better memory management (no global variables)
- **Positive**: Type-safe operations prevent runtime errors

## Future Enhancements

Potential additions to video store:

1. **Video Progress**: Track playback progress
2. **Quality Settings**: Manage video quality preferences
3. **Multiple Videos**: Support for multiple video instances
4. **Caching**: Video metadata caching
5. **Analytics**: Video interaction tracking
