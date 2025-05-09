/**
 * Serviço de API para comunicação com o backend
 */

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000'

/**
 * Configuração padrão para requisições
 */
const defaultOptions = {
	headers: {
		'Content-Type': 'application/json',
	},
}

/**
 * Verifica o status da API
 * @returns {Promise<{ status: string, environment: string, timestamp: string }>}
 */
export async function checkAPIStatus() {
	try {
		const response = await fetch(`${API_URL}/`, defaultOptions)

		if (!response.ok) {
			throw new Error(`API Error: ${response.status}`)
		}

		return await response.json()
	} catch (error) {
		console.error('Error checking API status:', error)
		throw error
	}
}

/**
 * Função genérica para fazer requisições à API
 * @param {string} endpoint - Endpoint da API
 * @param {object} options - Opções adicionais para a requisição
 * @returns {Promise<any>} - Resposta da API
 */
export async function apiRequest(endpoint: string, options = {}) {
	try {
		const response = await fetch(`${API_URL}${endpoint}`, {
			...defaultOptions,
			...options,
		})

		if (!response.ok) {
			const errorData = await response.json().catch(() => null)
			throw new Error(errorData?.message || `API Error: ${response.status}`)
		}

		return await response.json()
	} catch (error) {
		console.error(`Error in API request to ${endpoint}:`, error)
		throw error
	}
}

/**
 * API Client com métodos para cada tipo de requisição HTTP
 */
const apiClient = {
	get: (endpoint: string) => apiRequest(endpoint, { method: 'GET' }),
	post: (endpoint: string, data: any) =>
		apiRequest(endpoint, { method: 'POST', body: JSON.stringify(data) }),
	put: (endpoint: string, data: any) =>
		apiRequest(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
	delete: (endpoint: string) => apiRequest(endpoint, { method: 'DELETE' }),
}

export default apiClient
