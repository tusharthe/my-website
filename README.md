# Vue 3 Portfolio with Google Gemini AI Chat

A modern portfolio website built with Vue 3, featuring an AI-powered chatbot using Google Gemini API.

## 🚀 Features

- **Vue 3 + Vite** - Lightning-fast development
- **TailwindCSS v4** - Modern styling with custom design system
- **7 Theme Layouts** - Quantum, Minimal, Terminal, Neo-Brutal, Corporate, Retro 95, Cyberpunk
- **6 Color Palettes** - Cosmic, Emerald, Sunset, Ocean, Royal, Crimson
- **AI Chatbot** - Google Gemini 2.0 Flash powered assistant
- **Blog Integration** - DEV.to and Hashnode article feeds
- **Sound Engine** - Web Audio API powered interactions
- **Responsive Design** - Mobile-first approach

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔑 Setup Google Gemini API

1. Get a **free API key** from [Google AI Studio](https://aistudio.google.com/apikey)

2. Open `.env` file and replace the placeholder:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

3. The chatbot will automatically connect to Gemini API

**Note:** Without a valid API key, the chatbot will show a configuration warning.

## 🌐 Environment Variables

All API keys and configuration are stored in `.env`:

```env
# Web3Forms (Contact Form)
VITE_WEB3FORMS_KEY=your_key_here

# DEV.to Blog
VITE_DEVTO_USERNAME=tusharthe
VITE_DEVTO_API_BASE=https://dev.to/api/articles

# Hashnode Blog
VITE_HASHNODE_GQL_ENDPOINT=https://gql.hashnode.com
VITE_HASHNODE_MY_HOST=tusharkanti.hashnode.dev
VITE_HASHNODE_COMMUNITY_HOST=engineering.hashnode.com

# Google Gemini API (AI Chatbot)
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## 🎨 Customization

### Change Theme/Layout
Click the palette and layout icons in the top-right navigation to switch between themes and layouts.

### Update Content
Edit the section components in `src/components/home/` to update your portfolio content.

### Modify AI Knowledge Base
Edit the `SYSTEM_INSTRUCTION` in `src/composables/useChatbot.js` to customize the AI assistant's knowledge.

## 📚 Tech Stack

- **Frontend**: Vue 3, Vue Router 4
- **Styling**: TailwindCSS v4, Custom CSS Variables
- **Icons**: Lucide Vue Next
- **AI**: Google Gemini 2.0 Flash (via @google/genai SDK)
- **Markdown**: Marked.js
- **Build**: Vite 7

## 🔧 Project Structure

```
portfolio-ag/
├── src/
│   ├── components/
│   │   ├── home/          # Home page sections
│   │   ├── layout/        # Navigation, Footer, etc.
│   │   └── ChatWidget.vue # AI chatbot widget
│   ├── composables/       # Reusable Vue logic
│   │   ├── useChatbot.js  # Gemini AI integration
│   │   ├── useTheme.js    # Theme management
│   │   └── useSoundEngine.js
│   ├── views/             # Page views
│   ├── router/            # Vue Router config
│   └── assets/
│       └── style.css      # Custom styles
├── .env                   # Environment variables
└── package.json
```

## 📝 License

MIT License - feel free to use this for your own portfolio!

## 👤 Author

**Tushar Kanti Parial**
- GitHub: [@tusharthe](https://github.com/tusharthe)
- LinkedIn: [tushar-kanti-parial](https://linkedin.com/in/tushar-kanti-parial)
- Email: tkparial1@gmail.com
