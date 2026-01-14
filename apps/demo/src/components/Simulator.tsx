import { useState, useEffect, useRef } from 'react';
import { useA2UI, A2UIRenderer } from '@a2ui-renderer/react';
import { TRAVEL_SCENARIO } from '../mocks/travel_scenario';

export function Simulator() {
    const { processMessage, surfaceId } = useA2UI();
    const [isPlaying, setIsPlaying] = useState(false);
    const [log, setLog] = useState<string[]>([]);
    const [step, setStep] = useState(0);

    // Auto-scroll log
    const logRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }
    }, [log]);

    const playStep = async (index: number) => {
        if (index >= TRAVEL_SCENARIO.length) {
            setIsPlaying(false);
            return;
        }

        const msg = TRAVEL_SCENARIO[index];

        // Log it
        setLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] Received chunk ${index + 1}...`]);

        // Process it
        processMessage(msg);

        // Wait random time to simulate efficient streaming vs slow thinking
        const delay = index === 0 ? 100 : 800; // Fast start, then "think"

        setTimeout(() => {
            setStep(index + 1);
            playStep(index + 1);
        }, delay);
    };

    const handleStart = () => {
        setIsPlaying(true);
        setStep(0);
        setLog([]);
        playStep(0);
    };

    return (
        <div className="simulator-container">
            <div className="sidebar">
                <h3>🤖 AI Logic Inspector</h3>
                <button
                    className="play-btn"
                    onClick={handleStart}
                    disabled={isPlaying}
                >
                    {isPlaying ? 'Streaming...' : '▶ Start Simulation'}
                </button>
                <div className="log-window" ref={logRef}>
                    <div className="log-header">
                        Step: {step} / {TRAVEL_SCENARIO.length}
                    </div>
                    {log.map((line, i) => (
                        <div key={i} className="log-line">{line}</div>
                    ))}
                    {log.length === 0 && <span className="placeholder">Waiting for stream...</span>}
                </div>
            </div>
            <div className="preview-area">
                <div className="device-frame">
                    {/* The root ID in our mock is 'root' */}
                    {/* Only render if we have a surface (meaning simulation started) */}
                    {surfaceId ? (
                        <A2UIRenderer rootId="root" />
                    ) : (
                        <div className="empty-state">
                            <p>Press Start to render UI</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
