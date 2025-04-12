const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

app.post('/whatsapp', async (req, res) => {
  const message = req.body.Body || '';
  const from = req.body.From || '';

  try {
    await axios.post(DISCORD_WEBHOOK_URL, {
      content: `New WhatsApp message from ${from}: ${message}`
    });
    res.send('<Response></Response>');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sending to Discord');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
