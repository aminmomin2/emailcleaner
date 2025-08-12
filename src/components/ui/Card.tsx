/**
 * Card Component Library
 * 
 * A comprehensive card component system for the EmailCleaner application.
 * Provides flexible, accessible, and customizable card layouts with multiple
 * variants and padding options.
 * 
 * Features:
 * - Multiple visual variants (default, elevated, outlined)
 * - Configurable padding sizes
 * - Interactive hover effects
 * - Composable header, body, and footer sections
 * - TypeScript support with full type safety
 * 
 * @author Amin Momin
 * @version 1.0.0
 */

import React from 'react';

/**
 * Main Card component props interface
 * 
 * @property children - React nodes to render inside the card
 * @property className - Additional CSS classes to apply
 * @property variant - Visual style variant of the card
 * @property padding - Internal padding size
 * @property onClick - Optional click handler for interactive cards
 */
interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

/**
 * Card header component props interface
 * Used for the top section of a card, typically containing titles or actions
 */
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

/**
 * Card body component props interface
 * Used for the main content area of a card
 */
interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

/**
 * Card footer component props interface
 * Used for the bottom section of a card, typically containing actions or metadata
 */
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

/**
 * Main Card component
 * 
 * A flexible container component that provides consistent styling and layout
 * for content sections throughout the application.
 * 
 * @param props - Card component properties
 * @returns JSX element representing the card
 */
const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  onClick,
}) => {
  // Base styling classes applied to all cards
  const baseClasses = 'rounded-lg transition-all duration-200';
  
  // Variant-specific styling classes
  const variantClasses = {
    default: 'bg-white border border-[var(--border)]',
    elevated: 'bg-white border border-[var(--border)] shadow-lg hover:shadow-xl',
    outlined: 'bg-transparent border-2 border-[var(--border)] hover:border-[var(--primary)]'
  };
  
  // Padding size classes
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  };
  
  // Interactive styling for clickable cards
  const interactiveClasses = onClick ? 'cursor-pointer hover:scale-[1.02]' : '';
  
  // Combine all classes, filtering out empty values
  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    interactiveClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={combinedClasses}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
  padding = 'md',
}) => {
  const paddingClasses = {
    sm: 'p-3 pb-0',
    md: 'p-6 pb-0',
    lg: 'p-8 pb-0'
  };

  return (
    <div className={`${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};

const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = '',
  padding = 'md',
}) => {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div className={`${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};

const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
  padding = 'md',
}) => {
  const paddingClasses = {
    sm: 'p-3 pt-0',
    md: 'p-6 pt-0',
    lg: 'p-8 pt-0'
  };

  return (
    <div className={`${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
export { CardHeader, CardBody, CardFooter };
