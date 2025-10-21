import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
  count?: number;
  height?: string;
  width?: string;
  circle?: boolean;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  className = '', 
  count = 1, 
  height = 'h-4',
  width = 'w-full',
  circle = false
}) => {
  const baseClasses = `bg-white/10 animate-pulse rounded-lg ${height} ${width} ${className}`;
  const circleClasses = circle ? 'rounded-full' : '';

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index} 
          className={`${baseClasses} ${circleClasses}`}
          style={{
            animationDelay: `${index * 0.1}s`
          }}
        />
      ))}
    </>
  );
};

export const CardSkeleton: React.FC = () => (
  <div className="backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg p-6 space-y-4">
    <SkeletonLoader height="h-8" width="w-3/4" />
    <SkeletonLoader height="h-4" width="w-full" count={3} className="mt-2" />
    <div className="flex gap-4 mt-4">
      <SkeletonLoader height="h-10" width="w-24" />
      <SkeletonLoader height="h-10" width="w-24" />
    </div>
  </div>
);

export const ListSkeleton: React.FC<{ items?: number }> = ({ items = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
        <SkeletonLoader height="h-12" width="w-12" circle />
        <div className="flex-1 space-y-2">
          <SkeletonLoader height="h-4" width="w-1/2" />
          <SkeletonLoader height="h-3" width="w-3/4" />
        </div>
      </div>
    ))}
  </div>
);

export default SkeletonLoader;






