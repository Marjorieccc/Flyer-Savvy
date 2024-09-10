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