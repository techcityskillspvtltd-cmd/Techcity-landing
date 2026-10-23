export type AuroraPresetId = "dawn" | "morning" | "afternoon" | "evening" | "night";

export type AuroraPreset = {
  id: AuroraPresetId;
  colorStops: [string, string, string];
  glow: number;
  brightness: number;
  speed: number;
};

/** Afternoon matches the supplied purple and green stops. */
export const afternoonAurora: AuroraPreset = {
  id: "afternoon",
  colorStops: ["#5227FF", "#7cff67", "#5227FF"],
  glow: 0.6,
  brightness: 1,
  speed: 1,
};

const presets = {
  dawn: {
    id: "dawn",
    colorStops: ["#FFB703", "#FF8FAB", "#C77DFF"],
    glow: 0.55,
    brightness: 0.95,
    speed: 0.75,
  },
  morning: {
    id: "morning",
    colorStops: ["#3A86FF", "#7CFF67", "#4361EE"],
    glow: 0.6,
    brightness: 1,
    speed: 1,
  },
  afternoon: afternoonAurora,
  evening: {
    id: "evening",
    colorStops: ["#FF6B35", "#F72585", "#7209B7"],
    glow: 0.7,
    brightness: 0.95,
    speed: 0.85,
  },
  night: {
    id: "night",
    colorStops: ["#1B1464", "#48CAE4", "#5A189A"],
    glow: 0.45,
    brightness: 0.72,
    speed: 0.55,
  },
} as const satisfies Record<AuroraPresetId, AuroraPreset>;

/** Local hour, 0–23. Dawn through night follow color-psychology bands. */
export function auroraPresetForHour(hour: number): AuroraPreset {
  if (hour >= 5 && hour < 8) return presets.dawn;
  if (hour >= 8 && hour < 12) return presets.morning;
  if (hour >= 12 && hour < 17) return presets.afternoon;
  if (hour >= 17 && hour < 21) return presets.evening;
  return presets.night;
}
