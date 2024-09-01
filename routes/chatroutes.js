const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { Message } = require('../db'); // Adjust path if necessary
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

router.post('/chat', async (req, res) => {
  const { userId, prompt } = req.body;

  try {
    // Retrieve or create message history for the user
    let userMessages = await Message.findOne({ userId });

    if (!userMessages) {
      userMessages = new Message({ userId, messages: [] });
    }

    const history = userMessages.messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    // Initialize chat model with the conversation history
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const chat = model.startChat({
      history,
      generationConfig: { maxOutputTokens: 100 },
    });

    // Send the new message
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    // Store the new message and response
    userMessages.messages.push({ role: 'user', content: prompt });
    userMessages.messages.push({ role: 'model', content: text });
    await userMessages.save();

    res.send(text);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
