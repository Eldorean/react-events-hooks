import { useEffect } from 'react';
import { EventObserver } from './EventObserver';
import { EventSubject } from './EventSubject';
import { SubjectRegistry } from './EventSubjectRegister';

const subjectRegistry = SubjectRegistry.Instance;

export const useNewEvent = (tag: string) => {
  const subject: EventSubject = subjectRegistry.FindOrCreate(tag);
  return subject.Notify;
};

export const useEvent = (tag: string | string[], func: (props?: any) => void) => {
  let tags: string[] = [];
  tags = tags.concat(tag);

  const registerFunctions = () => (
    tags.map((t: string) => {
      const observer = EventObserver.New(t, (props) => func(props));
      return { detach: () => observer.Destroy() };
    })
  );

  useEffect(() => {
    const registerF = registerFunctions();
    return () => registerF.forEach(({ detach }) => detach());
  });
};
