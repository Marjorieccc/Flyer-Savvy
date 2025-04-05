import * as Server from "@/types/server/product";
import * as Api from "@/types/client/api";
import * as Query from "@/lib/db/queries/pointHistory";
import { GetAllValidFlyerID } from "@/lib/db/queries/flyer";
import { transformPointHistory } from "@/lib/utils/transform";

export async function findCurrentPointHistory(): Promise<
  Api.PointHistory[] | null
> {
  // Fetch the current flyers
  const currentFlyerIDs: number[] | null = await GetAllValidFlyerID();

  // Check if flyers are found
  if (currentFlyerIDs) {
    // Fetch point histories concurrently for all flyers
    const pointHistoryPromise = await Promise.all(
      currentFlyerIDs.map((flyerID) => Query.GetPointHistoryByFlyer(flyerID))
    );
    // Filter out null values and flatten the results
    const currentPointHistories: Server.PointHistory[] = pointHistoryPromise
      .filter((pointHistory) => pointHistory !== null)
      .flat() as Server.PointHistory[];

    // Transform the point histories if any are found
    return currentPointHistories.length > 0
      ? currentPointHistories.map(transformPointHistory)
      : null;
  }
  // Return null if no point histories are found or flyers are missing
  return null;
}
