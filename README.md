# Smart🌱Farmer — AI Plant Disease Scanner & Agriculture Platform

**Smart🌱Farmer** is a full-stack, AI-powered agricultural application built with React, Vite, Express, Tailwind CSS, Lucide icons, and Google Gemini AI.

---

## 🌟 Key Features

- **📸 AI Crop Scanner:** Upload or capture leaf photos to diagnose diseases instantly using Gemini AI.
- **📍 Real-Time Location Weather:** Precise temperature, humidity, rainfall, and wind speed forecasts based on GPS location.
- **🧪 Pesticide & Treatment Recommendations:** Instant advice on safe dosage, spray schedules, and organic alternatives.
- **💬 AI Agriculture Assistant:** Multilingual chatbot providing agricultural and farming guidance.
- **🌐 Multilingual Support:** Supports English, Hindi, Telugu, Tamil, Kannada, Marathi, Punjabi, Gujarati, Bengali, and Malayalam.
- **👥 Farmer Community & Marketplace:** Discussion board, direct trade listings, and equipment rental hub.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### 2. Installation
Clone your repository and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/smart-farmer.git
cd smart-farmer
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory using `.env.example` as a template:

```bash
cp .env.example .env
```

Set your API keys inside `.env`:
```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
```

### 4. Running Development Server
Start the full-stack development server (Express + Vite):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
Compile the client assets and server bundle for production deployment:

```bash
npm run build
npm start
```

---

## 📤 How to Export & Push to GitHub from AI Studio

### Method A: One-Click Export in AI Studio UI
1. Click the **Settings / Code Menu** at the top right of your AI Studio workspace.
2. Select **Export to GitHub** (or **Download ZIP**).
3. Connect your GitHub account and choose target repository name.

### Method B: Push via Local Command Line
If you downloaded the code as a ZIP file:
```bash
git init
git add .
git commit -m "Initial commit of Smart Farmer application"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/smart-farmer.git
git push -u origin main
```

---

## 🛠️ Project Architecture

```
├── .env.example        # Environment variables template
├── index.html          # HTML Entry point
├── package.json        # Dependencies & scripts
├── server.ts           # Express backend proxy & Gemini integration
├── src/                # Frontend React code
│   ├── components/     # UI Components (Scanner, Weather, Chat, Marketplace, etc.)
│   ├── context/        # React Contexts (Auth, Language, Weather, etc.)
│   ├── data/           # Crop & Language datasets
│   ├── types/          # TypeScript interfaces
│   └── main.tsx        # React mounting entry point
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

---

## 📄 License
Created for farmers and agricultural technology empowerment.
