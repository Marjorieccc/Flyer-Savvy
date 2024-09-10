import { eq } from 'drizzle-orm';
import {db, schema} from '@/lib/db/connectDB';
import { PriceHistory } from '@/types/server/product';


export async function GetPriceHistoryByID(price_history_id:number):Promise<PriceHistory | null>{
    const priceHistory = await db.query.price_history.findFirst({
        where :(eq(schema.price_history.price_history_id,price_history_id ))
    });
    return priceHistory? priceHistory : null;
}

export async function GetPriceHistoryByProduct(product_id: number):Promise<PriceHistory[] | null>{
    const priceHistory= await db.query.price_history.findMany({
        where :(eq(schema.price_history.product_id,product_id ))
    });
    return priceHistory? priceHistory : null;
}