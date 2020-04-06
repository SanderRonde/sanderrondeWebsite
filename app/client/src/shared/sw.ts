export function onIdle(fn: () => void) {
    if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(fn);
    } else {
        window.requestAnimationFrame(fn);
    }
}

export async function registerServiceworker() {
    if ('serviceWorker' in navigator) {
        if (
            navigator.onLine &&
            (location.protocol === 'https:' ||
                location.hostname === 'localhost')
        ) {
            const registration = await navigator.serviceWorker.register(
                '/serviceworker.js'
            );

            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                newWorker &&
                    newWorker.addEventListener('statechange', async () => {
                        if (
                            newWorker.state == 'activated' &&
                            !navigator.serviceWorker.controller
                        ) {
                            // Success
                            // TODO: show toast
                        }
                    });
            });
        }
    }
}
