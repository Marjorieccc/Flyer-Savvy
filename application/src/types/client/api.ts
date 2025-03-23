export type Flyer = {
    flyer_id: number;
    valid_from: Date | null; 
    valid_to: Date | null;  
}

export type Product ={
    product_id: number,
    product_name: string | null,
    brand: string | null,
    image_url: string | null,
    package_size: number | null,
    package_unit: string | null
}

export type PriceHistory = {
    price_history_id: number,
    price: number | null,
    unit: string | null
}

export type PointHistory ={
    point_history_id: number,
    point: number | null
}