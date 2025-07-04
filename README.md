
# TrueFeedback 🎯

**Get honest, anonymous feedback from anyone, anywhere.**

TrueFeedback is a modern Next.js application that enables users to receive genuine, anonymous feedback through shareable links. Built with a focus on privacy and user experience, it combines the power of Next.js with robust authentication and AI-powered features.

## ✨ Features

* **Anonymous Feedback Collection** - Share your unique link and receive honest feedback without revealing sender identity
* **Dual Authentication System** - Choose between NextAuth providers or custom email/password authentication
* **AI-Powered Suggestions** - Get intelligent feedback prompts powered by Google's Gemini AI
* **Real-time Notifications** - Instant feedback delivery with toast notifications
* **Email Integration** - Automated email notifications for new feedback
* **Responsive Design** - Beautiful UI that works seamlessly across all devices
* **Dark/Light Mode** - Toggle between themes for comfortable viewing
* **Message Management** - View, organize, and delete your received feedback

## 🚀 Tech Stack

* **Frontend** : Next.js 15.3.4, React 19, TypeScript
* **Styling** : Tailwind CSS 4, Radix UI Components
* **Authentication** : NextAuth.js + Custom Auth Implementation
* **Database** : MongoDB with Mongoose ODM
* **AI Integration** : Google Gemini AI (@google/genai)
* **Email Service** : Nodemailer with React Email templates
* **Form Handling** : React Hook Form with Zod validation
* **Animations** : Embla Carousel, Lucide React icons
* **State Management** : usehooks-ts for custom hooks

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ansh0330/truefeedback.git
   cd truefeedback
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # NextAuth
   NEXTAUTH_SECRET=your_nextauth_secret

   # Email Service
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   EMAIL_HOST=your_mail_service_host

   # Google AI
   GEMINI_API_KEY=your_google_ai_api_key

   ```
4. **Run the development server**
   ```bash
   npm run dev
   ```
5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000/)

## 📱 Usage

1. **Sign Up/Login** - Create an account using email/password .
2. **Get Your Link** - Receive a unique shareable link after authentication
3. **Share Your Link** - Send your link to friends, colleagues, or anyone you want feedback from
4. **Receive Feedback** - Anonymous users can submit honest feedback through your link
5. **Manage Messages** - View, organize, and delete received feedback in your dashboard

## 🏗️ Project Structure

```
truefeedback/
├── src/
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── auth/         # Authentication pages
│   │   └── dashboard/    # User dashboard
│   ├── components/       # Reusable UI components
│   ├── lib/             # Utility functions
│   ├── models/          # Database models
│   └── schemas/         # Zod validation schemas
├── public/              # Static assets
└── ...config files
```

## 🔐 Authentication Flow

TrueFeedback supports two authentication methods:

1. **NextAuth.js** - OAuth providers (Google, GitHub, etc.)
2. **Custom Authentication** - Email/password with bcrypt hashing

## 🎨 UI Components

Built with modern, accessible components:

* Radix UI primitives for consistent behavior
* Custom styled components with Tailwind CSS
* Responsive design patterns
* Dark/light mode support

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js applications (Netlify, Railway, DigitalOcean, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](https://claude.ai/chat/LICENSE) file for details.

## 🙏 Acknowledgments

* Built with [Next.js](https://nextjs.org/)
* UI components from [Radix UI](https://radix-ui.com/)
* Icons from [Lucide React](https://lucide.dev/)
* Powered by [Google Gemini AI](https://ai.google/)

## 📞 Support

If you have any questions or need help, feel free to:

* Open an issue on GitHub
* Reach out via email
* Join our community discussions

---

**Made with ❤️ by Ansh**
