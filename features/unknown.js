module.exports = function(controller) {
  controller.on('message', function(bot, message) {
    console.log(message, message.intent)
    bot.reply(message, {
      text:
        "I guess I am not smart enough to understand what you are saying... Sorry :(.\nType 'help' for a useful list of actions. I will try and be better.",
      quick_replies: [
        {
          title: 'Help',
          payload: 'help'
        }
      ]
    })
  })
}
