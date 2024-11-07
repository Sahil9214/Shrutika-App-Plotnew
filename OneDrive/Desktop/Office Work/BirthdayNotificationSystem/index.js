import express from 'express';
import dotenv from 'dotenv';
import { WebClient } from '@slack/web-api';
import { scheduleBirthdayWishes } from './slackBot.js';

dotenv.config();

const app = express();
const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

// Test function
const testSlackConnection = async () => {
    try {
        // Test authentication
        const auth = await slack.auth.test();
        console.log('✅ Bot authenticated as:', auth.user);

        // Test message sending
        await slack.chat.postMessage({
            channel: process.env.SLACK_CHANNEL_ID,
            text: "🎉 Birthday notification system is now connected!"
        });
        console.log('✅ Test message sent successfully');
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.data?.error === 'missing_scope') {
            console.error('Required scopes:', error.data.needed);
            console.error('Current scopes:', error.data.provided);
        }
    }
};

// Run test before starting scheduler
await testSlackConnection();

// Initialize birthday scheduler
scheduleBirthdayWishes();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Birthday wish scheduler is active');
});
