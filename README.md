# ZenLITS (ＬＩＴＳ)

> **Calm, meditative Japanese LITS (Tetromino Architecture) logic puzzle with procedural acoustics.**

[![CI](https://github.com/OfferPk/zenlits/actions/workflows/ci.yml/badge.svg)](https://github.com/OfferPk/zenlits/actions/workflows/ci.yml)
[![Pages](https://github.com/OfferPk/zenlits/actions/workflows/pages.yml/badge.svg)](https://github.com/OfferPk/zenlits/actions/workflows/pages.yml)
[![Android](https://github.com/OfferPk/zenlits/actions/workflows/android.yml/badge.svg)](https://github.com/OfferPk/zenlits/actions/workflows/android.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🎮 Play Live
- **Web App / PWA**: [https://offerpk.github.io/zenlits/](https://offerpk.github.io/zenlits/)
- **Android APK**: Download `zenlits-apk` from [GitHub Actions Artifacts](https://github.com/OfferPk/zenlits/actions/workflows/android.yml) or latest [Releases](https://github.com/OfferPk/zenlits/releases).

---

## 📸 Screenshots

| Japanese Timber Layout | Real-Time Tetromino Detection | Master Temple Floor Plans |
|:---:|:---:|:---:|
| *(Chamber partition grids)* | *(Live L, I, T, S classification)* | *(50 levels across 5 difficulty packs)* |

---

## 🌸 About the Game

ZenLITS is inspired by the classic Japanese pencil-and-paper puzzle **LITS** (ＬＩＴＳ / Nuruomino), popularized by Nikoli.

You craft harmonious timber joinery (*Kigumi* 木組み) across temple floor plans by placing exactly one 4-block tetromino into each outlined chamber:
1. **One Tetromino Per Chamber**: The temple grid is partitioned into rooms. Each room must contain exactly 4 shaded timber blocks forming a valid tetromino.
2. **Valid Shapes (L, I, T, S)**: The 4 blocks must form an **L**, **I**, **T**, or **S** shape (rotations and reflections allowed). Solid 2×2 "O" blocks are strictly prohibited.
3. **No Touching Identical Shapes**: If two tetrominoes in adjacent rooms touch orthogonally (sharing an edge), they **cannot be of the same type** (e.g. an L tetromino cannot touch another L tetromino; diagonal contact is allowed).
4. **No 2×2 Solid Squares**: Shaded blocks cannot form a 2×2 square anywhere across the temple floor plan.
5. **Single Connected Network**: All shaded blocks across the entire temple must connect into a single continuous orthogonal structure.

---

## ✨ Features

- **50 Handcrafted Levels**: 5 difficulty tiers (Engawa 6×6, Shoji 7×7, Tatami 8×8, Tokonoma 9×9, Daitokuji 10×10).
- **100% Unique Solutions**: Every single level has been verified by the built-in constraint solver.
- **Procedural Japanese Web Audio**:
  - Hinoki wood planing and chisel tap resonances.
  - Tactile sumi ink stone clicks.
  - Soft bamboo ticks when marking confirmed unshaded floor dots.
  - Harmonic Koto chords when chamber tetrominoes are validated without conflicts.
  - Resonant Japanese Buddhist temple victory bell (*Bonshō* 梵鐘) tuned to the sacred 108 Hz fundamental upon level completion.
- **Fluid Controls**:
  - Tap or drag across cells to place shaded blocks or dots smoothly.
  - Dedicated tool modes: Cycle (🔄), Shaded (●), and Dot (·).
  - Real-time tetromino classifier displaying kanji glyphs (L, I, T, S).
  - Visual 2×2 square warning and identical shape contact alerts.
- **Deductive Hint Engine**: Step-by-step logic guidance highlighting forced chamber blocks, remaining capacity, and 2×2 avoidance.
- **Unlimited Undo & Reset**: Experiment freely with full state history.
- **Offline & Private**: Built as a zero-dependency Progressive Web App (PWA) with Service Worker and Capacitor Android packaging. Zero ads, zero trackers, no permissions needed.

---

## 🛠️ Development & Build

### Prerequisites
- Node.js 18+ (tested on Node 22 & 24)
- npm

### Install Dependencies
```bash
npm ci
```

### Run Unit Tests
```bash
npm test
```

### Build Web Assets
```bash
npm run build
```
Generates production assets in `www/`.

### Android Build (Capacitor)
```bash
npx cap add android
npx cap sync android
cd android && ./gradlew assembleDebug
```

---

## 📄 License
MIT License. Created by OfferPk.
