const amqp = require('amqplib');

async function testConnection() {
  const queue = process.env.QUEUE_NAME || 'task_queue';
  
  // Use environment variables for RabbitMQ configuration
  const rabbitmqHost = process.env.RABBITMQ_HOST || 'localhost';
  const rabbitmqPort = process.env.RABBITMQ_PORT || '5672';
  const rabbitmqUser = process.env.RABBITMQ_USER || 'admin';
  const rabbitmqPass = process.env.RABBITMQ_PASS || 'admin123';
  
  const connectionString = `amqp://${rabbitmqUser}:${rabbitmqPass}@${rabbitmqHost}:${rabbitmqPort}`;

  try {
    console.log('Testing RabbitMQ connection...');
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('Connection string:', connectionString);
    
    const connection = await amqp.connect(connectionString);
    console.log('✓ Successfully connected to RabbitMQ');
    
    const channel = await connection.createChannel();
    console.log('✓ Successfully created channel');
    
    await channel.assertQueue(queue, { durable: true });
    console.log(`✓ Successfully asserted queue: ${queue}`);
    
    // Send a test message
    const testMessage = `Test message - ${new Date().toISOString()}`;
    channel.sendToQueue(queue, Buffer.from(testMessage), { persistent: true });
    console.log('✓ Successfully sent test message');
    
    // Consume the test message
    const msg = await channel.get(queue);
    if (msg) {
      console.log('✓ Successfully received test message:', msg.content.toString());
      channel.ack(msg);
      console.log('✓ Successfully acknowledged test message');
    } else {
      console.log('⚠ No message found in queue');
    }
    
    await connection.close();
    console.log('✓ Successfully closed connection');
    console.log('\n🎉 All tests passed! RabbitMQ is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\nTroubleshooting tips:');
    console.log('1. Make sure RabbitMQ is running');
    console.log('2. Check your environment variables');
    console.log('3. Verify credentials are correct');
    console.log('4. Ensure ports are accessible');
    console.log('5. For local development: npm run setup:local');
    console.log('6. For Docker: npm run setup:docker');
    process.exit(1);
  }
}

testConnection(); 