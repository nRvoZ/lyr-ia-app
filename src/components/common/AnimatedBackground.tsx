import React, { useRef, useEffect, useContext, useMemo } from 'react';
import { ThemeContext } from '../../contexts/AppContexts';

// Utility to convert hex to rgb
const hexToRgb = (hex: string) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

class Orb {
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
    color: { r: number; g: number; b: number };
    
    constructor(canvasWidth: number, canvasHeight: number, color: { r: number; g: number; b: number }) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.radius = Math.random() * (Math.min(canvasWidth, canvasHeight) / 4) + 50;
        this.vx = (Math.random() - 0.5) * 0.5; // Slow movement
        this.vy = (Math.random() - 0.5) * 0.5;
        this.color = color;
    }

    update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x - this.radius < 0 || this.x + this.radius > canvasWidth) {
            this.vx *= -1;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvasHeight) {
            this.vy *= -1;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.6)`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}


const AnimatedBackground = React.memo(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useContext(ThemeContext);

    const colors = useMemo(() => {
        const primaryRgb = hexToRgb(theme.primary);
        const secondaryRgb = hexToRgb(theme.secondary);
        if (!primaryRgb || !secondaryRgb) {
            return []; // fallback
        }
        // Create some color variations
        return [
            primaryRgb,
            secondaryRgb,
            { r: (primaryRgb.r + secondaryRgb.r) / 2, g: (primaryRgb.g + secondaryRgb.g) / 2, b: (primaryRgb.b + secondaryRgb.b) / 2 },
            primaryRgb,
            secondaryRgb
        ];
    }, [theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        let animationFrameId: number;
        let orbs: Orb[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Re-initialize orbs on resize
            orbs = colors.map(color => new Orb(canvas.width, canvas.height, color));
        };

        resizeCanvas();

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            orbs.forEach(orb => {
                orb.update(canvas.width, canvas.height);
                orb.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };
        
        animate();

        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [colors]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                filter: 'blur(80px) saturate(1.2)', // The blur creates the soft look
                opacity: 0.5,
            }}
        />
    );
});

export default AnimatedBackground;
