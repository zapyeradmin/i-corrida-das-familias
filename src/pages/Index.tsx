
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import KitsAtletas from '@/components/KitsAtletas';
import Timeline from '@/components/Timeline';
import CourseMap from '@/components/CourseMap';
import Sponsors from '@/components/Sponsors';
import RegistrationForm from '@/components/RegistrationForm';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="bg-blue-600 min-h-screen text-white">
      <Navbar />
      <Hero />
      <main>
        <About />
        <KitsAtletas />
        <Timeline />
        <CourseMap />
        <Sponsors />
        <div className="registration-section py-12 md:py-16" id="registration">
          <RegistrationForm />
        </div>
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
