import { sql, gte, eq} from 'drizzle-orm';
import {db, schema} from '@/lib/db/connectDB';
import {Flyer} from '@/types/server/flyer'

// Return all flyers' records from database
export async function GetAllFlyers():Promise<Flyer[] | null>{
    const flyers = await db.query.flyer.findMany();
    return flyers;
}

// Return all on sale flyers' records from database
export async function GetAllValidFlyers():Promise<Flyer[] | null>{
    const today = new Date().toISOString().split('T')[0];
    const flyers = await db.query.flyer.findMany({
        where: (gte(schema.flyer.valid_to, sql`${today}`))
      });
    
    return flyers;
}


// Return all flyerID of on sale flyers' records from database
export async function GetAllValidFlyerID():Promise<number[] | null>{
    const today = new Date().toISOString().split('T')[0];
    const flyers = await db.query.flyer.findMany({
        where: (gte(schema.flyer.valid_to, sql`${today}`))
      });
      const flyerIds: number[] = flyers.map(flyer => flyer.flyer_id);
    return flyerIds;
}


export async function GetFlyerByID(flyerID:Number):Promise<Flyer | null>{
    const flyer = await db.query.flyer.findFirst({
        where :(eq(schema.flyer,flyerID ))
    });
    return flyer? flyer : null;
}