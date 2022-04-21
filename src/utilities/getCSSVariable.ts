import canUseDOM from './canUseDOM';

const getCSSVariable = (variable: string): string | undefined => {
  let value;

  if (canUseDOM) {
    const computedValue = getComputedStyle(document.documentElement).getPropertyValue(`--${variable}`);
    value = computedValue.trim();
  }

  return value;
};

export default getCSSVariable;
