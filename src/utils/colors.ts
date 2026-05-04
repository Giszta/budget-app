export const darkenColor = (hex: string, amount: number = 40) => {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amount);
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amount);
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amount);

  return `rgb(${r}, ${g}, ${b})`;
};
