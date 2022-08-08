import { useEffect, useState } from 'react';
import init, { fib as fibByRust } from 'wasm-lib';

export function fibByJavascript(n: number): number {
    if (n < 2) return n;
    return fibByJavascript(n - 1) + fibByJavascript(n - 2);
}

function useSpeed(impl: (_: number) => number) {
    const [ans, setAns] = useState<number>(0);
    const [time, setTime] = useState<number>(0);
    const dispatch = (n: number) => {
        const start = performance.now();
        const result = impl(n);
        const end = performance.now();
        setAns(result);
        setTime(end - start);
    };
    return [ans, time, dispatch] as const;
}

function FibDemo() {
    const [ansRust, timeRust, setAnsByRust] = useSpeed(fibByRust);
    const [ansJs, timeJs, setAnsByJs] = useSpeed(fibByJavascript);

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="demo">
            <button
                onClick={() => {
                    setAnsByJs(45);
                }}
            >
                Compute By Javascript
            </button>
            <p>
                {ansJs} - {timeJs.toFixed(2)}
            </p>
            <button
                onClick={() => {
                    setAnsByRust(45);
                }}
            >
                Compute By Rust
            </button>
            <p>
                {ansRust} - {timeRust.toFixed(2)}
            </p>
        </div>
    );
}

export default FibDemo;
