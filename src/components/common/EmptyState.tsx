import React from 'react';
import { Button } from './Button';
import { PackageX } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border-3 border-dashed border-brand-black bg-paper-dark my-6">
      <div className="w-16 h-16 bg-brand-lime border-2 border-brand-black shadow-brutal flex items-center justify-center mb-4 text-brand-black">
        {icon || <PackageX className="w-8 h-8" />}
      </div>
      <h3 className="font-display font-black text-2xl uppercase text-brand-black mb-2">
        {title}
      </h3>
      <p className="font-mono text-sm text-gray-700 max-w-md mb-6">
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="accent" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
