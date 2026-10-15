export const getReasonStyles = (reason: string): string => {
	switch (reason) {
		case "UNDERCUT":
			return "bg-green-100 text-green-800"
		case "AT_MIN":
			return "bg-red-100 text-red-800"
		case "AT_MAX":
			return "bg-blue-100 text-blue-800"
		case "NO_COMPETITORS":
			return "bg-slate-100 text-slate-700"
		default:
			return "bg-gray-100 text-gray-800"
	}
}
