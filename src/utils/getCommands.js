import fs from "fs";

export async function getCommands(toJson = true, echo = true) {
  const commands = [];
  const dirPath = process.cwd() + "/src/commands";
  const commandFiles = fs.readdirSync(dirPath).filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = await import(`${dirPath}/${file}`);
    if (!command.data || !command.execute) {
      if (echo) console.log(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
      continue;
    }
    
    if (toJson) {
      commands.push(command.data.toJSON());
    } else {
      commands.push(command);
    }
     
    if (echo) console.log(`Loaded a command: ${command.data.name}`);
  }

  return commands;
}