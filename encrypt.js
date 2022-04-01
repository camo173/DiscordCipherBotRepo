
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents, Constants } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const morseCode = require('./morseCode');
const rot13 = require('./rot13');
const vigenere = require('./vigenere');

require('dotenv').config();
const mySecret = process.env.DISCORD_TOKEN;

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
        description: 'Encryption type',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'body',
        description: 'Content to encrypt',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'key',
        description: 'Encryption key if required by cipher',
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
        description: 'Decryption type',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'body',
        description: 'Content to decrypt',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'key',
        description: 'Encryption key if required by cipher',
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

const GUILD_ID = '498171865152487424';
const BOT_ID = '958813631905169418';

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

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
  else if (interaction.commandName === 'help'){
    await interaction.reply('Supported Commands:\n\n**/help** - Provides the user with supported commands.\n**/encrypt <type> <body> <key(optional)>** - Allows the user to encrypt their message with one of the supported Ciphers (type). There are currently three supported Ciphers: \nrot13, morseCode, vigenere\nAfter declaring the cipher type, simply type the message you would like to encrypt.\n**/decrypt <type> <body> <key(optional)>** - Allows the user to decrypt a previously encrypted message by specifying the corresponding Cipher type. There are currently three supported Ciphers: \nrot13, morseCode, vigenere\nAfter declaring the cipher type, simply type the message you would like to decrypt.');
  }
  else if (interaction.commandName === 'encrypt') {
    let userMessage = interaction.options.getString('body');
    let type = interaction.options.getString('type');
    let key = interaction.options.getString('key');
    console.log(userMessage);

    //If encrypt command type of rot13, complete encryption
    if (type === 'rot13'){
      let encyrptedMessage = await rot13.convertRot13(userMessage);
      await interaction.reply('User message: ' + userMessage + '\nEncrypted message: ' + encyrptedMessage);
    }
    else if (type === 'morseCode'){
      let encyrptedMessage = await morseCode.convertToMorseCode(userMessage);
      await interaction.reply('User message: ' + userMessage + '\nEncrypted message: ' + encyrptedMessage);
    }
      else if (type === 'vigenere'){
        if (key != null) {
          let encyrptedMessage = await vigenere.convertToVigenere(key, userMessage);
          await interaction.reply('User message: ' + userMessage + '\nEncrypted message: ' + encyrptedMessage);
        }
        else {
          interaction.reply('ERROR! KEY VALUE IS REQUIRED FOR VIGENERE CIPHER');
        }
    }
    else {
      await interaction.reply('Unknown encryption type: ' + type);
    }
  }
  else if(interaction.commandName === 'decrypt'){
    let userMessage = interaction.options.getString('body');
    let type = interaction.options.getString('type');
    let key = interaction.options.getString('key');
    console.log(userMessage);

    if (type === 'morseCode'){
      let encyrptedMessage = await morseCode.convertFromMorseCode(userMessage);
      await interaction.reply('Encrypted message: ' + userMessage + '\nDecrypted message: ' + encyrptedMessage);
    } 
    else if (type === 'rot13'){
      let encyrptedMessage = await rot13.convertRot13(userMessage);
      await interaction.reply('User message: ' + userMessage + '\nDecrypted  message: ' + encyrptedMessage);
    }
      else if (type === 'vigenere') {
        if (key != null) {
          let encyrptedMessage = await vigenere.convertFromVigenere(key, userMessage);
        await interaction.reply('Encrypted message: ' + userMessage + '\nDecrypted message: ' + encyrptedMessage);
        }
        else {
          interaction.reply('ERROR! KEY VALUE IS REQUIRED FOR VIGENERE CIPHER');
        }
      }
    else {
      await interaction.reply('Unknown decryption type: ' + type);
    }
  }
});

client.login(mySecret);