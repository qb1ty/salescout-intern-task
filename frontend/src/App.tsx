import { usePrices } from "./hooks/use-price.hook"
import { getReasonStyles } from "./utils/styles"

export default function App() {
	const { tableData, loading, error } = usePrices()

	return (
		<div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
			<div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
				<h1 className="text-3xl font-extrabold text-center text-slate-800 mb-8">
					SaleScout: Автоматическое управление ценами
				</h1>

				{loading && (
					<p className="text-center text-slate-500 animate-pulse">
						Запрашиваем новые цены у бота...
					</p>
				)}
				{error && (
					<p className="text-center text-red-600 font-bold p-4 bg-red-50 rounded-lg">
						Ошибка: {error}
					</p>
				)}

				{!loading && !error && (
					<div className="overflow-x-auto">
						<table className="w-full text-left border-collapse">
							<thead>
								<tr className="bg-slate-100 border-b-2 border-slate-200">
									<th className="p-4 font-semibold text-slate-700 rounded-tl-lg">
										SKU
									</th>
									<th className="p-4 font-semibold text-slate-700">
										Название
									</th>
									<th className="p-4 font-semibold text-slate-700">
										Старая цена (₸)
									</th>
									<th className="p-4 font-semibold text-slate-700">
										Новая цена (₸)
									</th>
									<th className="p-4 font-semibold text-slate-700 rounded-tr-lg">
										Причина
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-100">
								{tableData.map(row => (
									<tr
										key={row.sku}
										className="hover:bg-slate-50 transition-colors duration-150"
									>
										<td className="p-4 font-medium text-slate-600">
											{row.sku}
										</td>
										<td className="p-4">{row.name}</td>
										<td className="p-4 text-slate-400 line-through">
											{row.oldPrice.toLocaleString(
												"ru-RU"
											)}
										</td>
										<td className="p-4 text-lg font-bold text-slate-900">
											{row.newPrice.toLocaleString(
												"ru-RU"
											)}
										</td>
										<td className="p-4">
											<span
												className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${getReasonStyles(row.reason)}`}
											>
												{row.reason}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	)
}
