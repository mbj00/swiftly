export const fetchSessionUser = async () => {
    try {
        const res = await fetch('/api/auth/session');
        if (!res.ok) return null;

        const data = await res.json();
        return data.user || null;
    } catch (error) {
        console.error('Failed to fetch session user:', error);
        return null;
    }
};

export interface SessionUser {
    id: string;
    email: string;
    username: string;
    fullname: string;
    iat?: number;
    exp?: number;
};