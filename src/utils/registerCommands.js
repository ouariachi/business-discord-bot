import { REST } from "discord.js";
import { getCommands } from "#src/utils/getCommands";

/**
 * @param {import("discord.js").Guild} guild
 * @param {import("discord.js").Client} client
 */
export async function registerCommands(guild, client) {
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  const commands = await getCommands(true, false);
  if (!commands.length) return;

  try {
    console.log(`Registering application commands in ${guild.name} (${guild.id})...`);

    if (!guild.commands)
      throw new Error(`Cannot register application commands in ${guild.name} (${guild.id}): guild.commands is undefined.`);

    const response = await guild.commands.fetch();

    // Comandos a crear (que no existen en Discord)
    const newCommands = commands.filter(
      (command) => !response.some((cmd) => cmd.name === command.name)
    );

    // Comandos a actualizar (que existen pero han cambiado)
    const commandsToUpdate = commands.filter((command) => {
      const existingCommand = response.find((cmd) => cmd.name === command.name);
      return existingCommand && hasChanges(existingCommand, command);
    });

    if (newCommands.length) {
      for (const command of newCommands) {
        console.log(`Registering command: ${command.name}`);
        await guild.commands.create(command);
      }
      console.log(`Successfully registered ${newCommands.length} application commands in ${guild.name} (${guild.id})!`);
    } else {
      console.log(`No new application commands to register in ${guild.name} (${guild.id}).`);
    }

    if (commandsToUpdate.length) {
      for (const command of commandsToUpdate) {
        const existingCommand = response.find((cmd) => cmd.name === command.name);
        console.log(`Updating application command ${command.name} in ${guild.name} (${guild.id})`);
        await guild.commands.edit(existingCommand.id, command);
      }
      console.log(`Successfully updated ${commandsToUpdate.length} application commands in ${guild.name} (${guild.id})!`);
    } else {
      console.log(`No application commands to update in ${guild.name} (${guild.id}).`);
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {import("discord.js").ApplicationCommand} existingCommand
 * @param {object} newCommand
 * @returns {boolean}
 */
function hasChanges(existingCommand, newCommand) {
  // Extraemos solo las propiedades esenciales para comparar
  const relevantExisting = {
    name: existingCommand.name,
    description: existingCommand.description,
    options: existingCommand.options?.map(option => ({
      name: option.name,
      description: option.description,
      type: option.type,
      required: option.required,
      choices: option.choices || [],
    })),
  };

  const relevantNew = {
    name: newCommand.name,
    description: newCommand.description,
    options: newCommand.options || [],
  };

  return JSON.stringify(relevantExisting) !== JSON.stringify(relevantNew);
}
