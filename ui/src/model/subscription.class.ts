import { AppEvent } from './event.enum';
import { EventService } from '@/services/event.service';

export class Subscription {
    private event: AppEvent;
    private callback: any;
    constructor(event: AppEvent, callback: any) {
        this.event = event;
        this.callback = callback;
    }

    public unsubscribe() {
        EventService.unsubscribe(this);
    }

    public getEvent(): AppEvent {
        return this.event;
    }

    public getSubscription() {
        return this.callback;
    }
}
