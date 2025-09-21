import brDeals from "@/data/br/deals.json";
import euDeals from "@/data/eu/deals.json";

export type Region = "br" | "eu";

export function getDeals(region: Region) {
  return region === "br" ? brDeals : euDeals;
}