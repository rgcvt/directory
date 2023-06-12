export default class Airtable {
	constructor(token, base) {
		this.token = token;
		this.base = base;
		this.baseUrl = 'https://api.airtable.com/v0';
		this.tables = [];
		this.tmp = [];
	}

	async get(table) {
		const url = `${this.baseUrl}/${this.base}/${table}`;
		const data = await this.fetchRequest(url);
		return data;
	}

	async fetchRequest(url) {
		try {
			// Fetch request and parse as JSON
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.token}`,
				},
			});
			const json = await response.json();
			let records = json.records;

			// If another page exists, merge its output into the array recursively
			if (json.offset) {
				let href = new URL(url);
				href.searchParams.set('offset', json.offset);

				// delay this to avoid airtable's api limits
				//await this.timeout(1000);
				records = records.concat(await this.fetchRequest(href.toString()));
			}
			return records;
		} catch (err) {
			return console.error(err);
		}
	}

	timeout(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}
