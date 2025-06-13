import { LoginCredentials, RegisterData, AuthResponse, User, JWTPayload } from './types/auth';

class AuthService {

	private token: string | null = null;
	private refreshToken: string | null = null;
	
	private defaultHeaders: Record<string, string> = {
		'Content-Type': 'application/json'
	};

	public readonly baseURL: string;

	constructor() {
		this.baseURL = import.meta.env.VITE_API_BASE_URL; // TODO: Make this configurable
	}

	public setToken(token: string): void {
		this.token = token;
		this.setAuthHeader(token);
	}

	public getToken(): string | null {
		return this.token;
	}

	public setRefreshToken(token: string): void {
		this.refreshToken = token;
	}

	public getRefreshToken(): string | null {
		return this.refreshToken;
	}

	private setAuthHeader(token: string | null): void {
		if (token) {
			this.defaultHeaders = {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			};
		} else {
			this.defaultHeaders = {
				'Content-Type': 'application/json'
			};
		}
	}

	public async login(credentials: LoginCredentials): Promise<AuthResponse> {
		try {
			
			const response = await fetch(`${this.baseURL}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(credentials),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || 'Login failed');
			}

			const data = await response.json();
			console.log(data);
			if (data.access_token) {
				this.setToken(data.access_token);
				this.setRefreshToken(data.refresh_token);
				return {
					success: true,
					user: this.getUserFromToken(),
					token: data.access_token
				};
			}

			throw new Error('No token received');
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Login failed';
			console.error('Login error:', error);
			return { success: false, error: errorMessage };
		}
	}

	public async register(userData: RegisterData): Promise<AuthResponse> {
		try {
			const response = await fetch(`${this.baseURL}/auth/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || 'Registration failed');
			}

			const data = await response.json();
			return { success: true, data };
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Registration failed';
			console.error('Registration error:', error);
			return { success: false, error: errorMessage };
		}
	}

	public async refresh(): Promise<AuthResponse> {
		try {
			const response = await fetch(`${this.baseURL}/auth/refresh`, {
				method: 'POST',
				headers: this.defaultHeaders,
				body: JSON.stringify({ refreshToken: this.getRefreshToken() }),
			});

			if (!response.ok) {
				throw new Error('Token refresh failed');
			}

			const data = await response.json();

			if (data.token) {
				this.setToken(data.token);
				this.setRefreshToken(data.refreshToken);
				// Update the auth header with the new token
				this.setAuthHeader(data.token);
				return { success: true, token: data.token };
			}

			throw new Error('No token received');
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Token refresh failed';
			console.error('Token refresh error:', error);
			this.logout();
			return { success: false, error: errorMessage };
		}
	}

	public logout(): void {
		this.token = null;
		this.setAuthHeader(null);
	}

	public isAuthenticated(): boolean {
		return !!this.token && !this.isTokenExpired();
	}

	public isTokenExpired(): boolean {
		
		if (!this.token) return true;

		try {
			const payload: JWTPayload = JSON.parse(atob(this.token.split('.')[1]));
			const currentTime = Date.now() / 1000;
			return payload.exp < currentTime;
		} catch (error) {
			console.error('Error checking token expiration:', error);
			return true;
		}
	}

	public getUserFromToken(): User | undefined {
		if (!this.token) return undefined;

		try {
			const payload: JWTPayload = JSON.parse(atob(this.token.split('.')[1]));
			return {
				id: payload.sub,
				email: payload.email || '',
				roles: payload.realm_access?.roles || [],
			};
		} catch (error) {
			console.error('Error decoding token:', error);
			return undefined;
		}
	}

	public async makeAuthenticatedRequest(
		url: string,
		options: RequestInit = {}
	): Promise<Response> {
		// Check if token is expired and refresh if needed
		if (this.isTokenExpired()) {
			const refreshResult = await this.refresh();
			if (!refreshResult.success) {
				throw new Error('Authentication required');
			}
		}

		const response = await fetch(url, {
			...options,
			headers: {
				...this.defaultHeaders,
				...options.headers,
			},
		});

		if (response.status === 401) {
			// Try to refresh token once
			const refreshResult = await this.refresh();
			if (refreshResult.success) {
				// Retry the original request
				return fetch(url, {
					...options,
					headers: {
						...this.defaultHeaders,
						...options.headers,
					},
				});
			} else {
				throw new Error('Authentication required');
			}
		}

		return response;
	}
}

export const authService = new AuthService();