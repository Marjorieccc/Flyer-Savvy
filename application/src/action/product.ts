import * as Api from '@/types/client';
import * as Service from '@/service/server/product';

import { GetProductByPointHistory } from '@/lib/db/queries/pointHistory';
import { GetProductByPriceHistory } from '@/lib/db/queries/priceHistory';

import { findCurrentPriceHistory } from './priceHistory';
import { findCurrentPointHistory } from './pointHistory';


export async function findCurrentProductIDs():Promise<number[]>{
    const currentPriceHistory: Api.PriceHistory[] | null = await findCurrentPriceHistory();
    const currentPointHistory: Api.PointHistory[] | null = await findCurrentPointHistory();

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
    return [...new Set([...productIDfromPrice, ...productIDfromPoint])].sort();
}

export async function findCurrentProducts():Promise<Api.Product[]>{
    const currentProductIDs: number[] = await findCurrentProductIDs();

    const currentProducts : Api.Product[] = (await Promise.all(
        currentProductIDs.map((productID) => Service.findProduct(productID))
    )).filter((product) =>product !== null);

    return currentProducts;
}

