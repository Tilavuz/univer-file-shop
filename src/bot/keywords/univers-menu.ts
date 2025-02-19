import { InlineKeyboard } from "grammy";
import { Univer } from "../../models/univer.model";

export const universMenu = async () => {
  try {
    const univers = await Univer.find();
    if (!univers || univers.length === 0) {
      return new InlineKeyboard();
    }

    // **1. Tugmalarni yaratish va InlineKeyboard obyektiga qo‘shish**
    const keyboard = new InlineKeyboard();
    univers.forEach((univer) => {
      keyboard.text(univer.name, `univer_${univer._id}`).row();
    });

    return keyboard;
  } catch (error) {
    console.error(error);
    return new InlineKeyboard();
  }
};
