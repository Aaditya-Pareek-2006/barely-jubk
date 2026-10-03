import React from 'react';
import { BuildYourBoxSection } from '../components/home/BuildYourBox';
import { PageTransition } from '../components/layout/PageTransition';

export const BuildYourBoxPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-paper">
        <BuildYourBoxSection />
      </div>
    </PageTransition>
  );
};
