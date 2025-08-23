# Animation State Migration - Documentation

## Overview

Migration dari local state management ke global state management menggunakan Zustand store untuk mengontrol state `isAnimating` secara global.

## Changes Made

### 1. Updated `heroAnimationStore.ts`

- **Added new interface properties:**

  - `isAnimating: boolean` - Global animation state flag
  - `setIsAnimating: (value: boolean) => void` - Setter untuk isAnimating
  - `startAnimation: (pathname: string) => () => void` - Method untuk start animation dengan cleanup

- **Added implementation:**
  - Default `isAnimating: false`
  - `setIsAnimating` setter method
  - `startAnimation` method yang mengembalikan cleanup function
  - Updated `resetAnimations` untuk reset `isAnimating`

### 2. Updated `Navbar.tsx`

- **Removed:**
  - Local `useState` untuk `isAnimating`
  - Local `useEffect` dengan timeout logic
- **Added:**
  - Import `useHeroAnimationStore` hook
  - Menggunakan `isAnimating` dan `startAnimation` dari store
  - Cleanup function dari `startAnimation` di useEffect

### 3. Updated `Tab.tsx`

- **Added:**
  - Import `useHeroAnimationStore` hook
  - Menggunakan global `isAnimating` state
  - Conditional `pointer-events` berdasarkan `isAnimating`

## Benefits

1. **Global Accessibility**: State `isAnimating` sekarang dapat diakses dari komponen manapun
2. **Centralized Logic**: Semua logika animation timing dipusatkan di store
3. **Consistent Behavior**: Semua komponen menggunakan state yang sama untuk mengontrol interaksi
4. **Better Cleanup**: Automatic cleanup dengan return function dari `startAnimation`

## Usage in Other Components

Untuk menggunakan global animation state di komponen lain:

```tsx
import { useHeroAnimationStore } from "../store/heroAnimationStore";

function MyComponent() {
  const { isAnimating } = useHeroAnimationStore();

  return (
    <div
      className={`${
        isAnimating ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      {/* Component content */}
    </div>
  );
}
```

## Notes

- `StaggeredDropDown.tsx` tetap menggunakan local `isAnimating` karena mengontrol animasi dropdown yang berbeda
- State global hanya untuk hero animation timing, bukan untuk semua jenis animasi
- Cleanup otomatis mencegah memory leaks saat component unmount atau pathname berubah
