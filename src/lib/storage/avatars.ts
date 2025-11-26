import bcrypt from "bcryptjs";

const avatars = [
    "/images/avatars/man.png",
    "/images/avatars/woman.png",
    "/images/avatars/gamer.png",
];

export const getRandomAvatar = (): string => {
    const randomIndex = Math.floor(Math.random() * avatars.length);
    console.log("randomIndex", randomIndex);
    return avatars[randomIndex];
};
