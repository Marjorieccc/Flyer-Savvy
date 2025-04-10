export interface Grocery {
  groceryId: number;
  groceryName: string | null;
}

export interface Store {
  storeId: number;
  imported_storeId: string;
  storeName: string | null;
  address: string | null;
  postalCode: string | null;
  groceryId: number | null;
}
