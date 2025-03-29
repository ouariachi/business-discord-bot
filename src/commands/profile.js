import { getOwnProfile } from "#src/functions/ownProfile";
import { Colors, EmbedBuilder, MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("perfil")
  .setDescription("Muestra el perfil de un usuario")
  .addUserOption((option) => option.setName("usuario").setDescription("El usuario del que quieres ver el perfil"));

/**
 * @param {import("discord.js").CommandInteraction} interaction
 */
export async function execute(interaction) {
  let user = interaction.options.get("usuario", false)?.member?.user;
  let embed;
  if (user) {
    await interaction.reply({ content: 'Aún no se puede ver el perfil de un usuario.', flags: MessageFlags.Ephemeral });
    return;
  } else {
    user = interaction.member.user;
    embed = await getOwnProfile(interaction);
  }

  if (interaction.replied || interaction.deferred) {
    await interaction.followUp({ embeds: [embed] });
  } else {
    await interaction.reply({ embeds: [embed] });
  }
}