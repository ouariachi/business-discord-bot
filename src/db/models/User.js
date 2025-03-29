import { prisma } from "#src/db/prisma";

/** @param {string} id */
export async function getUser(id) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { discordId: id },
        { username: id },
      ],
    },
    include: {
      skills: true,
      opportunities: true,
      requests: true,
    },
  });

  return user;
}

/** @param {import("@prisma/client").UserCreateInput} data */
export async function createUser(data) {
  const user = await prisma.user.create({
    data,
    include: {
      skills: true,
      opportunities: true,
      requests: true,
    },
  });

  return user;
}