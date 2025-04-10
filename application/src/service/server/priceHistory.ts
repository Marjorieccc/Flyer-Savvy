import * as Server from "@/types/server/product";
import * as Api from "@/types/client/api";
import * as Query from "@/lib/db/queries/priceHistory";
import { transformPriceHistory } from "@/lib/utils/transform";

export async function findPriceHistory(
  priceHistoryId: number
): Promise<Api.PriceHistory | null> {
  const priceHistory: Server.PriceHistory | null =
    await Query.GetPriceHistoryByID(priceHistoryId);
  return priceHistory ? transformPriceHistory(priceHistory) : null;
}

export async function findPriceHistoryByProduct(
  product_id: number
): Promise<Api.PriceHistory[] | null> {
  const priceHistory: Server.PriceHistory[] | null =
    await Query.GetPriceHistoryByProduct(product_id);
  return priceHistory
    ? priceHistory.map(transformPriceHistory)
    : null;
}
