import React from 'react';
import { Hero } from '../components/home/Hero';
import { Marquee } from '../components/home/Marquee';
import { CategoryShowcase } from '../components/home/CategoryShowcase';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { SnackFinder } from '../components/home/SnackFinder';
import { BuildYourBoxSection } from '../components/home/BuildYourBox';
import { BrandStory } from '../components/home/BrandStory';
import { Testimonials } from '../components/home/Testimonials';
import { FinalCTA } from '../components/home/FinalCTA';
import { PageTransition } from '../components/layout/PageTransition';

export const Home: React.FC = () => {
  return (
    <PageTransition>
      <div className="space-y-0">
        <Hero />
        <Marquee />
        <CategoryShowcase />
        <FeaturedProducts />
        <SnackFinder />
        <BuildYourBoxSection />
        <BrandStory />
        <Testimonials />
        <FinalCTA />
      </div>
    </PageTransition>
  );
};
