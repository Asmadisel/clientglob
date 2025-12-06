import React from 'react';

interface EmailIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const EmailIcon: React.FC<EmailIconProps> = ({ 
  className, 
  size = 24,
  color = "#432EAB" 
}) => {
  return (
    <svg 
      width={size} 
      height={size * (14/24)} // Сохраняем пропорции 24:14
      viewBox="0 0 24 14" 
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        fillRule="evenodd" // camelCase!
        clipRule="evenodd" // camelCase!
        d="M23 2V12C23 12.5523 22.5523 13 22 13L2 13C1.44772 13 0.999999 12.5523 0.999999 12L1 2C1 1.89068 1.01754 1.78546 1.04996 1.687L10.4171 9.35103C11.338 10.1045 12.6624 10.1045 13.5833 9.35103L22.9501 1.68727C22.9825 1.78565 23 1.89078 23 2ZM22.1891 1.01786L12.9501 8.57707C12.3975 9.02916 11.6029 9.02916 11.0504 8.57707L1.81123 1.01779C1.87236 1.00611 1.93547 0.999999 2 0.999999L22 1C22.0647 1 22.1279 1.00614 22.1891 1.01786ZM22 0C23.1046 0 24 0.895431 24 2V12C24 13.1046 23.1046 14 22 14L2 14C0.895429 14 0 13.1046 0 12V2C0 0.895429 0.895432 0 2 0H22Z" 
      />
    </svg>
  );
};