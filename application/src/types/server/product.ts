export type Product ={
    product_id: number,
    imported_product_code: string | null,
    product_name: string | null,
    brand: string | null,
    package_size: number | null,
    package_unit: string | null,
    image_url: string | null,
    grocery_id: number | null
}

export type PriceHistory ={
    price_history_id: number,
    price: number | null,
    unit: string | null,
    price_per_quantity: number | null,
    quantity: number | null,
    member_price:number | null,
    original_price: number | null,
    product_id: number| null,
    flyer_id: number| null
}

export type PointHistory ={
    point_history_id: number,
    point: number | null,
    product_id: number| null,
    flyer_id: number| null
}