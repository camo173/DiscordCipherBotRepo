
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents, Constants } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const morseCode = require('./morseCode');
const rot13 = require('./rot13');
const vigenere = require('./vigenere');
const GUILD_ID = '498171865152487424';
const BOT_ID = '958813631905169418';

require('dotenv').config();
const mySecret = process.env.DISCORD_TOKEN;

// register the '/' commands
const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!'
  },
  {
    name: 'encrypt',
    description: 'Encrypts your message!',
    options: [
      {
        name: 'type',
        description: 'Encryption type, options include: rot13, morseCode, or vigenere',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'body',
        description: 'Message to encrypt',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'key',
        description: 'Encryption key (only required by the vigenere cipher)',
        required: false,
        type: Constants.ApplicationCommandOptionTypes.STRING
      }
    ]
  },
  {
    name: 'decrypt',
    description: 'Decrypts your message!',
    options: [
      {
        name: 'type',
        description: 'Decryption type, options include: rot13, morseCode, or vigenere',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'body',
        description: 'Message to decrypt',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'key',
        description: 'Decryption key (only required by the vigenere cipher)',
        required: false,
        type: Constants.ApplicationCommandOptionTypes.STRING
      }
    ]
  },
  {
    name: 'help',
    description: 'Shows available commands',
  }
]; 

const rest = new REST({ version: '9' }).setToken(mySecret);

// try to add the slash commands and reload the application
(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(BOT_ID, GUILD_ID),
      { body: commands }
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

// once the bot is ready, print to console that it is ready and logged in
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// register the handling for the slash commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
  else if (interaction.commandName === 'help'){ // show help menu
    await interaction.reply({content: 'Supported Commands:\n\n**/help** - Provides the user with supported commands.\n**/encrypt <type> <body> <key(optional)>** - Allows the user to encrypt their message with one of the supported Ciphers (type). There are currently three supported Ciphers: \nrot13, morseCode, vigenere\nAfter declaring the cipher type, simply type the message you would like to encrypt.\n**/decrypt <type> <body> <key(optional)>** - Allows the user to decrypt a previously encrypted message by specifying the corresponding Cipher type. There are currently three supported Ciphers: \nrot13, morseCode, vigenere\nAfter declaring the cipher type, simply type the message you would like to decrypt.', ephemeral: true});
    console.log('Used the /help command');
  }
  
  
  else if (interaction.commandName === 'encrypt') { // encrypt message
    let userMessage = interaction.options.getString('body');
    let type = interaction.options.getString('type');
    let key = interaction.options.getString('key');
    console.log(userMessage);
    console.log('Used the /encrypt command');

    //If encrypt command type of rot13, complete encryption
    if (type === 'rot13'){ // rot13 cipher
      // call the rot13 encryption cipher from rot13.js
      let encyrptedMessage = await rot13.convertRot13(userMessage);
      let fullMessage = 'User message: ' + userMessage + '\nEncrypted message: ' + encyrptedMessage;
      
      // wait until there is a response from the bot before sending a reply
      // epemeral option is to make the message invisible to everyone but the sender
      await interaction.reply({content: fullMessage, ephemeral: true});
    }
    else if (type === 'morseCode'){ // morse code cipher
      // call the morse code encryption cipher from morseCode.js
      let encyrptedMessage = await morseCode.convertToMorseCode(userMessage);
      let fullMessage = 'User message: ' + userMessage + '\nEncrypted message: ' + encyrptedMessage;

      // wait until there is a response from the bot before sending a reply
      // epemeral option is to make the message invisible to everyone but the sender
      await interaction.reply({content: fullMessage, ephemeral: true});
    }
    else if (type === 'vigenere'){ // vigenere cipher
      if (key != null) { // if the user entered a key (required for this cipher)
        // call the vigenere encryption cipher from vigenere.js
        let encyrptedMessage = await vigenere.convertToVigenere(key, userMessage);
        let fullMessage = 'User message: ' + userMessage + '\nEncrypted message: ' + encyrptedMessage + '\nKey: ' + key;
        
        // wait until there is a response from the bot before sending a reply
        // epemeral option is to make the message invisible to everyone but the sender
        await interaction.reply({content: fullMessage, ephemeral: true});
      }
      else { // if the user did not enter a key (required for this cipher)
        interaction.reply({content: 'ERROR! KEY VALUE IS REQUIRED FOR VIGENERE CIPHER', ephemeral: true});
      }
    }
    else { // any other input than rot13, morseCode, or vigenere
      let fullMessage = 'Unknown encryption type: ' + type;
      await interaction.reply({content: fullMessage, ephemeral: true});
    }
  }
  
  
  else if(interaction.commandName === 'decrypt'){ // decrypt message
    let userMessage = interaction.options.getString('body');
    let type = interaction.options.getString('type');
    let key = interaction.options.getString('key');
    console.log(userMessage);
    console.log('Used the /decrypt command');

    if (type === 'rot13'){ // rot13 cipher
      let decyrptedMessage = await rot13.convertRot13(userMessage);
      let fullMessage = 'Encrypted message: ' + userMessage + '\nDecrypted message: ' + decyrptedMessage

       // wait until there is a response from the bot before sending a reply
       // epemeral option is to make the message invisible to everyone but the sender
      await interaction.reply({content: fullMessage, ephemeral: true});
    }
    else if (type === 'morseCode'){ // morse code cipher
      let decyrptedMessage = await morseCode.convertFromMorseCode(userMessage);
      let fullMessage = 'Encrypted message: ' + userMessage + '\nDecrypted message: ' + decyrptedMessage

       // wait until there is a response from the bot before sending a reply
       // epemeral option is to make the message invisible to everyone but the sender
      await interaction.reply({content: fullMessage, ephemeral: true});
    } 
    else if (type === 'vigenere') {
      if (key != null) { // if the user entered a key (required for this cipher)
        let decyrptedMessage = await vigenere.convertFromVigenere(key, userMessage);
        let fullMessage = 'Encrypted message: ' + userMessage + '\nDecrypted message: ' + decyrptedMessage + '\nKey: ' + key

       // wait until there is a response from the bot before sending a reply
       // epemeral option is to make the message invisible to everyone but the sender
        await interaction.reply({content: fullMessage, ephemeral: true});
      }
      else { // if the user did not enter a key (required for this cipher)
        interaction.reply({content: 'ERROR! KEY VALUE IS REQUIRED FOR VIGENERE CIPHER', ephemeral: true});
      }
    }
    else { // any other input than rot13, morseCode, or vigenere
      let fullMessage = 'Unknown encryption type: ' + type;
      await interaction.reply({content: fullMessage, ephemeral: true});
    }
  }
});

client.login(mySecret);
