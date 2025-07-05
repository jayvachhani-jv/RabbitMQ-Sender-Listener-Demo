const amqp = require('amqplib');

async function listen() {
  const queue = process.env.QUEUE_NAME || 'task_queue';
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
      channel.prefetch(1);

      console.log(" [*] Listener started. Waiting for messages in %s.", queue);
      console.log(" [*] Connected to RabbitMQ at:", `${rabbitmqHost}:${rabbitmqPort}`);
      console.log(" [*] Queue:", queue);
      console.log(" [*] Environment:", process.env.NODE_ENV || 'development');
      console.log(" [*] Press CTRL+C to stop listening");

      channel.consume(queue, function(msg) {
        if (msg !== null) {
          console.log(" [x] Received: %s", msg.content.toString());
          // Simulate processing time
          setTimeout(() => {
            try {
              channel.ack(msg);
              console.log(" [✓] Message acknowledged");
            } catch (error) {
              console.error(" [!] Error acknowledging message:", error.message);
            }
          }, 1000);
        }
      }, { noAck: false });

      // Handle graceful shutdown
      process.on('SIGINT', () => {
        console.log('\n [*] Listener stopped');
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

listen().catch(console.error); 