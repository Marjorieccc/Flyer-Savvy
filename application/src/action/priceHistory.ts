import * as Server from '@/types/server/product';
import * as Api from '@/types/client/api';
import * as Query from '@/lib/db/queries/priceHistory'
import {GetAllValidFlyerID} from '@/lib/db/queries/flyer';
import * as Transform from '@/lib/utils/transform';


export async function findCurrentPriceHistory():Promise<Api.PriceHistory[] | null>{
    // Fetch the current flyers
    const currentFlyerIDs : number[] | null = await GetAllValidFlyerID();

    if(currentFlyerIDs){
         // Fetch price histories concurrently for all flyers
        const priceHistoryPromise  = await Promise.all(
            currentFlyerIDs.map((flyerID) => Query.GetPriceHistoryByFlyer(flyerID))
        );
        // Filter out null values and flatten the results
        const currentPriceHistories : Server.PriceHistory[] = priceHistoryPromise.
        filter((priceHistory) =>priceHistory !== null)
        .flat() as Server.PriceHistory[];

        // Transform the price histories if any are found
        return currentPriceHistories.length>0? currentPriceHistories.map(Transform.transformPriceHistory) : null;
    }
    // Return null if no price histories are found or flyers are missing
    return null;
}

