export type Grocery = {
    grocery_id: number, 
    grocery_name: string| null
}

export type Store = {
    store_id: number, 
    imported_store_id: string,
    store_name : string | null,
    address: string | null,
    postal_code: string | null,
    grocery_id: number| null
}
