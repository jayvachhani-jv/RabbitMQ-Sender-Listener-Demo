# Contributing to RabbitMQ Sender/Listener Demo

Thank you for your interest in contributing to this project! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites
- Node.js (v14.0.0 or higher)
- Docker and Docker Compose
- Git

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/RabbitMQ-Sender-Listener-Demo.git`
3. Navigate to the project: `cd RabbitMQ-Sender-Listener-Demo`
4. Install dependencies: `npm install`
5. Setup local environment: `npm run setup:local`

## Development Workflow

### Making Changes
1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test your changes:
   ```bash
   npm run test:local
   npm run start:local
   ```
4. Commit your changes: `git commit -m 'Add your feature description'`
5. Push to your fork: `git push origin feature/your-feature-name`
6. Create a Pull Request

### Code Style Guidelines
- Use consistent indentation (2 spaces)
- Follow existing code patterns
- Add comments for complex logic
- Update documentation for new features
- Test your changes thoroughly

### Testing
Before submitting a PR, ensure:
- [ ] All tests pass: `npm run test:local`
- [ ] Local development works: `npm run start:local`
- [ ] Docker setup works: `npm run setup:docker`
- [ ] Documentation is updated
- [ ] No console errors or warnings

## Project Structure

### Key Files
- `sender.js` - Message producer
- `listener.js` - Message consumer
- `test-connection.js` - Connection testing
- `package.json` - Project configuration
- `env.local` / `env.docker` - Environment configs
- `docker-compose.yml` - Docker configurations

### Adding New Features
1. **Environment Variables**: Add to `env.local` and `env.docker`
2. **New Scripts**: Add to `package.json` scripts section
3. **Documentation**: Update README.md and relevant docs
4. **Tests**: Add test cases to `test-connection.js` if needed

## Issue Reporting

### Bug Reports
When reporting bugs, please include:
- Operating system and version
- Node.js version
- Docker version (if applicable)
- Steps to reproduce
- Expected vs actual behavior
- Error messages and logs

### Feature Requests
When requesting features, please include:
- Description of the feature
- Use case and benefits
- Implementation suggestions (if any)
- Priority level

## Pull Request Guidelines

### Before Submitting
- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] No breaking changes (or clearly documented)
- [ ] Commit messages are clear and descriptive

### PR Description
Include:
- Summary of changes
- Testing performed
- Screenshots (if UI changes)
- Related issues

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the project's coding standards

## Getting Help

- Check the [README.md](README.md) for setup instructions
- Review existing issues and PRs
- Ask questions in issues or discussions
- Contact the maintainer for urgent issues

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🎉 