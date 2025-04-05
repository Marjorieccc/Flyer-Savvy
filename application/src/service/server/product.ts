import * as Server from "@/types/server/product";
import * as Api from "@/types/client/api";
import * as Query from "@/lib/db/queries/product";
import { transformProduct } from "@/lib/utils/transform";

export async function findProduct(
  productid: number
): Promise<Api.Product | null> {
  const product: Server.Product | null = await Query.GetProductByID(productid);
  return product ? transformProduct(product) : null;
}
