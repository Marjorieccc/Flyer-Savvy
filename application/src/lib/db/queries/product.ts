
import { eq } from 'drizzle-orm';
import {db, schema} from '@/lib/db/connectDB';
import { Product } from '@/types/server/product';

export async function GetProductByID(productID:Number):Promise<Product | null>{
    const product = await db.query.product.findFirst({
        where :(eq(schema.product,productID ))
    });
    return product? product : null;
}