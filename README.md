# GoodFriend Kanban

A minimalist Kanban board application with voice-powered UI assistance.

## ✨ Features

### Task Management
- **Manual Input**: Click-to-add tasks in any column
- **Drag & Drop**: Move tasks between columns
- **Inline Editing**: Click any task to edit
- **Quick Actions**: Arrow buttons and delete

### Voice Assistant (UI Tutor)
- **Interface Guide**: Teaches you how to use the app
- **Privacy First**: Does NOT access your task data
- **Zero Queries**: Cannot list or query your tasks
- **Helpful**: Explains features and functionality

### Clean Design
- **Minimalist UI**: Inspired by modern fintech apps
- **Responsive**: Works on desktop and mobile
- **Smooth Animations**: Polished interactions
- **Accessibility**: Keyboard navigation support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- GoodFriend server running on `localhost:3001` (for voice features)

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Usage

1. **Add Tasks**: Click "+ Add task" in any column
2. **Move Tasks**: Drag and drop OR use arrow buttons
3. **Edit Tasks**: Click on a task card
4. **Delete Tasks**: Click the × button
5. **Voice Help**: Click the voice button for UI guidance

## 🎨 Design System

### Colors
- **Primary**: `#1a1a1a` - Main actions
- **Accent**: `#0066ff` - Interactive elements
- **Background**: `#ffffff` - Base
- **Border**: `#e5e5e5` - Subtle dividers
- **Text**: `#1a1a1a` / `#666666` / `#999999`

### Typography
- **System Fonts**: -apple-system, Segoe UI, Roboto
- **Base Size**: 14px
- **Line Height**: 1.6

### Spacing
- **XS**: 0.25rem (4px)
- **SM**: 0.5rem (8px)
- **MD**: 1rem (16px)
- **LG**: 1.5rem (24px)
- **XL**: 2rem (32px)

## 🔒 Privacy & Security

### AI Assistant Limitations
The voice assistant is a **UI tutor only**:

✅ **Can:**
- Explain how to add, edit, move tasks
- Describe column purposes
- Teach drag-and-drop
- Guide through features

❌ **Cannot:**
- Access your task list
- Query or list tasks
- Execute actions for you
- Mention specific task content

### Data Storage
- Tasks stored in browser `localStorage`
- No data sent to servers (except AI context)
- Zero cloud sync (client-side only)

## 🛠️ Tech Stack

- **React 18.3**: UI framework
- **TypeScript**: Type safety
- **Vite 6.0**: Build tool
- **CSS Custom Properties**: Theming
- **GoodFriend Client**: Voice integration

## 📁 Project Structure

```
src/
├── components/
│   ├── Board.tsx/css         # Main board container
│   ├── Column.tsx/css        # Kanban column
│   ├── Task.tsx/css          # Task card
│   ├── TaskInput.tsx/css     # Add task form
│   ├── VoiceControl.tsx/css  # Voice assistant
│   └── HelpPanel.tsx/css     # Help modal
├── types/
│   └── kanban.ts             # TypeScript types
├── App.tsx/css               # Main app
├── main.tsx                  # Entry point
└── index.css                 # Global styles
```

## 🧪 Development

### Build
```bash
npm run build
```
Output: `dist/` folder with optimized assets

### Preview Production Build
```bash
npm run preview
```

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please read the [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) for development guidelines.

---

**Built with [GoodFriend.js](https://github.com/guilhermeariza/goodfriend)**
