import { useEffect, useState } from "react"

import initialProducts from "../../../data/products.json"
import type { PriceResult, TableRow } from "../types/types"

export const usePrices = () => {
	const [tableData, setTableData] = useState<TableRow[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string>("")

	useEffect(() => {
		const fetchPrices = async () => {
			try {
				const response = await fetch("http://localhost:3000/reprice", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(initialProducts)
				})

				if (!response.ok)
					throw new Error("Ошибка сервера: " + response.status)

				const results: PriceResult[] = await response.json()
				const mergedData: TableRow[] = results.map(result => {
					const original = initialProducts.find(
						p => p.sku === result.sku
					)
					return {
						...result,
						name: original ? original.name : "Неизвестный товар"
					}
				})

				setTableData(mergedData)
			} catch (err: any) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchPrices()
	}, [])

	return { tableData, loading, error }
}
