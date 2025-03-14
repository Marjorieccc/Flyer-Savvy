import { eq } from 'drizzle-orm';
import {db, schema} from '@/lib/db/connectDB';
import { PointHistory } from '@/types/server/product';


export async function GetPointHistoryByID(point_history_id:number):Promise<PointHistory | null>{
    const pointHistory = await db.query.point_history.findFirst({
        where :(eq(schema.point_history.point_history_id,point_history_id ))
    });
    return pointHistory? pointHistory : null;
}

export async function GetPointHistoryByProduct(product_id: number):Promise<PointHistory[] | null>{
    const pointHistory= await db.query.point_history.findMany({
        where :(eq(schema.point_history.product_id,product_id ))
    });
    return pointHistory? pointHistory : null;
}

export async function GetPointHistoryByFlyer(flyer_id: number):Promise<PointHistory[] | null>{
    const pointHistory= await db.query.point_history.findMany({
        where :(eq(schema.point_history.flyer_id,flyer_id ))
    });
    return pointHistory? pointHistory : null;
}


export async function GetProductByPointHistory(point_history_id: number):Promise< number | null>{
    const result = await db
        .select({product_id: schema.point_history.product_id})
        .from(schema.point_history)
        .where(eq(schema.point_history.point_history_id,point_history_id));

    return result.length > 0 ? result[0].product_id : null;
}
