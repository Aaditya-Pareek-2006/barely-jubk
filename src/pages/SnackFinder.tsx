import React from 'react';
import { SnackFinder } from '../components/home/SnackFinder';
import { PageTransition } from '../components/layout/PageTransition';

export const SnackFinderPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-paper">
        <SnackFinder />
      </div>
    </PageTransition>
  );
};
