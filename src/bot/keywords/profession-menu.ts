import { InlineKeyboard } from "grammy";
import { Profession } from "../../models/profession.model";

export const professionMenu = async (id: string) => {
  try {
    const professions = await Profession.find({ faculty: id });
    if (!professions || professions.length === 0) {
      return new InlineKeyboard();
    }

    const keyboard = new InlineKeyboard();
    professions.forEach((profession) => {
      keyboard.text(profession.name, `profession_${profession._id}`).row();
    });

    return keyboard;
  } catch (error) {
    console.error(error);
    return new InlineKeyboard();
  }
};
