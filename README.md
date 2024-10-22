# Weather App ⛅

A modern and responsive weather application built with React, Vite, and TailwindCSS that provides real-time weather information and forecasts.

## 🚀 Features

- Real-time weather data display
- Current temperature and conditions
- Hourly forecast (next 6 hours)
- 10-day forecast
- Rain probability visualization
- Sunrise and sunset times
- Responsive design with smooth animations
- City search functionality
- Scroll-aware header that adapts to user interaction

## 🛠️ Technologies Used

### React + Vite

We chose Vite as our build tool and development environment for several reasons:
- Lightning-fast hot module replacement (HMR)
- Out-of-the-box TypeScript support
- Optimized build performance
- Smaller bundle sizes through better tree-shaking
- Simple configuration and setup

### TailwindCSS

TailwindCSS was implemented throughout the project for its utility-first approach, which provides several benefits as demonstrated in our code:

1. **Responsive Design**
```jsx
className="max-w-md mx-auto px-6"
```
Used for container layouts that adapt to different screen sizes.

2. **Dynamic Styling**
```jsx
className={`sticky top-0 z-10 bg-purple-100 transition-all duration-300 ease-in-out ${
  isScrolled ? "py-2" : "py-6"
}`}
```
Enables dynamic class application based on state changes.

3. **Component States**
```jsx
className={`font-semibold ${
  activeTab === "today" ? "text-purple-600" : ""
}`}
```
Manages active states and interactions.

4. **Custom Animations**
```jsx
className="transition-all duration-300 ease-in-out"
```
Provides smooth transitions and animations.

### Lucide React

Used for consistent and scalable icons throughout the application:
- Search
- Sun
- Moon
- ChevronDown

## 🏗️ Project Structure

The main component (`WeatherApp.jsx`) is organized into several key sections:

1. **State Management**
   - Weather data
   - Active tab selection
   - City selection
   - Search functionality
   - Scroll position tracking

2. **API Integration**
   - WeatherAPI.com service integration
   - Forecast data fetching
   - Error handling

3. **UI Components**
   - Header with dynamic scrolling behavior
   - Weather information display
   - Tab navigation
   - Search functionality
   - Forecast views (Today/10-day)

## 📥 Installation

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

### TailwindCSS Configuration
The project uses a custom color palette and extends the default Tailwind configuration:

```js
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          100: '#F3E8FF',
          200: '#E9D5FF',
          600: '#9333EA',
        }
      }
    }
  },
  plugins: [],
}
```

## 🚧 TODOs and Future Improvements

As noted in the code comments:
- Add precipitation probability graph
- Add wind speed and humidity information
- Implement error handling for network failures
- Add loading state management
- Move API key to environment variables
