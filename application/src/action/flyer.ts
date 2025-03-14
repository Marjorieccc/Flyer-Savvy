import * as ServerType from '@/types/server/flyer';
import * as ClientType from '@/types/client/flyer';
import * as Query from '@/lib/db/queries/flyer'

export async function findAllFlyers():Promise<ClientType.Flyer[]|null>{
    const flyers:ServerType.Flyer[] | null = await Query.GetAllFlyers();
    if(flyers && flyers.length>0){
        const clientFlyers: ClientType.Flyer[] = await Promise.all(flyers.map(transformFlyer));
        return clientFlyers;
    }
    return null;
}

export async function findFlyer(flyerid:number):Promise<ClientType.Flyer|null>{
    const flyer: ServerType.Flyer | null = await Query.GetFlyerByID(flyerid);
    return flyer ? await transformFlyer(flyer) : null;
}

export async function findCurrentFlyers():Promise<ClientType.Flyer[]|null>{
    const flyers:ServerType.Flyer[] | null = await Query.GetAllValidFlyers();
    if(flyers && flyers.length>0){
        const clientFlyers: ClientType.Flyer[] = await Promise.all(flyers.map(transformFlyer));
        return clientFlyers;
    }
    return null;
}


//********move to service folder? 

export async function transformFlyer(serverFlyer:ServerType.Flyer):Promise<ClientType.Flyer>{
    const result : ClientType.Flyer= {
        flyer_id: serverFlyer.flyer_id,
        valid_from: serverFlyer.valid_from,
        valid_to: serverFlyer.valid_to
    }
    return result;
}