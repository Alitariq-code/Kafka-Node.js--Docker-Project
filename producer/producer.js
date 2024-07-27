const kafka = require('kafka-node');
const Producer = kafka.Producer;
const KeyedMessage = kafka.KeyedMessage;
const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' });
const producer = new Producer(client);

producer.on('ready', function () {
  console.log('Producer is ready');
  setInterval(() => {
    let payloads = [
      { topic: 'test', messages: 'Hello Kafka' },
    ];
    producer.send(payloads, (err, data) => {
      if (err) {
        console.error('Error publishing message:', err);
      } else {
        console.log('Message published:', data);
      }
    });
  }, 10000);
});

producer.on('error', function (err) {
  console.error('Producer error:', err);
});
