const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// CREATE CLIENT FIRST
const client = new Client({
    authStrategy: new LocalAuth()
});

// Store user states
const userState = {};

// QR
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Ready
client.on('ready', () => {
    console.log('Bot is ready');
});

// MESSAGE HANDLER
client.on('message', message => {

    if (message.fromMe) return;
    if (message.from === 'status@broadcast') return;

    const msg = message.body.toLowerCase().trim();
    const user = message.from;

    if (!userState[user]) {
        userState[user] = { step: 'menu' };
    }

    if (msg === 'hi' || msg === 'menu') {
        userState[user].step = 'menu';

        return message.reply(
`Welcome

1️⃣ Service Request  
2️⃣ Service Timings  
3️⃣ Request Call  
4️⃣ My Query Not Listed Here  

Reply with number`
        );
    }

    else if (msg === '1') {
        return message.reply('📚 Your Service Request Ticket Successfully Generated');
    }

    else if (msg === '2') {
        return message.reply('Service Time\n10:00 AM - 10:00 PM');
    }

    else if (msg === '3') {
        return message.reply(
`📞 You will get a call from:
+91 8420633575
+91 8420633207
+91 8584063443`
        );
    }

    else if (msg === '4') {
        userState[user].step = 'query';
        return message.reply('📝 Please type your query...');
    }

    else if (userState[user].step === 'query') {
        console.log(`User Query from ${user}: ${message.body}`);

        userState[user].step = 'done';

        return message.reply(
            '✅ Thank you! Our executive will contact you in a few minutes.'
        );
    }

    else {
        return message.reply('Type "Hi" to start 😊');
    }
});

// ✅ INITIALIZE AT END
client.initialize();