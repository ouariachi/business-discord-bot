import { createUser, getUser } from "#src/db/models/User";
import { EmbedBuilder } from "@discordjs/builders";
import { Colors, MessageFlags } from "discord.js";

/** @param {import("discord.js").CommandInteraction} interaction */
export async function getOwnProfile(interaction) {
  await interaction.deferReply();
  
  const interactionUser = interaction.member.user;
  let user = await getUser(interactionUser.id);

  if (!user) {
    console.log(`> Creating user ${interactionUser.id}`);

    if (interaction.deferred) {
      await interaction.followUp({ content: 'Creando usuario...', flags: MessageFlags.Ephemeral });
    }

    try {
      user = await createUser({
        discordId: interactionUser.id,
        username: interactionUser.username,
      });
    } catch (error) {
      console.error(error);
      if (interaction.deferred) {
        await interaction.followUp({ content: 'Error al crear el usuario', flags: MessageFlags.Ephemeral });
      } else {
        await interaction.reply({ content: 'Error al crear el usuario', flags: MessageFlags.Ephemeral });
      }
      return;
    }
  }

  const fileds = []
  if (user.bio) {
    fileds.push({ name: "Biografía", value: user.bio });
  }

  for (const skill of user.skills) {
    const skillName = (skill.icon && skill.icon !== "") ? `${skill.icon} ${skill.name}` : skill.name;
    fileds.push({ name: skillName, value: skill.description, inline: true });
  }
  
  const embed = new EmbedBuilder()
    .setTitle(interactionUser.displayName)
    .setThumbnail(user.avatarUrl || interactionUser.displayAvatarURL())
    .setColor(interactionUser.accentColor || Colors.DarkGold)
    .addFields([
      { name: "Nombre", value: interactionUser.displayName, },
      ...fileds,
      { name: "Fecha de creación", value: user.createdAt.toLocaleString(), },
    ])
    .setTimestamp();

  return embed;
}