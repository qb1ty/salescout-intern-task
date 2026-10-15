import cors from "cors"
import express, { type Request, type Response } from "express"

import { calculatePrice } from "../pricing"
import { isValidProduct } from "../utils/validation"

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.post("/reprice", (req: Request, res: Response) => {
	const body = req.body

	if (!Array.isArray(body)) {
		return res.status(400).json({
			error: "Некорректный формат данных. Ожидался массив товаров."
		})
	}

	const isAllValid = body.every(isValidProduct)

	if (!isAllValid) {
		return res.status(400).json({
			error: "Некорректная структура данных в массиве. Убедитесь, что у всех товаров переданы правильные поля (sku, name, цены, шаг, competitors)."
		})
	}

	try {
		const results = body.map(product => calculatePrice(product))

		return res.json(results)
	} catch (error) {
		console.error("Ошибка при расчете цен:", error)

		return res.status(500).json({ error: "Внутренняя ошибка сервера" })
	}
})

app.listen(PORT, () => {
	console.log(`🚀 Сервер SaleScout запущен на http://localhost:${PORT}`)
})
