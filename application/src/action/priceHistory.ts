import * as Server from '@/types/server/product';
import * as Client from '@/types/client/product';
import * as Query from '@/lib/db/queries/priceHistory'
import {GetAllValidFlyerID} from '@/lib/db/queries/flyer';


export async function findPriceHistory(priceHistoryId:number):Promise<Client.PriceHistory|null>{
    const priceHistory:Server.PriceHistory | null = await Query.GetPriceHistoryByID(priceHistoryId);
    return priceHistory? await transformPriceHistory(priceHistory): null; 
}

export async function findPriceHistoryByProduct(product_id: number):Promise<Client.PriceHistory[]|null>{
    const priceHistory:Server.PriceHistory[] | null = await Query.GetPriceHistoryByProduct(product_id);
    return priceHistory? await Promise.all(priceHistory.map(transformPriceHistory)): null; 
}


export async function findCurrentPriceHistory():Promise<Client.PriceHistory[] | null>{
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
        return currentPriceHistories.length>0? await Promise.all(currentPriceHistories.map(transformPriceHistory)) : null;
    }
    // Return null if no price histories are found or flyers are missing
    return null;
}


//********move to utils folder? 
export async function transformPriceHistory(serverPriceHistory:Server.PriceHistory):Promise<Client.PriceHistory>{
    const clientPriceHistory : Client.PriceHistory = {
        price_history_id: serverPriceHistory.price_history_id,
        price: serverPriceHistory.price,
        unit: serverPriceHistory.unit
    }
    return clientPriceHistory;
}

