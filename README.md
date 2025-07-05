# RabbitMQ Sender/Listener Demo

**Owner/Creator**: Jay Vachhani  
**Created**: 2024  
**Version**: 1.0.0  
**License**: MIT  

This project demonstrates a robust message queue system using RabbitMQ with two Node.js servers:

- **Sender**: Publishes messages to a RabbitMQ queue.
- **Listener**: Consumes messages from the queue. If the Listener is down, messages accumulate in RabbitMQ and are delivered when it comes back up.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/) (for cloning the repository)

### Clone the Repository

```bash
# Clone the repository
git clone https://github.com/jayvachhani-jv/RabbitMQ-Sender-Listener-Demo.git

# Navigate to the project directory
cd RabbitMQ-Sender-Listener-Demo

# Verify the project structure
ls -la
```

### Quick Setup Options

#### Option 1: One-Click Setup

**Windows:**
```bash
# For Local Development
setup-local.bat

# For Docker Production
setup-docker.bat
```

**Unix/Linux/macOS:**
```bash
# Make scripts executable (first time only)
chmod +x setup-local.sh setup-docker.sh

# For Local Development
./setup-local.sh

# For Docker Production
./setup-docker.sh
```

#### Option 2: Manual Setup

**For Local Development:**
```bash
# 1. Install dependencies
npm install

# 2. Setup local environment
npm run setup:local

# 3. Run the application
npm run start:local
```

**For Docker Production:**
```bash
# 1. Install dependencies
npm install

# 2. Setup Docker environment
npm run setup:docker

# 3. Monitor logs
docker-compose -f docker-compose.app.yml logs -f
```

### Verify Installation

After setup, test the connection:

```bash
# For local development
npm run test:local

# For Docker
npm run test:docker
```

You should see: `🎉 All tests passed! RabbitMQ is working correctly.`

### Access Points

- **RabbitMQ Management UI**: http://localhost:15672
  - Username: `admin`
  - Password: `admin123`
- **AMQP Port**: 5672
- **Management Port**: 15672

## Environment Configuration

The project supports multiple environment configurations:

### Environment Files
- `env.local` - Local development configuration
- `env.docker` - Docker container configuration
- `env.example` - Example configuration template

### Environment Variables
- `RABBITMQ_HOST` - RabbitMQ server hostname/IP
- `RABBITMQ_PORT` - RabbitMQ AMQP port
- `RABBITMQ_USER` - RabbitMQ username
- `RABBITMQ_PASS` - RabbitMQ password
- `QUEUE_NAME` - Queue name for messages
- `NODE_ENV` - Application environment (development/production)
- `MESSAGE_INTERVAL` - Interval between messages (milliseconds)
- `MESSAGE_PREFIX` - Prefix for message content

### Connection Pattern
```
amqp://[username]:[password]@[host]:[port]
```

## Quick Start

### Option 1: Local Development (Recommended for Development)

1. **Setup local environment:**
   ```bash
   npm run setup:local
   ```
   This will:
   - Install dependencies
   - Start RabbitMQ in Docker
   - Wait for RabbitMQ to be ready
   - Test the connection

2. **Run the application:**
   ```bash
   # Run both sender and listener
   npm run start:local
   
   # Or run them separately
   npm run start:sender:local
   npm run start:listener:local
   ```

3. **Test connection:**
   ```bash
   npm run test:local
   ```

### Option 2: Docker (Recommended for Production)

1. **Setup Docker environment:**
   ```bash
   npm run setup:docker
   ```
   This will:
   - Install dependencies
   - Start all services (RabbitMQ + Sender + Listener) in Docker

2. **Test connection:**
   ```bash
   npm run test:docker
   ```

3. **View logs:**
   ```bash
   docker-compose -f docker-compose.app.yml logs -f
   ```

## Available Scripts

### Local Development Scripts
- `npm run setup:local` - Setup local development environment
- `npm run start:local` - Run both sender and listener locally
- `npm run start:sender:local` - Run only sender locally
- `npm run start:listener:local` - Run only listener locally
- `npm run test:local` - Test connection with local config

### Docker Scripts
- `npm run setup:docker` - Setup Docker environment
- `npm run start:sender:docker` - Run sender with Docker config
- `npm run start:listener:docker` - Run listener with Docker config
- `npm run test:docker` - Test connection with Docker config

### General Scripts
- `npm run start:dev` - Run both services (uses default config)
- `npm run start:sender` - Run sender (uses default config)
- `npm run start:listener` - Run listener (uses default config)
- `npm run test` - Test connection (uses default config)
- `npm run cleanup` - Stop services and clean up Docker

### Docker Management
- `npm run docker:rabbitmq` - Start only RabbitMQ in Docker
- `npm run docker:rabbitmq:stop` - Stop RabbitMQ Docker container
- `npm run docker:run` - Start all services in Docker
- `npm run docker:stop` - Stop all Docker services

## Configuration Examples

### Local Development (env.local)
```bash
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_USER=admin
RABBITMQ_PASS=admin123
QUEUE_NAME=task_queue
NODE_ENV=development
MESSAGE_INTERVAL=2000
MESSAGE_PREFIX=Message
```

### Docker Production (env.docker)
```bash
RABBITMQ_HOST=rabbitmq
RABBITMQ_PORT=5672
RABBITMQ_USER=admin
RABBITMQ_PASS=admin123
QUEUE_NAME=task_queue
NODE_ENV=production
MESSAGE_INTERVAL=2000
MESSAGE_PREFIX=Message
```

## Usage Examples

### Development Workflow
```bash
# 1. Setup environment
npm run setup:local

# 2. Start listener in one terminal
npm run start:listener:local

# 3. Start sender in another terminal
npm run start:sender:local

# 4. Test connection
npm run test:local
```

### Production Workflow
```bash
# 1. Setup Docker environment
npm run setup:docker

# 2. Monitor logs
docker-compose -f docker-compose.app.yml logs -f

# 3. Scale services (optional)
docker-compose -f docker-compose.app.yml up --scale listener=3
```

### Testing Message Persistence
1. Start the listener: `npm run start:listener:local`
2. Stop the listener (press `CTRL+C`)
3. Send messages: `npm run start:sender:local`
4. Restart the listener: `npm run start:listener:local`
5. Observe all pending messages being processed

## Troubleshooting

### Common Issues

1. **Connection refused:**
   ```bash
   # Make sure RabbitMQ is running
   npm run docker:rabbitmq
   # Wait a few seconds, then test
   npm run test:local
   ```

2. **Port already in use:**
   ```bash
   # Stop existing containers
   npm run cleanup
   # Start fresh
   npm run setup:local
   ```

3. **Environment variables not loading:**
   ```bash
   # Install dotenv-cli if not installed
   npm install dotenv-cli --save-dev
   # Use environment-specific commands
   npm run start:local
   ```

4. **Docker not running:**
   ```bash
   # Start Docker Desktop
   # Then run setup
   npm run setup:local
   ```

5. **Permission denied:**
   ```bash
   # On Linux/Mac, you might need sudo for Docker
   sudo docker-compose up -d
   ```

### Environment-Specific Commands

| Action | Local | Docker |
|--------|-------|--------|
| Setup | `npm run setup:local` | `npm run setup:docker` |
| Start Both | `npm run start:local` | `npm run docker:run` |
| Start Sender | `npm run start:sender:local` | `npm run start:sender:docker` |
| Start Listener | `npm run start:listener:local` | `npm run start:listener:docker` |
| Test | `npm run test:local` | `npm run test:docker` |
| Stop | `npm run cleanup` | `npm run docker:stop` |

## Project Structure

```
RabbitMQ-Sender-Listener-Demo/
├── sender.js                 # Message producer
├── listener.js               # Message consumer
├── test-connection.js        # Connection test utility
├── package.json              # Project configuration
├── env.local                 # Local development config
├── env.docker                # Docker environment config
├── env.example               # Example environment template
├── setup-local.bat           # Windows local setup script
├── setup-docker.bat          # Windows Docker setup script
├── setup-local.sh            # Unix/Linux local setup script
├── setup-docker.sh           # Unix/Linux Docker setup script
├── docker-compose.yml        # RabbitMQ only setup
├── docker-compose.app.yml    # Complete Docker setup
├── Dockerfile                # Node.js application container
├── .gitignore                # Git ignore rules
├── README.md                 # This file
├── CHANGELOG.md              # Project changelog
├── CONTRIBUTING.md           # Contributing guidelines
└── LICENSE                   # MIT License
```

## Creator Information

### Project Details
- **Creator Pattern**: Node.js + RabbitMQ Message Queue System
- **Architecture**: Producer-Consumer Pattern
- **Message Persistence**: Durable queues with persistent messages
- **Scalability**: Horizontal scaling support for multiple listeners
- **Environment Support**: Local development and Docker production

### Contact Information
- **Maintainer**: Jay Vachhani
- **Email**: [jayvachhani1999@gmail.com]
- **Repository**: [GitHub/GitLab URL]
- **Documentation**: [Documentation URL if available]

## How It Works
- **Durable queue** and **persistent messages** ensure messages are not lost if RabbitMQ or the listener restarts.
- The sender does not require the listener to be online; messages are queued until the listener is available.
- **Unique message IDs** help track message processing order.
- **Continuous sending** demonstrates real-world message flow.
- **Robust error handling** with automatic reconnection logic.
- **Health checks** ensure services are properly monitored in Docker environments.
- **Environment-specific configurations** allow seamless switching between local and Docker environments.

## Files
- `sender.js` — Sends messages to the queue with configurable intervals and prefixes.
- `listener.js` — Listens for and processes messages from the queue with reconnection logic.
- `test-connection.js` — Tests RabbitMQ connection and basic functionality.
- `package.json` — Project configuration and dependencies with environment-specific scripts.
- `env.local` — Local development environment configuration.
- `env.docker` — Docker environment configuration.
- `env.example` — Example environment variables configuration.
- `setup-local.bat` / `setup-local.sh` — Cross-platform local setup scripts.
- `setup-docker.bat` / `setup-docker.sh` — Cross-platform Docker setup scripts.
- `Dockerfile` — Container configuration for the Node.js application.
- `docker-compose.yml` — RabbitMQ only setup.
- `docker-compose.app.yml` — Complete setup with RabbitMQ, Sender, and Listener.
- `CHANGELOG.md` — Project version history and changes.
- `CONTRIBUTING.md` — Guidelines for contributors.
- `.gitignore` — Git ignore rules for Node.js projects.

## Deployment Information

### Production Deployment
- **Recommended Host**: Docker containers
- **Load Balancer**: Nginx (optional)
- **Monitoring**: RabbitMQ Management UI
- **Logging**: Console logs with timestamps
- **Environment**: Use `env.docker` configuration

### Development Environment
- **Local Host**: localhost:5672
- **Management UI**: localhost:15672
- **Development Tools**: Node.js, Docker Desktop
- **Environment**: Use `env.local` configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- RabbitMQ team for the excellent message broker
- Node.js community for the amqplib package
- Docker team for containerization tools

---

**Note**: Replace the placeholder information (marked with [brackets]) with your actual details before sharing or deploying this project. 