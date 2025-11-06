const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');

const token = 'ضع_توكن_البوت_هنا';
const bot = new TelegramBot(token, { polling: true });

// زرار البداية
bot.onText(/\/start/, (msg) => {
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🔍 Search medicine', callback_data: 'search_medicine' }],
        [{ text: '📞 Contact support', callback_data: 'contact_support' }]
      ]
    }
  };
  bot.sendMessage(msg.chat.id, 'مرحباً بك في صيدلية الذكاء الاصطناعي 💊', opts);
});

// تنفيذ زرار البحث
bot.on('callback_query', async (query) => {
  const action = query.data;
  
  if (action === 'search_medicine') {
    bot.sendMessage(query.message.chat.id, 'اكتب اسم الدواء اللي بتدور عليه:');
    
    bot.once('message', async (msg) => {
      const name = msg.text;
      const response = await fetch(`http://localhost:8080/api/medicine?name=${name}`);
      const data = await response.json();

      if (data.error || data.message) {
        bot.sendMessage(msg.chat.id, 'الدواء غير متوفر حالياً ❌');
      } else {
        bot.sendMessage(msg.chat.id, `
💊 *${data.name}*
💵 السعر: ${data.price} جنيه
📦 المتاح: ${data.stock} عبوة
🏥 الفرع: ${data.branch}
📝 الوصف: ${data.description}
        `, { parse_mode: 'Markdown' });
      }
    });
  }

  else if (action === 'contact_support') {
    bot.sendMessage(query.message.chat.id, '📞 للتواصل مع الدعم الفني، من فضلك أرسل مشكلتك وسيتم الرد قريباً.');
  }
});
