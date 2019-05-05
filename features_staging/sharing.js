module.exports = function(controller, wit) {
  controller.hears(
    ['sharing_get', 'contact', 'attribute'],
    'message',
    wit.hears,
    (bot, message) => {
      console.log(message.intents)
      bot.reply(message, { text: 'Does some sharing stuff' })
    }
  )
}
