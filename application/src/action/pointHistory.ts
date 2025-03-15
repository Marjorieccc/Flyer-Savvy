import * as Server from '@/types/server/product';
import * as Client from '@/types/client/product';
import * as Query from '@/lib/db/queries/pointHistory'
import { GetAllValidFlyerID } from '@/lib/db/queries/flyer';

export async function findPointHistory(pointHistoryId:number):Promise<Client.PointHistory|null>{
    const pointHistory:Server.PointHistory | null = await Query.GetPointHistoryByID(pointHistoryId);
    return pointHistory? await transformPointHistory(pointHistory): null; 
}


export async function findPointHistoryByProduct(product_id: number):Promise<Client.PointHistory[]|null>{
    const pointHistory:Server.PointHistory[] | null = await Query.GetPointHistoryByProduct(product_id);
    return pointHistory? await Promise.all(pointHistory.map(transformPointHistory)): null; 
}


export async function findCurrentPointHistory():Promise<Client.PointHistory[] | null>{
    // Fetch the current flyers
    const currentFlyerIDs : number[] | null = await GetAllValidFlyerID();

    // Check if flyers are found
    if(currentFlyerIDs){
         // Fetch point histories concurrently for all flyers
        const pointHistoryPromise  = await Promise.all(
            currentFlyerIDs.map((flyerID) => Query.GetPointHistoryByFlyer(flyerID))
        );
        // Filter out null values and flatten the results
        const currentPointHistories : Server.PointHistory[] = pointHistoryPromise.
        filter((pointHistory) =>pointHistory !== null)
        .flat() as Server.PointHistory[];

        // Transform the point histories if any are found
        return currentPointHistories.length>0? await Promise.all(currentPointHistories.map(transformPointHistory)) : null;
    }
    // Return null if no point histories are found or flyers are missing
    return null;
}



//********move to utils folder? 

export async function transformPointHistory(serverPointHistory:Server.PointHistory):Promise<Client.PointHistory>{
    const clientPointHistory : Client.PointHistory= {
        point_history_id: serverPointHistory.point_history_id,
        point: serverPointHistory.point
    }
    return clientPointHistory;
}
