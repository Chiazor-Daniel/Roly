'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RegistrationForm } from '@/components/registration-form';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function Home() {
  const [view, setView] = useState<'landing' | 'form' | 'success'>('landing');

  const renderContent = () => {
    switch (view) {
      case 'form':
        return <RegistrationForm onSuccess={() => setView('success')} />;
      case 'success':
        return (
          <Card className="w-full max-w-2xl animate-in fade-in-50 duration-500">
            <CardHeader className="items-center text-center p-6 sm:p-8">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <CardTitle className="text-3xl">Registration Successful!</CardTitle>
              <CardDescription className="text-lg mt-2">
                Thank you for registering for the Rolly & Ini Conference. A confirmation has been sent to your email.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-6 sm:pb-8">
              <Button onClick={() => setView('landing')}>
                Register Another Person
              </Button>
            </CardContent>
          </Card>
        );
      case 'landing':
      default:
        return (
          <Card className="w-full max-w-2xl text-center animate-in fade-in-50 duration-500 bg-card/80 backdrop-blur-sm">
            <CardHeader className="p-6 sm:p-8">
              <CardTitle className="text-3xl md:text-4xl">Rolly & Ini Conference</CardTitle>
              <CardDescription className="text-base md:text-lg mt-2">
                Join us for an exciting conference filled with insightful talks and networking opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6 sm:pb-8">
              <Button size="lg" onClick={() => setView('form')}>
                Register Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Conference City"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-25"
          data-ai-hint="conference city"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>
      <main className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center space-y-8 p-4 md:p-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold font-headline text-primary">RegiFlow</h1>
          <p className="mt-2 text-lg text-muted-foreground">Effortless Conference Registration</p>
        </div>
        {renderContent()}
      </main>
    </div>
  );
}
