import * as Server from "@/types/server/flyer";
import * as Api from "@/types/client/api";
import * as Query from "@/lib/db/queries/flyer";
import { transformFlyer } from "@/lib/utils/transform";

export async function findCurrentFlyers(): Promise<Api.Flyer[] | null> {
  const flyers: Server.Flyer[] | null = await Query.GetAllValidFlyers();
  if (flyers && flyers.length > 0) {
    const clientFlyers: Api.Flyer[] = flyers.map(transformFlyer);
    return clientFlyers;
  }
  return null;
}
