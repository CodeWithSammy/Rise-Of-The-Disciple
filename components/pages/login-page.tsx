"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield } from 'lucide-react';

export function LoginPage() {
  const { login } = useAuth();
  const [step, setStep] = useState<'name' | 'image' | 'complete'>('name');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    if (step === 'name' && username) {
      setStep('image');
    } else if (step === 'image' && imagePreview) {
      setStep('complete');
      setTimeout(() => {
        login(username, imagePreview);
      }, 2000);
    }
  };

  const getWelcomeMessage = () => {
    switch (step) {
      case 'name':
        return 'Welcome, Disciple. What shall we call you?';
      case 'image':
        return 'Excellent choice. Now, show us your face.';
      case 'complete':
        return 'Welcome to the journey. Preparing your dashboard...';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-[url('https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')] bg-cover bg-center bg-blend-overlay bg-opacity-70">
      <div className="w-full max-w-md p-8 space-y-8 glass-card rounded-lg border border-[#00a6ff] shadow-xl">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-[#00a6ff]" />
          <h2 className="mt-6 text-3xl font-extrabold text-white">Rise of the Disciple</h2>
          
          <div className="mt-4 min-h-[60px]">
            <p className="text-[#00a6ff] transition-all duration-300">
              {getWelcomeMessage()}
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {step === 'name' && (
            <div>
              <Input
                type="text"
                required
                className="glass-input w-full text-white"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}

          {step === 'image' && (
            <div className="space-y-4">
              {imagePreview && (
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-[#00a6ff]">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="glass-input w-full text-white"
              />
            </div>
          )}

          {step !== 'complete' && (
            <Button
              onClick={handleContinue}
              disabled={(step === 'name' && !username) || (step === 'image' && !imagePreview)}
              className="w-full bg-[#00a6ff] hover:bg-[#0088cc] text-white transition-all duration-300"
            >
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}