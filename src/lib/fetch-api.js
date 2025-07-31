export const getJSON = async (endpoint, ...params) => {
    if (params.length > 0) params.forEach((prm) => endpoint = endpoint.replace('?', prm));
    const response = await fetch(endpoint);
    if (response.ok) {
        const json = await response.json();
        return json;
    }
    return null;
}