<div align="center">
  <img src="public/logo.webp" alt="MangaRealm Logo" width="120" height="120">
  
  # 📚 MangaRealm
  
  **Your Ultimate Destination for Reading Manga, Manhwa, Manhua & Novels**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.4.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Firebase](https://img.shields.io/badge/Firebase-10.0-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
  
  [🚀 Live Demo](https://mangarealm.vercel.app) • [📖 Documentation](#-documentation) • [🐛 Report Bug](https://github.com/Adimas-Prakoso/mangarealm/issues) • [✨ Request Feature](https://github.com/Adimas-Prakoso/mangarealm/issues)
  
</div>

---

## 🌟 **What is MangaRealm?**

MangaRealm is a **modern, high-performance web application** for reading manga, manhwa, manhua, comics, and novels. Built with cutting-edge technologies like **Next.js 15**, **Firebase**, and **TypeScript**, it offers an immersive reading experience with advanced features for both casual readers and manga enthusiasts.

### ✨ **Why Choose MangaRealm?**

- 🚀 **Lightning Fast**: 99.8KB initial bundle size with optimized performance
- 📱 **Mobile First**: Responsive design with native-like mobile experience
- 🎨 **Beautiful UI**: Modern interface with smooth animations and cursor effects
- 🔒 **Secure**: Firebase authentication with role-based access control
- 🌙 **Theme Support**: Dark/Light mode with system preference detection
- 🌐 **Translation Ready**: Built-in translation support for global audience
- 📊 **Analytics**: Comprehensive admin dashboard with insights

---

## 🎯 **Key Features**

<table>
<tr>
<td width="50%">

### 📖 **Reading Experience**
- **Immersive Reader** with fullscreen mode
- **Keyboard Navigation** (Arrow keys, A/D, F, H)
- **Touch/Swipe Support** for mobile
- **Progress Tracking** across devices
- **Chapter Bookmarking**
- **Reading History** (no login required)
- **Translation Overlay** with 20+ languages

### 🔍 **Discovery & Browse**
- **Advanced Search** with filters
- **Genre-based Filtering**
- **Status Filtering** (Ongoing, Completed, Hiatus)
- **Release Year & Chapter Count** filters
- **Popular & Trending** sections
- **Recently Updated** content
- **Personalized Recommendations**

</td>
<td width="50%">

### 👤 **User Management**
- **Firebase Authentication**
- **Social Login** support
- **Profile Management**
- **Follow System** for favorite series
- **Reading Lists** and collections
- **Notification Preferences**
- **Cross-device Sync**

### 🛡️ **Admin Features**
- **Content Management System**
- **User Analytics Dashboard**
- **Series & Chapter Management**
- **Genre Management**
- **User Role Management**
- **System Health Monitoring**
- **Bulk Operations**

</td>
</tr>
</table>

---

## 🎨 **Interactive Features**

### ✨ **Desktop Experience**
- **Sparkle Cursor Trail Effects** - Beautiful particle effects that follow your cursor
- **Ripple Click Effects** - Satisfying visual feedback on interactions
- **Context-Aware Cursor** - Changes based on interactive elements
- **Smooth Hover Animations** - Cards and buttons with magnetic effects
- **Gradient Borders** - Animated gradient effects on special elements

### 📱 **Mobile Experience**
- **Bottom Navigation Bar** - Easy thumb navigation
- **Swipe Gestures** - Natural reading controls
- **Pull-to-Refresh** - Intuitive content updates
- **Haptic Feedback** - Enhanced touch interactions
- **Safe Area Support** - Perfect fit on all devices

---

## 🚀 **Performance & Technical Excellence**

<div align="center">

| Metric | Score | Description |
|--------|-------|-------------|
| **Bundle Size** | 99.8KB | Lightning fast initial load |
| **Build Time** | 1 second | Optimized development workflow |
| **Page Size** | 3-7KB | Instant navigation between pages |
| **Lighthouse** | 95+ | Excellent performance scores |
| **Core Web Vitals** | ✅ | Meets all Google standards |

</div>

### 🔧 **Tech Stack**

<div align="center">

**Frontend**
[![Next.js](https://img.shields.io/badge/Next.js-15.4.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Latest-purple?logo=radix-ui)](https://www.radix-ui.com/)

**Backend & Services**
[![Firebase](https://img.shields.io/badge/Firebase-10.0-orange?logo=firebase)](https://firebase.google.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Latest-black?logo=vercel)](https://vercel.com/)

**Development Tools**
[![Bun](https://img.shields.io/badge/Bun-1.0-black?logo=bun)](https://bun.sh/)
[![ESLint](https://img.shields.io/badge/ESLint-8.0-4B32C3?logo=eslint)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-3.0-F7B93E?logo=prettier)](https://prettier.io/)

</div>

---

## 🛠️ **Quick Start**

### Prerequisites
- **Node.js 18+** or **Bun** (recommended)
- **Firebase Account** (free tier available)
- **Git**

### 1️⃣ **Clone & Install**

```bash
# Clone the repository
git clone https://github.com/Adimas-Prakoso/mangarealm.git
cd mangarealm

# Install dependencies (using Bun - recommended)
bun install

# Or using npm
npm install
```

### 2️⃣ **Environment Setup**

```bash
# Copy environment template
cp .env.local.template .env.local

# Edit .env.local with your Firebase configuration
```

```env
# Firebase Configuration (Required)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Admin Configuration
ADMIN_EMAIL=admin@mangarealm.com
ADMIN_PASSWORD=your-secure-password

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3️⃣ **Firebase Setup**

1. Create a new project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication** → **Email/Password**
3. Create **Firestore Database** → **Start in test mode**
4. Enable **Storage** → **Start in test mode**
5. Add your domain to **Authorized domains**

### 4️⃣ **Run Development Server**

```bash
# Start development server
bun dev

# Or using npm
npm run dev
```

🎉 **Open [http://localhost:3000](http://localhost:3000) in your browser!**

---

## 📁 **Project Architecture**

```
mangarealm/
├── 📱 app/                     # Next.js 15 App Router
│   ├── 🏠 (root)/             # Public pages
│   │   ├── page.tsx           # Homepage
│   │   ├── browse/            # Series discovery
│   │   ├── series/[id]/       # Series details
│   │   └── read/[...]/        # Reading interface
│   ├── 👤 (auth)/             # Authentication
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration
│   │   └── profile/           # User profile
│   ├── 🛡️ admin/              # Admin dashboard
│   ├── 🎨 globals.css         # Global styles
│   └── 📄 layout.tsx          # Root layout
├── 🧩 components/             # Reusable components
│   ├── 🎨 ui/                 # Base UI components
│   ├── 📐 layout/             # Layout components
│   └── ✨ effects/            # Interactive effects
├── 🔧 lib/                    # Utilities & config
│   ├── 🔥 firebase.ts         # Firebase setup
│   ├── 🌐 translation.ts     # i18n utilities
│   └── 🛠️ utils.ts           # Helper functions
├── 📝 types/                  # TypeScript definitions
├── 🎯 contexts/               # React contexts
└── 🌍 public/                # Static assets
```

---

## 🎮 **Usage Guide**

### 📖 **For Readers**

1. **Browse Content**: Use the advanced search and filters to find your favorite series
2. **Start Reading**: Click on any series to view details, then start reading
3. **Track Progress**: Your reading history is automatically saved (no login required)
4. **Follow Series**: Create an account to follow series and get updates
5. **Customize Experience**: Toggle dark/light theme, adjust reading settings

### 🛡️ **For Admins**

1. **Access Admin Panel**: Login with admin credentials
2. **Manage Content**: Add new series, upload chapters, manage metadata
3. **User Management**: View user statistics, manage accounts
4. **Analytics**: Monitor system performance and user engagement
5. **Content Moderation**: Review and moderate user-generated content

### 🔧 **For Developers**

1. **Local Development**: Follow the quick start guide
2. **Add Features**: Create new components in the appropriate directories
3. **Database Changes**: Update Firestore rules and TypeScript types
4. **Styling**: Use Tailwind CSS classes and custom CSS variables
5. **Testing**: Run `bun test` for unit tests

---

## 🎨 **Customization**

### 🎭 **Themes**
- **Light Mode**: Clean, modern interface
- **Dark Mode**: Easy on the eyes for night reading
- **System Preference**: Automatically matches user's system theme
- **Custom Themes**: Easy to add new color schemes

### 🌐 **Internationalization**
- **20+ Languages** supported
- **RTL Support** for Arabic, Hebrew, etc.
- **Dynamic Translation** with free translation API
- **Locale-specific Formatting** for dates, numbers

### 🎯 **Configuration**
- **Reading Settings**: Page transitions, zoom levels, reading direction
- **Notification Preferences**: Email, push notifications
- **Privacy Settings**: Data collection, analytics opt-out
- **Accessibility**: Screen reader support, keyboard navigation

---

## 🚀 **Deployment**

### **Vercel (Recommended)**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Adimas-Prakoso/mangarealm)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### **Other Platforms**
- **Netlify**: `netlify deploy --prod`
- **Railway**: Connect GitHub repository
- **DigitalOcean App Platform**: Use Docker deployment
- **AWS Amplify**: Connect repository and configure build settings

---

## 🔒 **Security & Privacy**

### 🛡️ **Security Features**
- **Firebase Authentication** with secure token management
- **Role-based Access Control** for admin features
- **Input Validation** and sanitization
- **CSRF Protection** on all forms
- **Content Security Policy** headers
- **Rate Limiting** on API endpoints

### 🔐 **Privacy**
- **GDPR Compliant** data handling
- **Optional Account Creation** - reading without registration
- **Data Minimization** - only collect necessary information
- **User Control** - delete account and data anytime
- **Transparent Privacy Policy**

---

## 📊 **Analytics & Monitoring**

### 📈 **Built-in Analytics**
- **User Engagement** metrics
- **Reading Patterns** analysis
- **Popular Content** tracking
- **Performance Monitoring**
- **Error Tracking** and reporting

### 🔍 **Admin Dashboard**
- **Real-time Statistics**
- **User Management**
- **Content Performance**
- **System Health**
- **Revenue Tracking** (if monetized)

---

## 🤝 **Contributing**

We welcome contributions from the community! Here's how you can help:

### 🐛 **Bug Reports**
- Use the [issue tracker](https://github.com/Adimas-Prakoso/mangarealm/issues)
- Include steps to reproduce
- Provide browser/device information
- Add screenshots if applicable

### ✨ **Feature Requests**
- Check existing [feature requests](https://github.com/Adimas-Prakoso/mangarealm/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)
- Describe the feature and use case
- Explain why it would be valuable
- Consider implementation complexity

### 💻 **Code Contributions**

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### 📝 **Development Guidelines**
- Follow the existing code style
- Add TypeScript types for new features
- Include tests for new functionality
- Update documentation as needed
- Keep commits atomic and well-described

---

## 🔧 **Firebase Configuration**

### **Firestore Security Rules**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Series are readable by all, writable by admins
    match /series/{seriesId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Chapters are readable by all, writable by admins
    match /chapters/{chapterId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Reading history is private to users
    match /history/{historyId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Follows are private to users
    match /follows/{followId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

### **Storage Security Rules**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /series/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /chapters/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 MangaRealm

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 **Acknowledgments**

Special thanks to the amazing open-source community and these fantastic projects:

- **[Next.js](https://nextjs.org/)** - The React framework for production
- **[Firebase](https://firebase.google.com/)** - Backend-as-a-Service platform
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Low-level UI primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript with syntax for types

---

## 📞 **Support & Community**

<div align="center">

### 💬 **Get Help**
[![GitHub Issues](https://img.shields.io/badge/GitHub-Issues-red?style=for-the-badge&logo=github)](https://github.com/Adimas-Prakoso/mangarealm/issues)
[![Discord](https://img.shields.io/badge/Discord-Community-5865F2?style=for-the-badge&logo=discord)](https://discord.gg/mangarealm)
[![Email](https://img.shields.io/badge/Email-Support-blue?style=for-the-badge&logo=gmail)](mailto:support@mangarealm.com)

### 🌟 **Show Your Support**
If you find this project helpful, please consider:
- ⭐ **Starring** the repository
- 🐛 **Reporting** bugs and issues
- 💡 **Suggesting** new features
- 🤝 **Contributing** code or documentation
- 📢 **Sharing** with the community

</div>

---

<div align="center">
  
  **Made with ❤️ by the MangaRealm Team**
  
  *Happy Reading! 📚✨*
  
</div>