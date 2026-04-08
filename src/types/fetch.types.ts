export class ApiError extends Error {
	constructor(
		public status: number,
		public url: string,
		message: string,
	) {
		super(message);
		this.name = "ApiError";
	}
}

export interface FetchOptions {
	method?: "GET"; // other methods can be added here
	headers?: Record<string, string>;
	body?: string;
}
