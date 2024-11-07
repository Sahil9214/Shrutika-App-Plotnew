import { WebClient } from '@slack/web-api';
import schedule from 'node-schedule';
import dotenv from 'dotenv';
import { neuralHQMemberBirthdays } from './utils/db.js';

dotenv.config();

const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

const getBirthdayWishMessage = (person) => {
    const wishes = [

        `🎈 Wishing our amazing  ${person.name} a fantastic birthday! 🎊`,
        `🎈 Wishing our amazing  ${person.name} a fantastic birthday! 🎊`,
        `🎂 Happy Birthday to the incredible ${person.name}! Thank you for being an awesome part of our team! ✨`
    ];
    return wishes[Math.floor(Math.random() * wishes.length)];
};

const sendBirthdayWish = async (person) => {
    try {
        await slack.chat.postMessage({
            channel: process.env.SLACK_CHANNEL_ID,
            text: getBirthdayWishMessage(person),
            blocks: [
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: getBirthdayWishMessage(person)
                    }
                },
                {
                    type: "image",
                    image_url: person.image,
                    alt_text: `${person.name}'s photo`
                }
            ]
        });
        console.log(`Birthday wish sent for ${person.name} at ${new Date().toLocaleString()}`);
    } catch (error) {
        console.error('Error sending birthday wish:', error);
    }
};

const checkAndSendWishes = () => {
    const now = new Date();
    const currentDay = now.getDate().toString().padStart(2, '0');
    const currentMonth = (now.getMonth() + 1).toString().padStart(2, '0');
    const currentHour = now.getHours().toString().padStart(2, '0');
    const currentMinute = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${currentHour}:${currentMinute}`;
    const currentDate = `${currentDay}-${currentMonth}`;

    console.log(`Checking for birthdays at ${currentDate} ${currentTime}`);

    neuralHQMemberBirthdays.forEach(person => {
        if (person.wishDate === currentDate && person.wishTime === currentTime) {
            console.log(`Found birthday match for ${person.name}`);
            sendBirthdayWish(person);
        }
    });
};

const scheduleBirthdayWishes = () => {
    // Check every minute
    schedule.scheduleJob('* * * * *', checkAndSendWishes);
    console.log('Birthday wish scheduler started');
};

export { scheduleBirthdayWishes }; 