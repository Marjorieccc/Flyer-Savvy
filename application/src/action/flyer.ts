import * as Server from '@/types/server/flyer';
import * as Api from '@/types/client/api';
import * as Query from '@/lib/db/queries/flyer';
import * as Transform from '@/lib/utils/transform';

export async function findCurrentFlyers():Promise<Api.Flyer[]|null>{
    const flyers:Server.Flyer[] | null = await Query.GetAllValidFlyers();
    if(flyers && flyers.length>0){
        const clientFlyers: Api.Flyer[] = await Promise.all(flyers.map(Transform.transformFlyer));
        return clientFlyers;
    }
    return null;
}
