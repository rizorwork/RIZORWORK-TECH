import React from 'react';

interface Props {
  className?: string;
}

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <img 
      src="/logo.png" 
      alt="Dr. Kulsoom Aesthetics & Laser Clinic" 
      className={`object-contain ${className}`}
      onError={(e) => {
        // Fallback in case the image is missing
        e.currentTarget.style.display = 'none';
        console.error("Logo image not found. Please ensure 'logo.png' is in your public folder.");
      }}
    />
  );
};