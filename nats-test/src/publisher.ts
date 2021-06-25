import nats from 'node-nats-streaming';

// publishes events
console.clear();

const stan = nats.connect('ticketing', 'abc', {
    url: "http://localhost:4222"
});

stan.on('connect', () => {
    console.log("Publisher connected to NATS");

    const data = JSON.stringify({
        id: '123',
        title: 'concert',
        price: 20
    });

    // publishing data to the channel "ticket:created"
    stan.publish('ticket:created', data, () => {
        console.log("Event published");
    });

});