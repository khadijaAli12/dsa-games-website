# DSA Games Website

An interactive learning platform for Data Structures and Algorithms through gamified experiences.

## 🎮 Features

- **Sort Hero**: Visualize sorting algorithms (Bubble Sort, Quick Sort, Merge Sort) with step-by-step animations
- **Maze Escape**: Solve mazes using backtracking algorithms with real-time pathfinding visualization
- **Interactive Learning**: Learn complex algorithms through hands-on gameplay
- **Visual Feedback**: See algorithms in action with beautiful animations
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dsa-games-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
dsa-games-website/
│
├── public/
│   └── assets/          # Static images, sounds
│
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── NavBar.jsx
│   │   └── NavBar.scss
│   │
│   ├── games/           # All games live here
│   │   ├── SortHero/
│   │   │   ├── SortHero.jsx
│   │   │   ├── SortLogic.js
│   │   │   └── SortStyles.scss
│   │   └── MazeEscape/
│   │       ├── MazeEscape.jsx
│   │       └── MazeStyles.scss
│   │
│   ├── layout/          # Layouts like GameLayout, MainLayout
│   │   ├── MainLayout.jsx
│   │   └── MainLayout.scss
│   │
│   ├── pages/           # Home, About, Play
│   │   ├── Home.jsx
│   │   ├── Home.scss
│   │   ├── Play.jsx
│   │   ├── Play.scss
│   │   ├── About.jsx
│   │   └── About.scss
│   │
│   ├── routes/          # App routing setup
│   │   └── AppRoutes.jsx
│   │
│   ├── state/           # Zustand stores
│   │   └── gameStore.js
│   │
│   ├── styles/          # Global styles, variables
│   │   └── global.scss
│   │
│   ├── App.jsx          # Main App component
│   └── main.jsx         # Entry point
│
├── index.html
├── package.json
└── vite.config.js
```

## 🛠️ Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Zustand** - State management
- **SCSS** - Styling with CSS preprocessor
- **Framer Motion** - Animations

## 🎯 Available Games

### Sort Hero
- **Bubble Sort**: Simple comparison-based sorting
- **Quick Sort**: Divide-and-conquer sorting algorithm
- **Merge Sort**: Stable, comparison-based sorting

### Maze Escape
- **Backtracking**: Find path from start to end in a maze
- **Multiple maze sizes**: 6x6 to 12x12 grids
- **Real-time visualization**: Watch the algorithm work step by step

## 🎨 Customization

### Adding New Games

1. Create a new folder in `src/games/`
2. Add your game component and styles
3. Update `src/routes/AppRoutes.jsx` with the new route
4. Add the game to the games list in `src/pages/Play.jsx`

### Styling

The project uses SCSS with a modular approach:
- Global styles in `src/styles/global.scss`
- Component-specific styles in their respective `.scss` files
- CSS variables for consistent theming

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by the need for better algorithm learning tools
- Built with modern web technologies for optimal user experience
- Designed for educational purposes and skill development
