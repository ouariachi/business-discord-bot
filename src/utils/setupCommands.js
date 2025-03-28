import { getCommands } from "#src/utils/getCommands";
import { Collection } from "discord.js";

export async function setupCommands(client) {
  client.commands = new Collection();
  const commands = await getCommands(false, false);
  for (const command of commands) {
    client.commands.set(command.data.name, command);
  }
}