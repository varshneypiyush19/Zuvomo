# 📱 ShopFlow — React Native Public API Explorer

[![React Native](https://img.shields.io/badge/React%20Native-0.88-blue.svg?logo=react)](https://reactnative.dev)
[![Expo](https://img.shields.io/badge/Expo-SDK%2058-black.svg?logo=expo)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript)](https://www.typescriptlang.org)
[![API](https://img.shields.io/badge/API-DummyJSON%20Products-00C7B7.svg)](https://dummyjson.com/products)

A modern, fluid React Native application built with **Expo**, **TypeScript**, and **React Navigation**. The app showcases live product data from the public [DummyJSON API](https://dummyjson.com), complete with responsive search, category filtering, a detailed product view with image carousel, customer reviews, specs, and resilient loading, error, and pull-to-refresh states.

---

## ✨ Features & Rubric Checklist

### 1. 📋 List Screen
- **Public API Integration**: Fetches real-time catalog items from `https://dummyjson.com/products`.
- **Search & Filter**: Real-time debounced search bar and horizontal category chips (All, Beauty, Fragrances, Furniture, Groceries, Laptops, Smartphones, etc.).
- **Product Cards**: Displays product thumbnail, category tag, star rating, title, brand, discounted price pill, and real-time stock indicator.
- **Infinite Scroll / Pagination**: Automatically loads the next page of items as the user scrolls (`onEndReached`).

### 2. 🔍 Detail Screen (Shown on Tap)
- **Image Gallery Carousel**: Swipeable high-res product photos with animated pagination dots.
- **Product Details**: Title, brand, category, rating count, stock level, and discount calculation.
- **Interactive Tabbed Sections**:
  - **Overview**: Full description and searchable hashtags.
  - **Specifications**: SKU, Weight, Dimensions (W × H × D), Warranty, Shipping Info, and Return Policy.
  - **Customer Reviews**: Individual review cards showing reviewer name, rating stars, comment, and verified date.
- **Floating Action Bar**: Sticky bottom bar with pricing and interactive "Add to Cart" button with alert feedback.

### 3. 🔄 Loading, Error States & Pull-to-Refresh
- **Loading State**: Shimmering skeleton loader cards mimicking product card layout during network requests.
- **Pull-to-Refresh**: Native `RefreshControl` with branded tint colors on the product list.
- **Error State**: Informative, user-friendly error screen with a "Try Again" retry action button.
- **🧪 Built-in Error Simulator**: A "Simulate Error" button in the header allowing evaluators and reviewers to test the error UI and retry behavior instantly without needing to toggle Wi-Fi or airplane mode.
- **Empty State**: Friendly illustration and reset button when search queries yield 0 results.

---

## 🏗️ Architecture & Project Structure

```
rn-api-showcase/
├── App.tsx                     # Root component with SafeAreaProvider & NavigationContainer
├── app.json                    # Expo configuration
├── package.json                # Project dependencies and run scripts
├── tsconfig.json               # Strict TypeScript configuration
└── src/
    ├── types/
    │   └── product.ts          # Strongly typed models for Products, Reviews, Navigation
    ├── services/
    │   └── api.ts              # Fetch service with timeout handling & error simulation
    ├── theme/
    │   └── theme.ts            # Design tokens: palette, typography, spacing, shadows
    ├── components/
    │   ├── ProductCard.tsx     # List item component with image fallback & stock badges
    │   ├── SkeletonLoader.tsx  # Pulsing shimmer placeholder for loading states
    │   ├── ErrorView.tsx       # Offline/error view with retry trigger
    │   ├── EmptyState.tsx      # Fallback UI for empty search results
    │   ├── SearchBar.tsx       # Search input with clear button
    │   └── CategoryFilter.tsx  # Horizontal scrollable category pill buttons
    ├── screens/
    │   ├── HomeScreen.tsx      # Main list screen with pull-to-refresh & pagination
    │   └── DetailScreen.tsx    # Comprehensive product detail view with image carousel
    └── navigation/
        └── RootNavigator.tsx   # Native stack navigator setup
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or newer recommended, tested on Node v24)
- npm or yarn
- Expo Go app on iOS/Android (optional, for physical device preview)

### 1. Installation
Navigate into the project folder and install dependencies:

```bash
cd rn-api-showcase
npm install
```

### 2. Start the Development Server
Run Expo:

```bash
npx expo start
```

### 3. Choose Your Target Platform
Once the Expo QR code appears in your terminal:
- **iOS Simulator**: Press `i` (macOS with Xcode required)
- **Android Emulator**: Press `a` (Android Studio required)
- **Physical Device**: Scan the QR code using the **Expo Go** app (available on iOS App Store & Google Play)
- **Web Browser**: Press `w` to open immediately in your desktop browser

---

## 🌐 Running on Expo Snack

To run this in an [Expo Snack](https://snack.expo.dev):
1. Open [snack.expo.dev](https://snack.expo.dev).
2. Ensure the following dependencies are added in the left panel under **Dependencies**:
   - `@react-navigation/native`
   - `@react-navigation/native-stack`
   - `react-native-screens`
   - `react-native-safe-area-context`
   - `@expo/vector-icons`
   - `expo-font`
   - `expo-status-bar`
3. Copy the files from `src/` and `App.tsx` into the Snack editor.
4. Preview live on Web, iOS, or Android tab.

---

## 📦 Pushing to a Public GitHub Repository

To submit this project as a public GitHub repository:

1. **Initialize Git & Commit**:
   ```bash
   cd ~/Desktop/rn-api-showcase
   git init
   git add .
   git commit -m "feat: initial commit of React Native API showcase app"
   ```

2. **Create Repo using GitHub CLI (`gh`)**:
   ```bash
   gh repo create rn-api-showcase --public --source=. --remote=origin --push
   ```

3. **Or Create Repo Manually on GitHub**:
   - Go to [github.com/new](https://github.com/new).
   - Name the repository `rn-api-showcase` and set visibility to **Public**.
   - Link and push your local branch:
     ```bash
     git remote add origin https://github.com/<YOUR_USERNAME>/rn-api-showcase.git
     git branch -M main
     git push -u origin main
     ```

---

## 💡 Engineering Highlights & Trade-offs

- **Performance**: Used `FlatList` with `windowSize`, `maxToRenderPerBatch`, and `removeClippedSubviews` defaults for memory-efficient list virtualization.
- **Type Safety**: End-to-end TypeScript interfaces covering nested objects (`reviews`, `dimensions`, `meta`).
- **Resilience**: API requests are protected by an `AbortController` timeout (12s) to prevent hanging screens on spotty network connections.
- **Accessibility & UX**: Clean color contrast, hit slop on touch targets, clear loading skeletons instead of jarring layout shifts, and full native safe-area inset handling.
