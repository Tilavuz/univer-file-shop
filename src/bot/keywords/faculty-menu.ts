import { InlineKeyboard } from "grammy";
import { Univer } from "../../models/univer.model";
import { Faculty } from "../../models/faculty.model";

export const facultyMenu = async (id: string) => {
  try {
    const faculties = await Faculty.find({ univer: id });
    if (!faculties || faculties.length === 0) {
      return new InlineKeyboard();
    }

    const keyboard = new InlineKeyboard();
    faculties.forEach((faculty) => {
      keyboard.text(faculty.name, `faculty_${faculty._id}`).row();
    });

    return keyboard;
  } catch (error) {
    console.error(error);
    return new InlineKeyboard();
  }
};
