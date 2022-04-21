export const appendZero = (number: number) => {
  let string = ''
  if (number) string = `${String(number).padStart(2, "0")}`
  return string;
}
