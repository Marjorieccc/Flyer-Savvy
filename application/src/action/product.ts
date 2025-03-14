import * as Server from '@/types/server/product';
import * as Client from '@/types/client/product';
import * as Query from '@/lib/db/queries/product'
import { GetProductByPointHistory } from '@/lib/db/queries/pointHistory';
import { GetProductByPriceHistory } from '@/lib/db/queries/priceHistory';

import { findCurrentPriceHistory } from './priceHistory';
import { findCurrentPointHistory } from './pointHistory';

export async function findProduct(productid:number):Promise<Client.Product|null>{
    const product:Server.Product | null = await Query.GetProductByID(productid);
    return product? await transformProduct(product): null;
}

export async function findCurrentProductIDs():Promise<number[]>{
    const currentPriceHistory: Client.PriceHistory[] | null = await findCurrentPriceHistory();
    const currentPointHistory: Client.PointHistory[] | null = await findCurrentPointHistory();

    let productIDfromPrice : number[] = [];
    let productIDfromPoint : number[] = [];
    if(currentPriceHistory && currentPriceHistory.length>0){
        productIDfromPrice  = (await Promise.all(
            currentPriceHistory.map((priceHistory) => GetProductByPriceHistory(priceHistory.price_history_id))
        )).filter((product_id) =>product_id !== null) as number[];
    }
    if(currentPointHistory && currentPointHistory.length>0){
        productIDfromPoint  = (await Promise.all(
            currentPointHistory.map((pointHistory) => GetProductByPointHistory(pointHistory.point_history_id))
        )).filter((product_id) =>product_id !== null) as number[];
    }
    return [...productIDfromPrice,...productIDfromPoint ]; // add sort()
}

export async function findCurrentProducts():Promise<Client.Product[]>{
    const currentProductIDs: number[] = await findCurrentProductIDs();

    const currentProducts : Client.Product[] = (await Promise.all(
        currentProductIDs.map((productID) => findProduct(productID))
    )).filter((product) =>product !== null);

    return currentProducts;
}




//********move to utils folder? 

export async function transformProduct(serverProduct:Server.Product):Promise<Client.Product>{
    const clientProduct : Client.Product = {
        product_id: serverProduct.product_id,
        product_name: serverProduct.product_name,
        brand: serverProduct.brand
    }
    return clientProduct;
}

