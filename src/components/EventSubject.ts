import { EventObserver } from './EventObserver';
import { SubjectRegistry } from './EventSubjectRegister';

export class EventSubject {
  static New = (tag: string): EventSubject => {
    const registry = SubjectRegistry.Instance;
    if (registry.Exists(tag)) {
      return registry.Find(tag);
    } else {
      return registry.Add(tag, new EventSubject(tag));
    }
  }
  private _Observers: EventObserver[] = [];
  private _Tag: string;
  private constructor(tag: string) {
    this._Tag = tag;
  }
  get Tag() { return this._Tag; }
  get Count() { return this._Observers.length; }
  Attach = (observer: EventObserver) => this._Observers.push(observer);
  Detach = (observer: EventObserver) => {
    const index = this._Observers.indexOf(observer);
    if (index !== -1) {
      this._Observers.splice(index, 1);
    }
  }
  Notify = (props?: any) => this._Observers.forEach((element) => element.Update(props as any));
}
