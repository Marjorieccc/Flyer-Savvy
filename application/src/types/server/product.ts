export interface Product {
  productId: number;
  importedProductCode: string | null;
  productName: string | null;
  brand: string | null;
  packageSize: number | null;
  packageUnit: string | null;
  imageUrl: string | null;
  groceryId: number | null;
}

export interface PriceHistory {
  priceHistoryId: number;
  price: number | null;
  unit: string | null;
  pricePerQuantity: number | null;
  quantity: number | null;
  memberPrice: number | null;
  originalPrice: number | null;
  productId: number | null;
  flyerId: number | null;
}

export interface PointHistory {
  pointHistoryId: number;
  point: number | null;
  pointDetails: string | null;
  productId: number | null;
  flyerId: number | null;
}
