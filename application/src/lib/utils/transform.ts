
import * as Api from '@/types/client/api';
import * as Server from '@/types/server';


export async function transformProduct(serverProduct:Server.Product):Promise<Api.Product>{
    const clientProduct : Api.Product = {
        product_id: serverProduct.product_id,
        product_name: serverProduct.product_name,
        brand: serverProduct.brand,
        image_url: serverProduct.image_url,
        package_size: serverProduct.package_size,
        package_unit: serverProduct.package_unit
    }
    return clientProduct;
}

export async function transformFlyer(serverFlyer:Server.Flyer):Promise<Api.Flyer>{
    const result : Api.Flyer= {
        flyer_id: serverFlyer.flyer_id,
        valid_from: serverFlyer.valid_from,
        valid_to: serverFlyer.valid_to
    }
    return result;
}

export async function transformPriceHistory(serverPriceHistory:Server.PriceHistory):Promise<Api.PriceHistory>{
    const clientPriceHistory : Api.PriceHistory = {
        price_history_id: serverPriceHistory.price_history_id,
        price: serverPriceHistory.price,
        unit: serverPriceHistory.unit
    }
    return clientPriceHistory;
}

export async function transformPointHistory(serverPointHistory:Server.PointHistory):Promise<Api.PointHistory>{
    const clientPointHistory : Api.PointHistory= {
        point_history_id: serverPointHistory.point_history_id,
        point: serverPointHistory.point
    }
    return clientPointHistory;
}