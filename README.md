# 🧹 EmailCleaner - AI-Powered Inbox Management

A sophisticated web application that uses artificial intelligence to intelligently clean and organize your Gmail inbox. Built with modern web technologies and designed for optimal user experience.

## ✨ Features

### 🤖 AI-Powered Email Analysis
- **Intelligent Email Classification**: Uses Google's Gemini AI to analyze email content and suggest cleanup actions
- **Smart Cleanup Suggestions**: Automatically identifies emails that can be archived, trashed, or deleted
- **Context-Aware Recommendations**: Considers email content, sender patterns, and user behavior

### 🔐 Secure Authentication
- **OAuth 2.0 Integration**: Secure Google authentication with proper token management
- **Session Management**: Persistent sessions with automatic token refresh
- **Privacy-First**: Minimal data collection, focusing only on email metadata

### 📧 Gmail Integration
- **Real-time Sync**: Seamless integration with Gmail API
- **Bulk Operations**: Process multiple emails simultaneously
- **Safe Operations**: All actions are reversible and respect Gmail's safety features

### 🎨 Modern User Interface
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Intuitive UX**: Clean, modern interface with clear action buttons
- **Real-time Feedback**: Toast notifications and loading states for better user experience

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - Modern state management

### Backend & APIs
- **Next.js API Routes** - Serverless API endpoints
- **Google APIs** - Gmail and Calendar integration
- **GraphQL Mesh** - Unified API layer
- **MySQL** - Relational database

### Authentication & Security
- **NextAuth.js** - Authentication framework
- **OAuth 2.0** - Google authentication
- **JWT Tokens** - Secure session management
- **bcrypt** - Password hashing

### AI & Machine Learning
- **Google Gemini AI** - Email content analysis
- **Natural Language Processing** - Email classification
- **Contextual Analysis** - Smart recommendation engine

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Turbopack** - Fast development builds

## 🏗️ Architecture

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── ai/           # AI-powered endpoints
│   │   ├── auth/         # Authentication routes
│   │   └── lib/          # Core business logic
│   ├── auth/             # Authentication pages
│   └── globals.css       # Global styles
├── components/           # Reusable UI components
├── hooks/               # Custom React hooks
└── types/               # TypeScript type definitions
```

### Key Components

#### 1. **Authentication System**
- Custom NextAuth adapter for MySQL
- OAuth token management with automatic refresh
- Secure session handling

#### 2. **AI Service Layer**
- Gemini AI integration for email analysis
- Intelligent cleanup suggestion generation
- Context-aware email processing

#### 3. **Gmail Integration**
- Real-time email synchronization
- Safe email operations (archive, trash, delete)
- Bulk processing capabilities

#### 4. **Database Layer**
- MySQL with GraphQL Mesh
- Optimized queries for email data
- Proper indexing and relationships

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MySQL 8.0+
- Google Cloud Platform account
- Google OAuth credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aminmomin2/emailcleaner.git
   cd emailcleaner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   # Database
   DATABASE_URL=mysql://user:password@localhost:3306/emailcleaner
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   # NextAuth
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   
   # Google AI
   GOOGLE_AI_API_KEY=your_gemini_api_key
   ```

4. **Set up the database**
   ```bash
   # Run the schema file
   mysql -u root -p emailcleaner < src/app/api/model/schema.sql
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Google Cloud Setup

1. **Create a Google Cloud Project**
2. **Enable Gmail API and Google Calendar API**
3. **Create OAuth 2.0 credentials**
4. **Configure authorized redirect URIs**
5. **Set up Google AI API key**

## 📊 Database Schema

### Core Tables
- `users` - User accounts and authentication
- `user_emails` - Email metadata and content
- `user_calendar_events` - Calendar event data
- `user_credentials` - OAuth token storage

### Key Relationships
- Users have many emails and calendar events
- Emails are linked to Gmail provider IDs
- Calendar events are linked to Google Calendar IDs

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `GET /api/auth/[...nextauth]` - NextAuth endpoints

### Email Management
- `POST /api/sync` - Initial Gmail sync
- `GET /api/user/sync-state` - Check sync status
- `POST /api/user/set-synced` - Mark user as synced

### AI Operations
- `GET /api/ai/suggest-cleanups` - Get cleanup suggestions
- `POST /api/ai/generate-cleanups` - Generate new suggestions
- `POST /api/ai/execute-cleanup` - Execute cleanup actions

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npm run build

# Development server
npm run dev
```

## 🔒 Security Features

- **OAuth 2.0** - Secure Google authentication
- **Token Encryption** - Encrypted storage of OAuth tokens
- **Session Management** - Secure session handling
- **Input Validation** - All inputs are validated and sanitized
- **Rate Limiting** - API rate limiting to prevent abuse

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Self-Hosted
1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Configure reverse proxy (nginx/Apache)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google APIs** - For Gmail and Calendar integration
- **NextAuth.js** - For authentication framework
- **Tailwind CSS** - For styling utilities
- **Next.js Team** - For the amazing React framework

## 📞 Contact

- **GitHub**: [@aminmomin2](https://github.com/aminmomin2)
- **LinkedIn**: [Amin Momin](https://www.linkedin.com/in/aminmomin1/)
- **Email**: aminmomin2006@gmail.com

---

**Built with ❤️ using Next.js, TypeScript, and Google AI**
