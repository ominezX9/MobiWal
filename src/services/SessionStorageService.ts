
export const SessionStorageService = {
    // Set an item in session storage
    setItem: (key: string, value: any) => {
        try {
            const stringValue = JSON.stringify(value);
            sessionStorage.setItem(key, stringValue);
        } catch (error) {
            console.error("Error setting item in session storage", error);
        }
    },

    // Get an item from session storage and parse it
    getItem: (key: string) => {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error("Error getting item from session storage", error);
            return null;
        }
    },

    // Remove an item from session storage
    removeItem: (key: string) => {
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            console.error("Error removing item from session storage", error);
        }
    },

    // Clear all session storage
    clear: () => {
        try {
            sessionStorage.clear();
        } catch (error) {
            console.error("Error clearing session storage", error);
        }
    }
};
