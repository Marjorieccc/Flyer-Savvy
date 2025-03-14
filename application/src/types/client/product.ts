export type Product ={
    product_id: number,
    product_name: string | null,
    brand: string | null
}

export type PriceHistory ={
    price_history_id: number,
    price: number | null,
    unit: string | null
}

export type PointHistory ={
    point_history_id: number,
    point: number | null
}