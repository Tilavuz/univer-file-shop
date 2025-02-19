import { Keyboard } from "grammy";
import { mainMenuText } from "../constants/keywords";

export const mainMenu = new Keyboard([
  [
    {
      text: mainMenuText.buy,
    },
    {
      text: mainMenuText.sell,
    },
  ],
]).resized();
