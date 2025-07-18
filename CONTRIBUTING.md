# Contributing to MangaRealm 🤝

First off, thank you for considering contributing to MangaRealm! It's people like you that make MangaRealm such a great tool for the manga reading community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Guidelines](#development-guidelines)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Community](#community)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [support@mangarealm.com](mailto:support@mangarealm.com).

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun (recommended)
- Firebase account (free tier available)
- Git
- Basic knowledge of React, Next.js, and TypeScript

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/mangarealm.git
   cd mangarealm
   ```
3. **Install dependencies**:
   ```bash
   bun install
   # or npm install
   ```
4. **Set up environment variables**:
   ```bash
   cp .env.local.template .env.local
   # Edit .env.local with your Firebase configuration
   ```
5. **Start the development server**:
   ```bash
   bun dev
   # or npm run dev
   ```

## 🤝 How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what behavior you expected
- **Include screenshots** if applicable
- **Provide your environment details** (browser, OS, device)

### ✨ Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful** to most MangaRealm users
- **List some other applications where this enhancement exists** if applicable

### 💻 Code Contributions

#### Good First Issues

Look for issues labeled `good first issue` - these are specifically chosen as good entry points for new contributors.

#### Areas We Need Help With

- **UI/UX Improvements**: Better mobile experience, accessibility improvements
- **Performance Optimizations**: Bundle size reduction, loading speed improvements
- **New Features**: Reading modes, social features, advanced search
- **Bug Fixes**: Any reported bugs or issues
- **Documentation**: Improving README, adding code comments, creating tutorials
- **Testing**: Writing unit tests, integration tests, end-to-end tests

## 🛠️ Development Guidelines

### Project Structure

```
mangarealm/
├── app/                    # Next.js 15 App Router
├── components/             # Reusable React components
├── contexts/              # React contexts
├── lib/                   # Utility functions and configurations
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

### Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Backend**: Firebase (Auth, Firestore, Storage)
- **State Management**: React Context API
- **Build Tool**: Bun (recommended) or npm

### Coding Standards

#### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary
- Use proper type imports: `import type { ... }`

#### React Components

- Use functional components with hooks
- Follow the single responsibility principle
- Use proper prop types and interfaces
- Implement proper error boundaries where needed

#### Styling

- Use Tailwind CSS classes for styling
- Follow mobile-first responsive design
- Use CSS custom properties for theme variables
- Maintain consistent spacing and typography

#### File Naming

- Use kebab-case for file names: `user-profile.tsx`
- Use PascalCase for component names: `UserProfile`
- Use camelCase for functions and variables: `getUserData`

### Performance Guidelines

- Implement proper code splitting with dynamic imports
- Optimize images with Next.js Image component
- Use React.memo() for expensive components
- Implement proper loading states and error handling
- Follow Core Web Vitals best practices

## 🔄 Pull Request Process

### Before Submitting

1. **Check existing PRs** to avoid duplicates
2. **Test your changes** thoroughly
3. **Update documentation** if needed
4. **Follow the coding standards**
5. **Write meaningful commit messages**

### PR Guidelines

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the coding standards

3. **Test your changes**:
   ```bash
   bun run build
   bun run lint
   ```

4. **Commit your changes** with descriptive messages:
   ```bash
   git commit -m "feat: add user profile editing functionality"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** with:
   - Clear title and description
   - Reference to related issues
   - Screenshots for UI changes
   - Testing instructions

### PR Review Process

1. **Automated checks** must pass (build, lint, tests)
2. **Code review** by maintainers
3. **Testing** by reviewers if needed
4. **Approval** and merge by maintainers

## 🎨 Style Guidelines

### Git Commit Messages

Use conventional commit format:

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` maintenance tasks

Examples:
```
feat: add dark mode toggle to header
fix: resolve mobile navigation overlay issue
docs: update installation instructions
style: format code with prettier
refactor: extract user authentication logic
test: add unit tests for user profile component
chore: update dependencies to latest versions
```

### Code Comments

- Write clear, concise comments
- Explain **why**, not **what**
- Use JSDoc for function documentation
- Comment complex business logic

### Component Documentation

```typescript
/**
 * UserProfile component for displaying and editing user information
 * 
 * @param user - User object containing profile data
 * @param onUpdate - Callback function called when profile is updated
 * @param isEditable - Whether the profile can be edited
 */
interface UserProfileProps {
  user: User;
  onUpdate: (user: User) => void;
  isEditable?: boolean;
}
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Run specific test file
bun test components/UserProfile.test.tsx
```

### Writing Tests

- Write unit tests for utility functions
- Write component tests for React components
- Write integration tests for complex features
- Use meaningful test descriptions
- Follow AAA pattern (Arrange, Act, Assert)

Example:
```typescript
describe('UserProfile Component', () => {
  it('should display user information correctly', () => {
    // Arrange
    const mockUser = { name: 'John Doe', email: 'john@example.com' };
    
    // Act
    render(<UserProfile user={mockUser} />);
    
    // Assert
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
});
```

## 🌍 Community

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General discussions and questions
- **Discord**: Real-time chat and community support
- **Email**: [support@mangarealm.com](mailto:support@mangarealm.com)

### Getting Help

- Check the [README](README.md) for basic setup
- Search existing issues and discussions
- Ask questions in GitHub Discussions
- Join our Discord community

### Recognition

Contributors will be recognized in:
- README contributors section
- Release notes for significant contributions
- Special contributor badges
- Annual contributor appreciation posts

## 📝 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)

## 🙏 Thank You

Thank you for contributing to MangaRealm! Your efforts help make this project better for everyone in the manga reading community.

---

**Happy Coding! 🚀📚**