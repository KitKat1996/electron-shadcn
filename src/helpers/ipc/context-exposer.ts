import { exposeThemeContext } from "./theme/theme-context";
import { exposeWindowContext } from "./window/window-context";
import { exposeMessageContext } from "./message/message-context";

export default function exposeContexts() {
  exposeWindowContext();
  exposeThemeContext();
}
