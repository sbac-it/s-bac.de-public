const colors = {
  primary: "#0057b8",
  primaryHover: "#00458f",
  background: "#f8fafc",
  surface: "#ffffff",
  text: "#0f172a",
  muted: "#475569",
  border: "#cbd5e1",
  success: "#157f3d",
  warning: "#8a4b08",
  error: "#b42318",
  onPrimary: "#ffffff"
};

const pairs = [
  ["text / background", colors.text, colors.background, 4.5],
  ["text / surface", colors.text, colors.surface, 4.5],
  ["muted / background", colors.muted, colors.background, 4.5],
  ["muted / surface", colors.muted, colors.surface, 4.5],
  ["primary / surface", colors.primary, colors.surface, 4.5],
  ["on-primary / primary", colors.onPrimary, colors.primary, 4.5],
  ["on-primary / primary-hover", colors.onPrimary, colors.primaryHover, 4.5],
  ["success / surface", colors.success, colors.surface, 4.5],
  ["warning / surface", colors.warning, colors.surface, 4.5],
  ["error / surface", colors.error, colors.surface, 4.5]
];

const luminance = (hex) => {
  const channels = hex.match(/[a-f0-9]{2}/gi).map((value) => {
    const channel = Number.parseInt(value, 16) / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

const contrast = (foreground, background) => {
  const light = Math.max(luminance(foreground), luminance(background));
  const dark = Math.min(luminance(foreground), luminance(background));
  return (light + 0.05) / (dark + 0.05);
};

const failures = [];

for (const [name, foreground, background, minimum] of pairs) {
  const ratio = contrast(foreground, background);
  console.log(`${name}: ${ratio.toFixed(2)}:1`);
  if (ratio < minimum) failures.push(`${name} requires ${minimum}:1`);
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

