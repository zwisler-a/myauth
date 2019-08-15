import { AppEvent } from '@/model/event.enum';
import { Subscription } from '@/model/subscription.class';

export class EventService {
    public static dispatch(event: AppEvent, payload?: any) {
        if (!this.subscriptions[event]) return;
        this.subscriptions[event].forEach(subscription => subscription(payload));
    }

    public static subscribe(event: AppEvent, callback: () => void) {
        if (!this.subscriptions[event]) this.subscriptions[event] = [];
        this.subscriptions[event].push(callback);
        return new Subscription(event, callback);
    }

    public static unsubscribe(subscription: Subscription) {
        const allSubs = this.subscriptions[subscription.getEvent()];
        allSubs.splice(allSubs.indexOf(subscription.getSubscription()), 1);
    }

    private static subscriptions: { [key: string]: Array<(payload?: any) => void> } = {};
}
