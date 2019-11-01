import { EventObserver } from './EventObserver';
export declare class EventSubject {
    static New: (tag: string) => EventSubject;
    private _Observers;
    private _Tag;
    private constructor();
    readonly Tag: string;
    readonly Count: number;
    Attach: (observer: EventObserver) => number;
    Detach: (observer: EventObserver) => void;
    Notify: (props?: any) => void;
}
