import { InlineKeyboard } from "grammy";
import { Subject } from "../../models/subject.model";

export const subjectMenu = async (id: string) => {
  try {
    const subjects = await Subject.find({ semester: id });
    if (!subjects || subjects.length === 0) {
      return new InlineKeyboard();
    }

    const keyboard = new InlineKeyboard();
    subjects.forEach((subject, i) => {
      if (i % 2 === 0) {
        keyboard.text(subject.name, `subject_${subject._id}`).row();
      } else {
        keyboard.text(subject.name, `subject_${subject._id}`);
      }
    });

    return keyboard;
  } catch (error) {
    console.error(error);
    return new InlineKeyboard();
  }
};
