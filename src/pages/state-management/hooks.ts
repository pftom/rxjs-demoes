import { useState, useEffect, EffectCallback } from 'react';
import { BehaviorSubject } from 'rxjs';

export function useObservable<T>(observable: BehaviorSubject<T>) {
    const [val, setVal] = useState(observable.value);

    useEffect(() => {
        const subscription = observable.subscribe(setVal)
        return () => subscription.unsubscribe();
    }, [observable])

    return val;
}