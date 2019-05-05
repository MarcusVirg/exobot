module.exports = function(controller) {
  controller.hears(
    message => message.intent === 'sharing_get',
    'message',
    async (bot, message) => {
      await bot.reply(message, 'Sharing stuff ;)')
    }
  )
}
