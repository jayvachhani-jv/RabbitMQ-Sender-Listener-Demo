# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-19

### Added
- Initial release of RabbitMQ Sender/Listener Demo
- Message producer (sender.js) with configurable intervals
- Message consumer (listener.js) with reconnection logic
- Connection test utility (test-connection.js)
- Docker support with docker-compose configurations
- Environment-specific configurations (local and Docker)
- Setup scripts for Windows (.bat) and Unix/Linux (.sh)
- Comprehensive documentation and troubleshooting guide
- Message persistence with durable queues
- Robust error handling and automatic reconnection
- Health checks for Docker containers
- Support for horizontal scaling of listeners

### Features
- **Local Development**: RabbitMQ in Docker, apps run locally
- **Docker Production**: Complete containerized setup
- **Environment Isolation**: Separate configs for different environments
- **Easy Setup**: One-command setup scripts
- **Flexible Configuration**: Customizable message intervals and prefixes
- **Message Persistence**: Messages survive RabbitMQ restarts
- **Auto-reconnection**: Automatic reconnection on connection loss
- **Health Monitoring**: Container health checks
- **Management UI**: RabbitMQ Management interface access

### Technical Details
- Node.js with amqplib for RabbitMQ communication
- Docker Compose for container orchestration
- Environment variables for configuration
- Concurrent execution support
- Graceful shutdown handling
- Comprehensive logging and error reporting

## [Unreleased]

### Planned
- Web-based management interface
- Message filtering and routing
- Performance monitoring and metrics
- Kubernetes deployment manifests
- Message encryption support
- Advanced queue configurations 