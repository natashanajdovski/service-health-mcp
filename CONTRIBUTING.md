# Contributing to Service Health MCP Server

First off, thank you for considering contributing to Service Health MCP Server! 🎉

This project was built by a learner with AI assistance, and we welcome contributors of all skill levels. Whether you're a seasoned developer or just starting out, your contributions are valuable.

## 🌟 Ways to Contribute

### 🐛 Bug Reports
Found a bug? Please help us fix it!

**Before submitting:**
- Check if the issue already exists in [Issues](https://github.com/natashanajdovski/service-health-mcp/issues)
- Test with the latest version
- Try to reproduce the issue consistently

**When reporting:**
- Use a clear, descriptive title
- Describe the expected vs actual behavior
- Include steps to reproduce
- Mention your environment (OS, Node.js version, Claude Desktop version)
- Include error messages and logs if applicable

### ✨ Feature Requests
Have an idea for a new feature?

**Before submitting:**
- Check our [Roadmap](README.md#-roadmap) to see if it's already planned
- Search existing [Issues](https://github.com/natashanajdovski/service-health-mcp/issues) and [Discussions](https://github.com/natashanajdovski/service-health-mcp/discussions)

**When requesting:**
- Clearly describe the feature and its use case
- Explain why this would be valuable to the community
- Consider if it fits the project's scope and goals

### 📖 Documentation
Help improve our guides and documentation!

- Fix typos or unclear explanations
- Add missing examples or use cases
- Improve installation instructions
- Create tutorials or learning resources

### 🔧 Code Contributions
Ready to write some code?

**Areas where we especially welcome help:**
- Database health checking (PostgreSQL, MySQL, Redis, MongoDB)
- Additional HTTP features (authentication, custom validation)
- Performance optimizations
- Test coverage improvements
- Bug fixes

## 🚀 Development Setup

### Prerequisites
- **Node.js 18+**
- **TypeScript 5+**
- **Git**
- **Claude Desktop** (for testing)

### Setup Steps

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork:
   git clone https://github.com/yourusername/service-health-mcp.git
   cd service-health-mcp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a development branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-fix-name
   ```

4. **Build and test**
   ```bash
   npm run build
   npm run start  # Test that server starts correctly
   ```

5. **Test with Claude Desktop**
   - Add your development version to Claude Desktop config
   - Test that tools work correctly
   - Verify no regressions in existing functionality

## 🔍 Code Standards

### TypeScript Guidelines
- **Use strict TypeScript** - no `any` types unless absolutely necessary
- **Follow existing patterns** - look at current code structure
- **Add proper type definitions** for new interfaces
- **Use meaningful variable names** - prefer clarity over brevity

### Security Requirements
- **Maintain SSRF protection** - never allow internal network access
- **Validate all inputs** - use Zod schemas for validation
- **Follow secure coding practices** - no hardcoded secrets, proper error handling
- **Test security features** - ensure your changes don't bypass protections

### Code Style
- **Use existing formatting** - follow the project's TypeScript/ESLint configuration
- **Write self-documenting code** - clear function and variable names
- **Add comments for complex logic** - especially security-related code
- **Keep functions focused** - single responsibility principle

### Error Handling
- **Provide meaningful error messages** - help users understand what went wrong
- **Use proper TypeScript error types** - avoid generic Error objects where possible
- **Log appropriately** - helpful for debugging but don't leak sensitive info
- **Fail gracefully** - don't crash the entire server on individual request errors

## 🧪 Testing

### Manual Testing
Before submitting, please test:

1. **Basic functionality**
   ```bash
   npm run build
   npm run start
   ```

2. **Claude Desktop integration**
   - Add to config and restart Claude Desktop
   - Test basic health checks: `"Check if google.com is healthy"`
   - Test error cases: `"Check if localhost is healthy"` (should be blocked)

3. **Edge cases**
   - Invalid URLs
   - Network timeouts
   - Different HTTP methods
   - Custom headers

### Automated Testing
We welcome contributions to improve our test coverage:
- Unit tests for core functionality
- Integration tests for MCP protocol
- Security tests for SSRF protection

## 📝 Commit Guidelines

### Commit Message Format
```
<type>(<scope>): <description>

<optional longer description>

Fixes #<issue-number>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code formatting (no logic changes)
- **refactor**: Code restructuring (no functionality changes)
- **test**: Adding or updating tests
- **security**: Security improvements

### Examples
```
feat(database): add PostgreSQL health checking support

- Implement PostgreSQL connection testing
- Add connection string validation
- Include timeout and retry logic

Fixes #42
```

```
fix(security): prevent bypass of localhost blocking

- Add additional IPv4 validation
- Block hex-encoded IP addresses
- Update tests for edge cases

Fixes #38
```

## 🔄 Pull Request Process

### Before Submitting
1. **Update documentation** if your changes affect usage
2. **Test thoroughly** - both happy path and error cases
3. **Check code quality** - follow our style guidelines
4. **Rebase your branch** if needed to keep history clean

### PR Description
Please include:
- **Clear description** of what your PR does
- **Why this change is needed** (link to issue if applicable)
- **How to test** your changes
- **Screenshots/examples** if UI/output changes
- **Breaking changes** if any

### Review Process
1. **Automated checks** must pass (if we add CI/CD)
2. **Manual review** by maintainers
3. **Testing** of the changes
4. **Approval and merge**

We aim to review PRs within 48-72 hours. Please be patient and responsive to feedback!

## 🎓 Learning Resources

### New to MCP Development?
- [MCP Documentation](https://docs.anthropic.com/en/docs/build-with-claude/mcp)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Our Learning Guide](docs/LEARNING.md) (coming soon!)

### New to Open Source?
- [First Contributions Guide](https://github.com/firstcontributions/first-contributions)
- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

## 🤝 Community Guidelines

### Be Respectful
- **Welcoming environment** - help newcomers feel included
- **Constructive feedback** - focus on code, not people
- **Patient with learners** - we all started somewhere
- **Professional communication** - keep discussions focused and respectful

### Getting Help
- **GitHub Discussions** for questions and ideas
- **Issues** for bugs and feature requests
- **Code comments** for implementation questions

## 🚨 Security Policy

If you discover a security vulnerability, please:

1. **Do NOT open a public issue**
2. **Email the maintainer** directly (if contact info provided)
3. **Provide detailed information** about the vulnerability
4. **Allow time for a fix** before public disclosure

We take security seriously and will respond promptly to legitimate security concerns.

## 📜 License

By contributing to Service Health MCP Server, you agree that your contributions will be licensed under the [MIT License](LICENSE).

## 🙏 Recognition

All contributors will be:
- **Listed in our README** acknowledgments section
- **Credited in release notes** for significant contributions
- **Welcomed as community members** with continued involvement opportunities

## 📞 Questions?

Don't hesitate to ask! You can:
- Open a [Discussion](https://github.com/natashanajdovski/service-health-mcp/discussions) for general questions
- Comment on relevant [Issues](https://github.com/natashanajdovski/service-health-mcp/issues)
- Reach out to maintainers through GitHub

---

**Thank you for contributing to making service monitoring accessible to everyone! 🚀**