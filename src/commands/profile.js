import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("perfil")
  .setDescription("Muestra el perfil de un usuario");

/**
 * @param {import("discord.js").CommandInteraction} interaction
 */
export async function execute(interaction) {
  const member = interaction.member;
  const embed = new EmbedBuilder()
    .setColor(0x00ff00)
    .setAuthor({
      name: member.user.tag,
      iconURL: member.user.displayAvatarURL(),
    })
    .setThumbnail(member.user.displayAvatarURL())
    .setDescription(`**Nombre:** ${member.user.username}\n**ID:** ${member.user.id}\n**Tag:** ${member.user.tag}\n**Nivel:** ${member.user.premiumSinceTimestamp ? `Nivel ${member.user.premiumSinceTimestamp}` : "Ninguno"}\n**Tipo:** ${member.user.bot ? "Bot" : "Usuario"}\n**Fecha de creación:** ${member.user.createdAt}\n**Fecha de última actualización:** ${member.user.createdAt}`);

  await interaction.reply({ embeds: [embed] });
}