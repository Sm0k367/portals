# The Portals of EpicTech

An immersive, cinematic web experience that guides you through 10 interactive AI-powered portals — each one a unique destination of design, intelligence, and sound.

> *"In the digital expanse... there are echoes of creation.  
> Whispers of code that form worlds.  
> We have gathered ten such whispers.  
> Ten portals.  
> Turn the page... and step through."*

## 🎯 Features

- 📖 **Page-turning storybook UI** with smooth 3D transitions
- 🌐 **10 linked portals** to external AI projects
- 🎵 **Synthetic glitch-style ambient music** (Web Audio API)
- 🎙️ **Audio controls** for music and narration
- ✨ **Glowing logo finale** with particle effects
- 🎨 **Beautiful animations** and micro-interactions
- 📱 **Fully responsive** design for all devices
- ⌨️ **Keyboard navigation** and accessibility features
- 🔊 **Synthetic audio** fallbacks when files aren't available

## 🔗 Linked Portals

| Portal | Description | Link |
|--------|-------------|------|
| 1 | Referral Gateway | [🔗](https://sm0k367.github.io/referal/) |
| 2 | Premium Experience | [🔗](https://sm0k367.github.io/premium/) |
| 3 | AI Chat Interface | [🔗](https://sm0k367.github.io/chat/) |
| 4 | Lyric Visualizer | [🔗](https://sm0k367.github.io/lyric-visualizer-v2.0/) |
| 5 | Entry Portal | [🔗](https://sm0k367.github.io/enter/) |
| 6 | Agent Epic | [🔗](https://sm0k367.github.io/agent-epic/) |
| 7 | Machine Chat | [🔗](https://sm0k367.github.io/machinechat/) |
| 8 | Developer Forge | [🔗](https://sm0k367.github.io/epicdev/) |
| 9 | Epic 1 Genesis | [🔗](https://sm0k367.github.io/epic1/) |
| 10 | Epic Music Generator | [🔗](https://epictechai.github.io/epicmusic/) |

## 🛠️ Project Structure

```
portals-storybook/
├── index.html                 # Main interactive book
├── src/
│   ├── styles/
│   │   └── main.css          # Visual design & animations
│   ├── scripts/
│   │   ├── main.js           # Core page logic
│   │   ├── audio.js          # Audio management
│   │   └── navigation.js     # Navigation & accessibility
│   └── audio/                # Audio files (optional)
├── vercel.json               # Vercel deployment config
└── README.md                 # This file
```

## 🎮 Controls

- **Click anywhere** or **Spacebar**: Turn page / Start experience
- **Arrow Keys**: Navigate between pages
- **M**: Toggle background music
- **V**: Toggle voiceover narration
- **R**: Restart experience
- **Escape**: Return to cover page
- **Touch/Swipe**: Mobile navigation support

## 🎵 Audio Features

The application includes a sophisticated audio system:

- **Synthetic Background Music**: Uses Web Audio API to create ambient glitch-style music
- **Audio Controls**: Toggle music and narration independently
- **Graceful Fallbacks**: Works perfectly even without audio files
- **Page Turn Sounds**: Synthetic sound effects for page transitions
- **Volume Management**: Optimized audio levels for the best experience

## 🚀 Deployment

This project is ready for deployment on Vercel, Netlify, or any static hosting service.

### Vercel Deployment
1. Push to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Deploy automatically

### Local Development
1. Clone the repository
2. Open `index.html` in a modern browser
3. Or serve with any static file server

## 🎨 Customization

### Adding Audio Files
Place audio files in `src/audio/`:
- `glitch-ambient.mp3`: Background music loop
- `narration.mp3`: Voiceover narration
- `page-turn.mp3`: Page turn sound effect

### Modifying Portals
Edit the portal pages in `index.html` and update the `data-url` attributes to point to your own projects.

### Styling
Customize the appearance by modifying `src/styles/main.css`. The design uses CSS custom properties for easy theming.

## 🌟 Technical Highlights

- **Pure HTML/CSS/JavaScript** - No frameworks required
- **Web Audio API** - Synthetic audio generation
- **CSS 3D Transforms** - Smooth page transitions
- **Responsive Design** - Works on all screen sizes
- **Accessibility** - ARIA labels, keyboard navigation, screen reader support
- **Performance Optimized** - Lazy loading, efficient animations
- **Progressive Enhancement** - Works without JavaScript (basic functionality)

## 📄 License

MIT © 2025 EpicTech AI  
Use it, remix it, build upon it.

## 🤝 Connect

- 🌐 [epictech.ai](https://epictech.ai)
- 🧠 [@Sm0k367](https://github.com/Sm0k367)
- 🎥 [YouTube](https://youtube.com/@EpicTechAI)
- 🧵 [X / Twitter](https://twitter.com/Sm0ken42O)

---

*"These are but fragments of a larger design. A universe of possibility awaits."*