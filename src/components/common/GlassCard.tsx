import React, { forwardRef } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(({ children, className = '' }, ref) => {
  return (
    <div
      ref={ref}
      className={`backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:border-white/20 hover:scale-[1.01] animate-slide-up ${className}`}
      style={{
        backgroundImage: 'linear-gradient(to bottom right, var(--color-panel-start), var(--color-panel-end))'
      }}
    >
      {children}
    </div>
  );
});

export default GlassCard;