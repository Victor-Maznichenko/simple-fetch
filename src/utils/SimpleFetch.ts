export class SimpleFetch {
	private controller: AbortController;
	public options: RequestInit;
	public baseURL: URL;

	constructor(baseURL: string, options?: RequestInit) {
		this.baseURL = new URL(baseURL);
		this.controller = new AbortController();
		this.options = {
			...options,
			signal: this.controller.signal,
			cache: "no-cache",
			method: "GET",
		};
	}

	async get(url?: string) {
		return await this.request("GET", url);
	}

	async put(url?: string, data: Record<string, unknown> = {}) {
		return await this.request("PUT", url, data);
	}

	async post(url?: string, data: Record<string, unknown> = {}) {
		return await this.request("POST", url, data);
	}

	async patch(url?: string, data: Record<string, unknown> = {}) {
		return await this.request("PATCH", url, data);
	}

	cancel() {
		this.controller.abort();
	}

	private async request(method: string, url?: string, data?: Record<string, unknown>) {
		const buildedURL = url ? new URL(url, this.baseURL) : this.baseURL;

		try {
			const response = await fetch(buildedURL, this.getFetchOptions(method, data));

			if (!response.ok) {
				throw new Error(`Error, status: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error(error);
		}
	}

	getFetchOptions(method = "GET", body?: Record<string, unknown>) {
		if (method !== "GET" && body) {
			return {
				...this.options,
				method: "POST",
				headers: {
					...this.options.headers,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			};
		}
		return this.options;
	}

	updateOptions(options: RequestInit) {
		this.options = {
			...options,
			...this.options,
		};
	}
}
