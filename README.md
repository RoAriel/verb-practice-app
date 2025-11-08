# 📚 Verb Practice App

A modern, interactive web application for practicing English regular and irregular verbs. Built with React, featuring smooth animations, dark mode, and a responsive design.

![Verb Practice App](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.0-purple)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎯 Core Functionality
- **Interactive Practice**: Fill in past simple and past participle forms
- **60 Verbs**: 30 regular + 30 irregular verbs
- **3 Difficulty Levels**: Easy, Medium, Hard
- **3 Practice Modes**: Regular only, Irregular only, or Both
- **Real-time Feedback**: Instant validation with visual indicators
- **Smart Progression**: Avoid repeating verbs until all are practiced

### 📊 Progress Tracking
- **Statistics Dashboard**: Track correct/incorrect answers
- **Accuracy Percentage**: Monitor your learning progress
- **Streak Counter**: Keep your winning streak going!
- **Persistent Storage**: Progress saved with localStorage

### 🎨 User Experience
- **Dark Mode**: Eye-friendly theme switching
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Smooth Animations**: Powered by Framer Motion
- **Verb Reference Tables**: Browse all verbs alphabetically
- **Modern UI**: Clean, gradient-based design

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/verb-practice-app.git

# Navigate to project directory
cd verb-practice-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload

# Production
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🏗️ Project Structure

```
verb-practice-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Settings.jsx          # Difficulty and mode selection
│   │   ├── VerbCard.jsx           # Main practice card
│   │   ├── Stats.jsx              # Statistics display
│   │   ├── ThemeToggle.jsx        # Dark mode toggle
│   │   ├── ResultPopup.jsx        # Feedback popup
│   │   └── VerbTables.jsx         # Verb reference modal
│   ├── context/
│   │   └── ThemeContext.jsx       # Theme state management
│   ├── data/
│   │   └── verbs.js               # Verb database
│   ├── styles/
│   │   └── globals.css            # Global styles
│   ├── App.jsx                    # Main app component
│   └── main.jsx                   # App entry point
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Tech Stack

- **React 18.2** - UI library
- **Vite 5.0** - Build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion 10.12** - Animation library
- **Lucide React** - Icon library

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🌙 Dark Mode

Dark mode is automatically detected from system preferences and can be toggled manually. Theme preference is saved to localStorage.

## 💾 Data Storage

The app uses browser localStorage to persist:
- User statistics (correct/incorrect answers)
- Current streak
- Theme preference

## 🎯 Verb Difficulty Levels

- **Easy**: Common, short verbs (walk, go, see)
- **Medium**: Verbs with spelling changes (study, stop, write)
- **Hard**: Complex or less common verbs (communicate, swim, forbid)

## 👨‍💻 Author

Created with ❤️ by [roariel]

## 🙏 Acknowledgments

- Verb data compiled from various English learning resources
- Icons by [Lucide](https://lucide.dev/)
- Inspired by language learning apps like Duolingo

