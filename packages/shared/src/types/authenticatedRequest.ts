import { Request } from "express";
import { Tier } from "./tier.ts";

export type AuthenticatedRequest = Request & {
  user: {
    userId: string;
    tier: Tier;
  };
};
