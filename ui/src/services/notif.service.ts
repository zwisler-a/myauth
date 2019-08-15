export class Notification {
    public static show(text: string, duration = 2000, type?: 'success' | 'failure') {
        const notificationWrapper = document.createElement('div');
        notificationWrapper.classList.add('notification');
        notificationWrapper.classList.add(type || 'success');
        notificationWrapper.innerText = text;
        document.body.appendChild(notificationWrapper);
        setTimeout(() => {
            document.body.removeChild(notificationWrapper);
        }, duration);
    }
}
