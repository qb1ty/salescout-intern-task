import type { Product } from "../types"

export function isValidProduct(product: any): product is Product {
	if (!product || typeof product !== "object") return false

	if (typeof product.sku !== "string") return false
	if (typeof product.name !== "string") return false
	if (typeof product.myPrice !== "number") return false
	if (typeof product.minPrice !== "number") return false
	if (typeof product.maxPrice !== "number") return false
	if (typeof product.step !== "number") return false

	if (!Array.isArray(product.competitors)) return false

	for (const comp of product.competitors) {
		if (!comp || typeof comp !== "object") return false
		if (typeof comp.seller !== "string") return false
		if (typeof comp.price !== "number") return false
		if (typeof comp.inStock !== "boolean") return false
	}

	return true
}
