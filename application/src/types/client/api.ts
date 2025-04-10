export interface Flyer {
  flyerId: number;
  validFrom: Date | null;
  validTo: Date | null;
}

export interface Product {
  productId: number;
  productName: string | null;
  brand: string | null;
  imageUrl: string | null;
  packageSize: number | null;
  packageUnit: string | null;
}

export interface ProductSearch extends Product {
  price:
    | [
        {
          groceryName: string;
          validDate: Date;
          currentPrice: number;
          currentPoint?: number;
          originalPrice?: number;
        }
      ]
    | null;
}

export interface PriceHistory {
  priceHistoryId: number;
  price: number | null;
  unit: string | null;
}

export interface PointHistory {
  pointHistoryId: number;
  point: number | null;
}
