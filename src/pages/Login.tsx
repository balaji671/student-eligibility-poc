import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { toast } from 'sonner';
import { DemoBanner } from '../components/Common/DemoBanner';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock authentication - accept any credentials for demo
      if (email && password) {
        onLogin(); // Call the onLogin prop from App
        toast.success('Login successful! Welcome to the demo.');
        navigate('/dashboard');
      } else {
        toast.error('Please enter email and password');
      }
      setIsLoading(false);
    }, 500);
  };

  const handleDemoLogin = () => {
    setEmail('demo@lea.org');
    setPassword('demopassword');
    setIsLoading(true);

    setTimeout(() => {
      onLogin(); // Call the onLogin prop from App
      toast.success('Demo login successful! Welcome to the POC.');
      navigate('/dashboard');
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <DemoBanner />

      <Card
        className="w-full max-w-md shadow-lg"
        role="main"
        aria-label="Login form"
      >
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">LEA</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Student Eligibility System
          </h1>
          <p className="text-gray-600">Proof of Concept Demo</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <InputText
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10!"
                placeholder="demo@lea.org"
                required
                aria-required="true"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <InputText
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10!"
                placeholder="••••••••"
                required
                aria-required="true"
                disabled={isLoading}
              />
            </div>
          </div>

          <Button
            type="submit"
            label={isLoading ? "Logging in..." : "Login"}
            icon={isLoading ? "pi pi-spin pi-spinner" : "pi pi-sign-in"}
            className="w-full"
            disabled={isLoading}
            aria-label={isLoading ? "Logging in, please wait" : "Login to system"}
          />

          <Button
            type="button"
            label="Use Demo Credentials"
            icon="pi pi-user"
            className="p-button-outlined w-full mt-2!"
            onClick={handleDemoLogin}
            disabled={isLoading}
            aria-label="Login with demo credentials"
          />

          {/* <div className="text-center text-sm text-gray-500 mt-4">
            <p>Demo Credentials:</p>
            <p className="font-mono">demo@lea.org / anypassword</p>
          </div> */}
        </form>

        {/* <div
          role="region"
          aria-label="Demo disclaimer"
          className="mt-6 p-3 bg-blue-50 rounded text-sm text-blue-700"
        >
          <p className="font-semibold mb-1">⚠️ Demo Notice</p>
          <p>This is a mock authentication system. No real authentication occurs.</p>
          <p className="mt-1">Use any email and password to login for demonstration.</p>
        </div> */}
      </Card>
    </div>
  );
};