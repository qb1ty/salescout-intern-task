import { describe, expect, it } from "vitest"
import { calculatePrice } from "../pricing"
import fs from "node:fs"
import type { Product, Competitor } from "../types"

const productsPath = new URL("../../data/products.json", import.meta.url)
const expectedPath = new URL("../../data/expected.json", import.meta.url)

const products: Product[] = JSON.parse(fs.readFileSync(productsPath, "utf-8"))
const expected: Competitor[] = JSON.parse(fs.readFileSync(expectedPath, "utf-8"))

describe("calculatePrice", () => {
    it(
        "Должен правильно считать цены для всех товаров из тестового файла",
        () => {
            products.forEach((product, index) => {
                const result = calculatePrice(product)
                
                expect(result).toEqual(expected[index])
            })
        }
    )

    it(
        "Должен упереться в minPrice и вернуть AT_MIN",
        () => {
            const product: Product = {
                sku: "TEST-MIN",
                name: "Test",
                myPrice: 200,
                minPrice: 150,
                maxPrice: 300,
                step: 60,
                competitors: [{ seller: "A", price: 200, inStock: true }]
            }

            const result = calculatePrice(product)

            expect(result.newPrice).toBe(150)
            expect(result.reason).toBe("AT_MIN")
        }
    )

    it(
        "Должен упереться в maxPrice и вернуть AT_MAX",
        () => {
            const product: Product = {
                sku: "TEST-MAX",
                name: "Test",
                myPrice: 200,
                minPrice: 100,
                maxPrice: 300,
                step: 10,
                competitors: [{ seller: "B", price: 500, inStock: true }]
            }

            const result = calculatePrice(product)

            expect(result.newPrice).toBe(300)
            expect(result.reason).toBe("AT_MAX")
        }
    )

    
})