import { Product } from "@/types/client/api";

export async function FetchProductAPI(productID: string):Promise<{status: number; data : Product | null;}>{

    if (!productID || isNaN(parseInt(productID))) {
        return { status: 400, data: null };
    }

    try {
        const response = await fetch(`/api/product/byID/${productID}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        const data = await response.json();
        if (!response.ok) {
            return {status: response.status, data:null};
        } 
            
        return { status: 200, data: data as Product};
    
    } catch (error) {
        // This is temporarily approach, it will be handle in Logging entry later on
        console.error('Error fetching product:', error);
        return {status: 500, data:null}; 
    }

}