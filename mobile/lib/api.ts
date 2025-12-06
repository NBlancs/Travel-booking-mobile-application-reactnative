// Simple in-memory storage (for Expo Go compatibility)
const memoryStorage: Record<string, string> = {};

const simpleStorage = {
    getItem: (key: string): string | null => memoryStorage[key] || null,
    setItem: (key: string, value: string): void => { memoryStorage[key] = value; },
    removeItem: (key: string): void => { delete memoryStorage[key]; },
    multiRemove: (keys: string[]): void => { keys.forEach(k => delete memoryStorage[k]); },
};

// Change this to your machine's local IP address
// Run 'ipconfig' (Windows) or 'ifconfig' (Mac/Linux) to find it
const API_BASE_URL = "http://192.168.1.57:3000/api";

// Token storage keys
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

// Generic fetch wrapper with auth header
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const token = simpleStorage.getItem(TOKEN_KEY);
    
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...options.headers,
    };
    
    if (token) {
        (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }
    
    return data;
}

// Token Management
export const tokenStorage = {
    async getToken(): Promise<string | null> {
        return simpleStorage.getItem(TOKEN_KEY);
    },
    
    async setToken(token: string): Promise<void> {
        simpleStorage.setItem(TOKEN_KEY, token);
    },
    
    async removeToken(): Promise<void> {
        simpleStorage.removeItem(TOKEN_KEY);
    },
    
    async getUser(): Promise<User | null> {
        const userStr = simpleStorage.getItem(USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    },
    
    async setUser(user: User): Promise<void> {
        simpleStorage.setItem(USER_KEY, JSON.stringify(user));
    },
    
    async removeUser(): Promise<void> {
        simpleStorage.removeItem(USER_KEY);
    },
    
    async clear(): Promise<void> {
        simpleStorage.multiRemove([TOKEN_KEY, USER_KEY]);
    }
};

// Types
export interface User {
    _id: string;
    email: string;
    username: string;
    profileImage: string;
}

export interface Booking {
    _id: string;
    user: string;
    destinationId: number;
    destinationName: string;
    destinationCountry: string;
    checkInDate: string;
    checkOutDate: string;
    guests: number;
    totalPrice: number;
    status: "pending" | "confirmed" | "cancelled" | "completed";
    paymentStatus: "pending" | "paid" | "refunded";
    specialRequests: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateBookingData {
    destinationId: number;
    destinationName: string;
    destinationCountry: string;
    checkInDate: string;
    checkOutDate: string;
    guests: number;
    totalPrice: number;
    specialRequests?: string;
}

// Auth API
export const authApi = {
    async register(email: string, username: string, password: string): Promise<{ token: string; user: User }> {
        const data = await fetchWithAuth("/auth/register", {
            method: "POST",
            body: JSON.stringify({ email, username, password }),
        });
        
        // Store token and user
        await tokenStorage.setToken(data.token);
        await tokenStorage.setUser(data.user);
        
        return data;
    },
    
    async login(email: string, password: string): Promise<{ token: string; user: User }> {
        const data = await fetchWithAuth("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
        
        // Store token and user
        await tokenStorage.setToken(data.token);
        await tokenStorage.setUser(data.user);
        
        return data;
    },
    
    async logout(): Promise<void> {
        await tokenStorage.clear();
    }
};

// Bookings API
export const bookingsApi = {
    async getAll(): Promise<{ bookings: Booking[] }> {
        return await fetchWithAuth("/bookings");
    },
    
    async getById(id: string): Promise<{ booking: Booking }> {
        return await fetchWithAuth(`/bookings/${id}`);
    },
    
    async create(bookingData: CreateBookingData): Promise<{ message: string; booking: Booking }> {
        return await fetchWithAuth("/bookings", {
            method: "POST",
            body: JSON.stringify(bookingData),
        });
    },
    
    async updateStatus(id: string, status: string, paymentStatus?: string): Promise<{ message: string; booking: Booking }> {
        return await fetchWithAuth(`/bookings/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ status, paymentStatus }),
        });
    },
    
    async cancel(id: string): Promise<{ message: string; booking: Booking }> {
        return await fetchWithAuth(`/bookings/${id}`, {
            method: "DELETE",
        });
    }
};

// User API
export const userApi = {
    async getProfile(): Promise<{ user: User }> {
        return await fetchWithAuth("/users/profile");
    },
    
    async updateProfile(data: { username?: string; email?: string; profileImage?: string }): Promise<{ message: string; user: User }> {
        return await fetchWithAuth("/users/profile", {
            method: "PUT",
            body: JSON.stringify(data),
        });
    },
    
    async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
        return await fetchWithAuth("/users/change-password", {
            method: "PUT",
            body: JSON.stringify({ currentPassword, newPassword }),
        });
    }
};

// Settings Storage (in-memory based)
export const settingsStorage = {
    async get<T>(key: string, defaultValue: T): Promise<T> {
        try {
            const value = simpleStorage.getItem(`settings_${key}`);
            return value ? JSON.parse(value) : defaultValue;
        } catch {
            return defaultValue;
        }
    },
    
    async set<T>(key: string, value: T): Promise<void> {
        simpleStorage.setItem(`settings_${key}`, JSON.stringify(value));
    },
    
    async remove(key: string): Promise<void> {
        simpleStorage.removeItem(`settings_${key}`);
    }
};
