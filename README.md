# RAS Jadara Website

Official website for the Robotics and Automation Society at Jadara University.

## 🚀 Features

- Modern, responsive design
- Interactive chatbot powered by n8n webhook
- Team showcase
- Photo gallery
- Social media integration

## 🛠️ Tech Stack

- HTML5
- CSS3 (with custom variables and animations)
- Vanilla JavaScript
- Netlify Functions (for chatbot proxy)

## 📦 Deployment

### Netlify Deployment

This site is configured for automatic deployment on Netlify.

**Build Settings:**
- **Branch to deploy:** `main`
- **Base directory:** (leave empty)
- **Build command:** (leave empty)
- **Publish directory:** `.`
- **Functions directory:** `netlify/functions`

### Local Development

1. Clone the repository
2. Open `index.html` in your browser
3. For testing Netlify Functions locally, install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify dev
   ```

## 🤖 Chatbot

The chatbot uses a Netlify Function as a proxy to communicate with the n8n webhook, avoiding CORS issues.

**Webhook URL:** `https://karamq6.app.n8n.cloud/webhook/ras-chatbot`

The function is located at: `netlify/functions/chatbot.js`

## 📁 File Structure

```
.
├── index.html          # Main HTML file
├── index.css           # Styles
├── index.js            # JavaScript functionality
├── favicon.svg         # Site icon
├── netlify.toml        # Netlify configuration
├── package.json        # Dependencies
└── netlify/
    └── functions/
        └── chatbot.js  # Serverless function for chatbot
```

## 🔧 Configuration

The site uses CSS variables for easy theming. Edit `index.css` to customize colors:

```css
:root {
    --accent-red: #ff0844;
    --accent-purple: #7b2cbf;
    --accent-blue: #3d5af1;
    /* ... more variables */
}
```

## 📝 License

© 2025 RAS Jadara. All rights reserved.
