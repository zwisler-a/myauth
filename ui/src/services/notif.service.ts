export class Notification {
    public static show(text: string, duration = 2000) {
        const notificationWrapper = document.createElement('div');
        notificationWrapper.classList.add('notification');
        notificationWrapper.innerText = text;
        document.body.appendChild(notificationWrapper);
        setTimeout(() => {
            document.body.removeChild(notificationWrapper);
        }, duration);
    }
}
