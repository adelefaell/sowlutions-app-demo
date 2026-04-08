import { PRODUCTS_URL } from "@/constants/apis";
import { ApiError, type FetchOptions } from "@/types/fetch.types";
import type { Product } from "@/types/product";

export async function apiFetch<T>(
	url: string,
	options: FetchOptions = {},
): Promise<T> {
	const res = await fetch(url, {
		method: options.method ?? "GET",
		headers: {
			Accept: "application/json",
			...(options.headers ?? {}),
		},
		body: options.body,
	});

	if (!res.ok) {
		throw new ApiError(
			res.status,
			url,
			`Request failed: ${res.status} ${res.statusText}`,
		);
	}

	return res.json() as Promise<T>;
}

// other fetch export

export async function fetchProducts(): Promise<Product[]> {
	const data = await apiFetch<Product[]>(PRODUCTS_URL);
	const list: Product[] = Array.isArray(data) ? data : [];
	return list;
}
