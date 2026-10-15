export interface PriceResult {
	sku: string
	oldPrice: number
	newPrice: number
	reason: string
}

export interface TableRow extends PriceResult {
	name: string
}
