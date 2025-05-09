
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import CourseMap from '@/components/CourseMap';
import Sponsors from '@/components/Sponsors';
import RegistrationForm from '@/components/RegistrationForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Hero />
      <main>
        <About />
        <Timeline />
        <CourseMap />
        <Sponsors />
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
