module.exports = function(controller) {
  controller.hears(
    ['why?', 'why', 'why though?'],
    'message',
    async (bot, message) => {
      await bot.reply(
        message,
        'I am not sure.. maybe you should try asking yourself that question.'
      )
    }
  )
  controller.on('message', async (bot, message) => {
    console.log(message, message.intent)
    await bot.reply(message, {
      text:
        "I guess I am not smart enough to understand what you are saying... Sorry :(.\nType 'help' for a useful list of actions. I will try to be better in the future.",
      quick_replies: [
        {
          title: 'Help',
          payload: 'help'
        }
      ]
    })
  })
}
