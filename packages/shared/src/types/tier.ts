export const TIERS = ["free", "starred"] as const;
export type Tier = (typeof TIERS)[number];
