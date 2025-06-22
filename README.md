# 🧠 AI Response Generator

An intelligent AI-powered tool to generate replies in different tones and languages. Built with React and Material UI.

## 🚀 Features

- 🎨 UI with Material UI components
- 🤖 Generate responses using your API
- 🗣️ Tones like friendly, sarcastic, motivational, etc.
- 🌍 Supports multiple languages (English, Spanish, Hindi, etc.)
- 📋 Copy to clipboard feature
- 💡 Responsive & mobile-friendly layout

## 🔧 Tech Stack

- **Frontend:** React, Material UI
- **Backend:** Node.js / Express (your API)
- **API Communication:** Axios

## 🛠️ Installation

```bash
git clone https://github.com/sayir-official/ai-response-generator.git
cd ai-response-generator
npm install
npm start
```

Make sure your backend API is running at `http://localhost:5000`.

## 📁 Folder Structure

```
/client      # React frontend
/server      # Express backend
```

## 📄 Environment Variables

Create a `.env` file inside `/server` with:

```
OPENAI_API_KEY=your_api_key_here
```

> ❗ Never commit `.env` to GitHub! Use `.gitignore`.
