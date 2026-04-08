import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/fetch";
import { queryKeys } from "@/lib/query-keys";

export function useProducts() {
	return useQuery({
		queryKey: queryKeys.products(),
		queryFn: () => fetchProducts(),
	});
}
