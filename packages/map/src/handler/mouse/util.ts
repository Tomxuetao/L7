export const LEFT_BUTTON = 0;
export const RIGHT_BUTTON = 2;

// the values for each button in MouseEvent.buttons
export const BUTTONS_FLAGS = {
  [LEFT_BUTTON]: 1,
  [RIGHT_BUTTON]: 2,
};

export function buttonStillPressed(e: MouseEvent, button: number) {
  const flag = BUTTONS_FLAGS[button];
  return e.buttons === undefined || (e.buttons & flag) !== flag;
}
