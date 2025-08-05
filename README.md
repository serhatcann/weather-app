# Weather App

A weather application built with Vue 3, TypeScript, TailwindCSS, Vite and Open Meteo API. Get current weather conditions and 5-day forecasts for any location worldwide.

## Features

- 🌤️ Current weather conditions with temperature and weather icons
- 📅 5-day weather forecast
- 🔍 Search locations by city name
- 💾 Persistent location storage
- 📱 Responsive design
- ⚡ Fast and lightweight

## How to Use

1. Enter a city name in the search box
2. Click "Add Location" to get weather data
3. Click on any weather card to view detailed 5-day forecast
4. Remove locations by clicking the remove button

## Tech Stack

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vite** for fast development
- **Pinia** for state management
- **Vue Router** for navigation
- **Tailwind CSS** for styling
- **Open-Meteo API** for weather data

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Build for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
