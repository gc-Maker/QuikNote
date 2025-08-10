declare global {
    interface Window {
        electronAPI: {
            minimize: () => void;
            createWindow: () => void;
        };
    }
}

export {};
