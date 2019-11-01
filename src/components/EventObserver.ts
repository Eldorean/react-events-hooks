import { SubjectRegistry } from './EventSubjectRegister';

export class EventObserver {
  static New(tag: string, f: (props: any) => void): EventObserver;
  static New(tag: string[], f: (props: any) => void): EventObserver[];
  static New(tag: string | string[], f: (props: any) => void): EventObserver | EventObserver[] {
    let tags: string[] = [];
    tags = tags.concat(tag);

    const registerFunctions = (
      tags.map((t: string) => {
        const observer = new EventObserver(t, (props) => f(props));
        const subject = SubjectRegistry.Instance.FindOrCreate(t);
        const attach = () => subject.Attach(observer);
        return { observer, attach };
      })
    );

    registerFunctions.forEach(({ attach }) => attach());
    return (
      !Array.isArray(tag) ?
        registerFunctions[0].observer :
        registerFunctions.map(({ observer }) => observer));
  }
  Update: (props?: any) => void;
  private _Tag: string;
  private constructor(tag: string, update: (props?: any) => void) {
    this.Update = update;
    this._Tag = tag;
  }
  Destroy = () => SubjectRegistry.Instance.Find(this._Tag).Detach(this);
}
