# 🏔️ Trail Quest - Interactive Hiking Adventure

An immersive mobile web app that transforms hiking into an engaging treasure hunt experience. Solve riddles, uncover mysteries, and explore the Mont Môle adventure through progressive challenges.

## ✨ Features

- **🗺️ Mission System** - Access adventures with special codes
- **🧩 Progressive Riddles** - 2 chapters with 7 challenging puzzles  
- **🌍 Multilingual** - Switch between French and English instantly
- **📱 Mobile-First** - Optimized for outdoor smartphone use
- **⏱️ Scoring & Timing** - Track progress with hints/speed bonuses
- **🎨 Mountain Theme** - Beautiful alpine-inspired design

## 🎮 Demo

**Access Code:** `1234` (for "Panique au Môle" mission)

Try the complete adventure:
1. Homepage → Missions → Add mission with code
2. Mission details → Start adventure  
3. Rules & tutorial → Begin chapters
4. Solve riddles in both chapters
5. Complete adventure with final scoring

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server  
npm start
```

App runs at `http://localhost:5000`

## 🏗️ Technology Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Backend:** Express + Node.js
- **UI:** Tailwind CSS + shadcn/ui + Radix UI
- **Storage:** In-memory (development) / PostgreSQL (production)
- **Build:** ESBuild + Vite bundling
- **Deployment:** Render-ready configuration

## 📱 Mobile Experience

Designed for outdoor hiking use:
- Touch-friendly interface
- Offline-capable progress saving
- Responsive design for all screen sizes  
- Fast loading on mobile networks
- Glass morphism effects for readability

## 🌲 Game Structure

**Chapter 1: La Forêt Maudite du Môle**
- 3 riddles about forest exploration
- Difficulty: Easy (~45 min)

**Chapter 2: Le Secret de la Grotte** 
- 4 riddles with cave mysteries
- Difficulty: Intermediate (~60 min)

## 🎯 Scoring System

- **Correct Answer:** +100 points
- **Speed Bonus:** +50 points (under 60 seconds)
- **Hint Used:** -25 points
- **Final Ranking:** Compare with other adventurers

## 📦 Deployment

See [DEPLOY.md](./DEPLOY.md) for complete Render deployment guide.

Quick deploy to Render:
1. Push code to GitHub
2. Connect repo to Render
3. Use build command: `npm ci && npm run build`
4. Use start command: `npm start`

## 🔧 Development

- `npm run dev` - Start development with hot reload
- `npm run build` - Build for production
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema changes

## 📝 License

MIT License - Feel free to use for your own hiking adventures!