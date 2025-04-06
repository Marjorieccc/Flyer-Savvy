import * as Server from "@/types/server/product";
import * as Api from "@/types/client/api";
import * as Query from "@/lib/db/queries/pointHistory";
import * as Transform from "@/lib/utils/transform";

export async function findPointHistory(
  pointHistoryId: number
): Promise<Api.PointHistory | null> {
  const pointHistory: Server.PointHistory | null =
    await Query.GetPointHistoryByID(pointHistoryId);
  return pointHistory
    ? await Transform.transformPointHistory(pointHistory)
    : null;
}

export async function findPointHistoryByProduct(
  product_id: number
): Promise<Api.PointHistory[] | null> {
  const pointHistory: Server.PointHistory[] | null =
    await Query.GetPointHistoryByProduct(product_id);
  return pointHistory
    ? pointHistory.map(Transform.transformPointHistory)
    : null;
}
