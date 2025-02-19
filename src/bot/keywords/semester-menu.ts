import { InlineKeyboard } from "grammy";
import { Semester } from "../../models/semester.model";

export const semesterMenu = async (id: string) => {
  try {
    const semesters = await Semester.find({ profession: id });
    if (!semesters || semesters.length === 0) {
      return new InlineKeyboard();
    }

    const keyboard = new InlineKeyboard();
    semesters.forEach((semester, i) => {
      if (i % 2 === 0) {
        keyboard
          .text(`${semester.which}-semester`, `semester_${semester._id}`)
          .row();
      } else {
        keyboard.text(`${semester.which}-semester`, `semester_${semester._id}`);
      }
    });

    return keyboard;
  } catch (error) {
    console.error(error);
    return new InlineKeyboard();
  }
};
