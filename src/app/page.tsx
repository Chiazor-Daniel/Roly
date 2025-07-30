'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RegistrationForm } from '@/components/registration-form';
import { CheckCircle, ArrowRight, Video, BarChart, Users } from 'lucide-react';

const LandingPage = ({ onRegisterClick }: { onRegisterClick: () => void }) => (
  <div className="w-full">
    <header className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white overflow-hidden rounded-xl shadow-2xl">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="City background for conference"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-40"
          data-ai-hint="city conference"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 p-4 animate-in fade-in-50 duration-700">
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight">Rolly & Ini Conference</h1>
        <p className="mt-4 text-lg md:text-2xl max-w-3xl mx-auto">
          Join innovators, creators, and pioneers shaping the future.
        </p>
        <Button size="lg" className="mt-8" onClick={onRegisterClick}>
          Register <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </header>
    
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Attend?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Video className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Speakers</h3>
            <p className="text-muted-foreground">Learn from the best in the industry.</p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Networking</h3>
            <p className="text-muted-foreground">Connect with peers and build your network.</p>
          </div>
          <div className="flex flex-col items-center">
            <BarChart className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Cutting-Edge Content</h3>
            <p className="text-muted-foreground">Discover the latest trends and technologies.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-secondary py-16 md:py-24 rounded-lg">
       <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1592758080692-b6a5dbe9c725?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Speaker at conference"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
            data-ai-hint="conference speaker"
          />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">A Glimpse of the Future</h2>
          <p className="text-muted-foreground text-lg mb-6">Our conference brings together the brightest minds to explore tomorrow's technology. From AI to blockchain, we cover the topics that matter.</p>
          <Button size="lg" onClick={onRegisterClick}>
            Join The Conversation
          </Button>
        </div>
      </div>
    </section>
  </div>
);


export default function Home() {
  const [view, setView] = useState<'landing' | 'form' | 'success'>('landing');

  const renderContent = () => {
    switch (view) {
      case 'form':
        return <RegistrationForm onSuccess={() => setView('success')} />;
      case 'success':
        return (
          <div className="flex items-center justify-center min-h-[60vh] w-full">
            <Card className="w-full max-w-2xl animate-in fade-in-50 duration-500">
              <CardHeader className="items-center text-center p-6 sm:p-8">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <CardTitle className="text-3xl">Registration Successful!</CardTitle>
                <CardDescription className="text-lg mt-2">
                  Thank you for registering. A confirmation has been sent to your email.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pb-6 sm:pb-8">
                <Button onClick={() => setView('landing')}>
                  Back to Home
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      case 'landing':
      default:
        return <LandingPage onRegisterClick={() => setView('form')} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <main className="container mx-auto flex w-full flex-col items-center justify-center space-y-8 p-4 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-primary">Rolly & Ini HR Centre</h1>
          <p className="mt-2 text-lg text-muted-foreground">Effortless Conference Registration</p>
        </div>
        {renderContent()}
      </main>
      <footer className="text-center py-8 border-t">
        <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Rolly & Ini Conference. All rights reserved.</p>
      </footer>
    </div>
  );
}
