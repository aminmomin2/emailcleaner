# Contributing to EmailCleaner

**Note: This is a personal project by Amin Momin and is not currently accepting public contributions.**

This document provides information about the project structure and development guidelines for reference purposes.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- Git
- A Google Cloud Platform account (for testing)

### Development Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/aminmomin2/emailcleaner.git
   cd emailcleaner
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Database Setup**
   ```bash
   # Create database
   mysql -u root -p -e "CREATE DATABASE emailcleaner;"
   
   # Run schema
   mysql -u root -p emailcleaner < src/app/api/model/schema.sql
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📋 Development Guidelines

### Code Style

- **TypeScript**: Use strict TypeScript with proper type annotations
- **ESLint**: Follow the project's ESLint configuration
- **Prettier**: Use consistent formatting (configured in the project)
- **Comments**: Add JSDoc comments for all public functions and components

### File Structure

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

### Naming Conventions

- **Files**: Use kebab-case for file names
- **Components**: Use PascalCase for component names
- **Functions**: Use camelCase for function names
- **Constants**: Use UPPER_SNAKE_CASE for constants
- **Types/Interfaces**: Use PascalCase with descriptive names

### Component Guidelines

- Create reusable, composable components
- Use TypeScript interfaces for props
- Add JSDoc comments for component documentation
- Implement proper error boundaries
- Use React.memo for performance optimization when needed

### API Guidelines

- Use RESTful conventions for API endpoints
- Implement proper error handling and status codes
- Add input validation for all endpoints
- Use TypeScript for request/response types
- Add comprehensive logging

## 🧪 Testing

### Running Tests

```bash
# Lint code
npm run lint

# Type checking
npm run build

# Run tests (when implemented)
npm test
```

### Testing Guidelines

- Write unit tests for utility functions
- Write integration tests for API endpoints
- Test error scenarios and edge cases
- Maintain good test coverage
- Use descriptive test names

## 🔧 Git Workflow

### Branch Naming

- `feature/feature-name` - New features
- `bugfix/bug-description` - Bug fixes
- `hotfix/urgent-fix` - Critical fixes
- `docs/documentation-update` - Documentation changes

### Commit Messages

Use conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build/tooling changes

Examples:
```
feat(auth): add Google OAuth integration
fix(api): resolve email sync timeout issue
docs(readme): update installation instructions
```

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write your code
   - Add tests if applicable
   - Update documentation

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

4. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Pull Request Guidelines**
   - Use descriptive PR titles
   - Fill out the PR template
   - Link related issues
   - Request reviews from maintainers

## 🐛 Bug Reports

### Before Submitting

1. Check existing issues for duplicates
2. Test with the latest version
3. Try to reproduce the issue

### Bug Report Template

```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen.

**Actual Behavior**
What actually happens.

**Environment**
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 1.0.0]

**Additional Context**
Any other context about the problem.
```

## 💡 Feature Requests

### Feature Request Template

```markdown
**Feature Description**
A clear description of the feature.

**Use Case**
Why this feature would be useful.

**Proposed Implementation**
How you think this could be implemented.

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Any other context about the feature request.
```

## 🔒 Security

### Security Guidelines

- Never commit sensitive data (API keys, passwords)
- Use environment variables for configuration
- Validate all user inputs
- Implement proper authentication and authorization
- Follow OWASP security guidelines
- Report security vulnerabilities privately

### Reporting Security Issues

If you discover a security vulnerability, please:

1. **Do NOT** create a public issue
2. Email security@yourdomain.com
3. Include detailed information about the vulnerability
4. Allow time for assessment and response

## 📚 Documentation

### Documentation Guidelines

- Keep documentation up to date
- Use clear, concise language
- Include code examples
- Add screenshots for UI changes
- Update README.md for significant changes

### Documentation Structure

- `README.md` - Project overview and setup
- `CONTRIBUTING.md` - This file
- `CHANGELOG.md` - Version history
- `docs/` - Additional documentation
- JSDoc comments in code

## 🏆 Project Information

### About the Developer

This project was developed by **Amin Momin** as a personal portfolio project to demonstrate:

- **Full-stack development skills** with Next.js and TypeScript
- **AI/ML integration** with Google Gemini
- **OAuth authentication** and security best practices
- **Modern web development** techniques and architecture
- **Database design** and optimization
- **UI/UX design** with responsive interfaces

### Project Goals

- Showcase technical skills and capabilities
- Demonstrate real-world application development
- Highlight modern development practices
- Provide a working example of AI-powered email management

## 📞 Contact Information

### Developer Contact

- **GitHub**: [@aminmomin2](https://github.com/aminmomin2)
- **LinkedIn**: [Amin Momin](https://www.linkedin.com/in/aminmomin1/)
- **Email**: aminmomin2006@gmail.com

### Project Information

- **Repository**: [EmailCleaner on GitHub](https://github.com/aminmomin2/emailcleaner)
- **Live Demo**: Available upon request
- **Documentation**: Comprehensive setup and usage guides included

## 🎯 Development Roadmap

### Current Focus Areas

- [ ] Enhanced AI email analysis
- [ ] Bulk email operations
- [ ] Email templates and automation
- [ ] Advanced filtering options
- [ ] Mobile app development

### Future Features

- [ ] Calendar integration
- [ ] Team collaboration features
- [ ] Advanced analytics
- [ ] API for third-party integrations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**EmailCleaner** - A personal portfolio project by Amin Momin showcasing modern web development and AI integration skills. 🚀
