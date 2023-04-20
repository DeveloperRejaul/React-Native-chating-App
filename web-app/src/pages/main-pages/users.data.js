import { IMG_PHAT } from "../../constants/IMG_PHAT";
import { v4 as uuidv4 } from "uuid";

export const userData = [
  {
    id: uuidv4(),
    name: "Rejaul",
    isOnline: true,
    profusion: "Chef Executive Officer ",
    profileImage: IMG_PHAT.rejaul,
    about: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro
    earum aliquam, repellendus unde error modi cupiditate commodi ab
    debitis saepe.`,
  },
  {
    id: uuidv4(),
    name: "Kamal",
    isOnline: false,
    profusion: "Full stack developer",
    profileImage: IMG_PHAT.kamal,
    about: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro
    earum aliquam, repellendus unde error modi cupiditate commodi ab
    debitis saepe.`,
  },
  {
    id: uuidv4(),
    name: "Jamal",
    isOnline: true,
    profusion: "React native developer ",
    profileImage: IMG_PHAT.jamal,
    about: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro
    earum aliquam, repellendus unde error modi cupiditate commodi ab
    debitis saepe.`,
  },
];
