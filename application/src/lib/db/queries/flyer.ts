import { sql, gte, eq} from 'drizzle-orm';
import {db, schema} from '@/lib/db/connectDB';
import {Flyer} from '@/types/server/flyer'

// Return all flyers' records from database
export async function GetAllFlyers():Promise<Flyer[] | null>{
    const flyers = await db.query.flyer.findMany();
    return flyers;
}

// Return all on sale flyers' records from database
export async function GetAllValidFlyers():Promise<Flyer[]>{
    const today = new Date().toISOString().split('T')[0];
    const flyers = await db.query.flyer.findMany({
        where: (gte(schema.flyer.valid_to, sql`${today}`))
      });
    
    return flyers;
}

// Return all flyerID of on sale flyers' records from database
export async function GetAllValidFlyerID():Promise<number[] | null>{
    const validFlyers: Flyer[]= await GetAllValidFlyers();
    if(!validFlyers || validFlyers.length < 1) return null;

    const flyerIds: number[] = validFlyers.map(flyer => flyer.flyer_id);
    return flyerIds;
}


export async function GetFlyerByID(flyerID:number):Promise<Flyer | null>{
    const flyer = await db.query.flyer.findFirst({
        where :(eq(schema.flyer.flyer_id,flyerID ))
    });
    return flyer? flyer : null;
}