import { useRef, useState, useEffect } from 'react';

export function useResizeObserver() {
    const containerRef = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
    
        const ro = new ResizeObserver(() => {
          const rect = el.getBoundingClientRect();
          setSize({ width: rect.width, height: rect.height });
          console.log('Container Width:', rect.width, 'Height:', rect.height);
        });
    
        ro.observe(el);
        return () => ro.disconnect();
      }, []);
    
      return { ref: containerRef, width: size.width, height: size.height };
} 