import { Client, Events, MessageFlags } from "discord.js";
import { INTENTS } from "#src/config/intents";
import { configDotenv } from "dotenv";
import { registerCommands } from "#src/utils/registerCommands";
import { setupCommands } from "#src/utils/setupCommands";

configDotenv();

const client = new Client({
  intents: INTENTS,
});

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}!`);
  await setupCommands(client);
});

client.once(Events.GuildCreate, (guild) => {
  console.log(`Joined a new guild: ${guild.name} (${guild.id})`);
});

client.once(Events.GuildAvailable, async (guild) => {
  console.log(`Available in a new guild: ${guild.name} (${guild.id})`);
  await registerCommands(guild, client);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`Unknown command: ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
  }
});

client.login(process.env.TOKEN);
