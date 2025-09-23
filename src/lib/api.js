async function get(endpoint, ...params) {
	if (params.length > 0) params.forEach((prm) => endpoint = endpoint.replace('%s', prm));
	try {
		const response = await fetch(endpoint);
		if (response.ok) {
			const json = await response.json();
			return json;
		}
		throw new Error('APIへのアクセスでエラーが発生しました<' + endpoint + '>');
	} catch (error) {
		throw new Error(error.message ?? '未知のエラーが発生しました');
	}
}

async function getText(endpoint, ...params) {
	if (params.length > 0) params.forEach((prm) => endpoint = endpoint.replace('%s', prm));
	try {
		const response = await fetch(endpoint);
		if (response.ok) {
			const text = await response.text();
			return text;
		}
		throw new Error('APIへのアクセスでエラーが発生しました<' + endpoint + '>');
	} catch (error) {
		throw new Error(error.message ?? '未知のエラーが発生しました');
	}
}

async function post(endpoint, payload) {
	try {
		const	options = {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json'
			},
		}
		const response = await fetch(endpoint, options);
		if (response.ok) {
			const json = await response.json();
			return json;
		}
		throw new Error('APIへのアクセスでエラーが発生しました<' + endpoint + '>');
	} catch (error) {
		throw new Error(error.message ?? '未知のエラーが発生しました');
	}
}

export {
	get, getText, post,
};