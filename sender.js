const amqp = require('amqplib');

async function send() {
  const queue = process.env.QUEUE_NAME || 'task_queue';
  const messageInterval = parseInt(process.env.MESSAGE_INTERVAL) || 2000;
  const messagePrefix = process.env.MESSAGE_PREFIX || 'Message';
  let messageCount = 1;
  let connection;
  let channel;
  
  // Use environment variables for RabbitMQ configuration
  const rabbitmqHost = process.env.RABBITMQ_HOST || 'localhost';
  const rabbitmqPort = process.env.RABBITMQ_PORT || '5672';
  const rabbitmqUser = process.env.RABBITMQ_USER || 'admin';
  const rabbitmqPass = process.env.RABBITMQ_PASS || 'admin123';
  
  const connectionString = `amqp://${rabbitmqUser}:${rabbitmqPass}@${rabbitmqHost}:${rabbitmqPort}`;

  async function connect() {
    try {
      connection = await amqp.connect(connectionString);
      channel = await connection.createChannel();
      await channel.assertQueue(queue, { durable: true });
      
      console.log(" [*] Sender started. Sending messages continuously...");
      console.log(" [*] Connected to RabbitMQ at:", `${rabbitmqHost}:${rabbitmqPort}`);
      console.log(" [*] Queue:", queue);
      console.log(" [*] Message interval:", messageInterval + "ms");
      console.log(" [*] Environment:", process.env.NODE_ENV || 'development');
      console.log(" [*] Press CTRL+C to stop sending");

      // Send a message every specified interval
      const interval = setInterval(async () => {
        try {
          const msg = `${messagePrefix} #${messageCount} - Hello World! ${new Date().toLocaleTimeString()}`;
          channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
          console.log(` [x] Sent: ${msg}`);
          messageCount++;
        } catch (error) {
          console.error(" [!] Error sending message:", error.message);
        }
      }, messageInterval);

      // Handle graceful shutdown
      process.on('SIGINT', () => {
        clearInterval(interval);
        console.log('\n [*] Sender stopped');
        if (connection) connection.close();
        process.exit(0);
      });

      // Handle connection errors
      connection.on('error', (error) => {
        console.error(" [!] Connection error:", error.message);
      });

      connection.on('close', () => {
        console.log(" [!] Connection closed. Attempting to reconnect...");
        setTimeout(connect, 5000);
      });

    } catch (error) {
      console.error(" [!] Failed to connect to RabbitMQ:", error.message);
      console.log(" [*] Retrying in 5 seconds...");
      setTimeout(connect, 5000);
    }
  }

  connect();
}

send().catch(console.error); 