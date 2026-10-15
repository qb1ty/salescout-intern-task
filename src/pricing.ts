import type { PriceResult, Product, Reason } from "./types"

export function calculatePrice(product: Product): PriceResult {
	const inStockCompetitors = product.competitors.filter(
		comp => comp.inStock === true
	)

	if (inStockCompetitors.length === 0) {
		return {
			sku: product.sku,
			oldPrice: product.myPrice,
			newPrice: product.maxPrice,
			reason: "NO_COMPETITORS"
		}
	}

	const best = Math.min(...inStockCompetitors.map(comp => comp.price))
	const candidate = Math.floor(best - product.step)

	let newPrice: number
	let reason: Reason

	if (candidate < product.minPrice) {
		newPrice = product.minPrice
		reason = "AT_MIN"
	} else if (candidate > product.maxPrice) {
		newPrice = product.maxPrice
		reason = "AT_MAX"
	} else {
		newPrice = candidate
		reason = "UNDERCUT"
	}

	return {
		sku: product.sku,
		oldPrice: product.myPrice,
		newPrice,
		reason
	}
}
