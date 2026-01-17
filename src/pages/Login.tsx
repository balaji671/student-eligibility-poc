import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'; // New
import { loginUser } from '../store/slice/authSlice'; // New
import { Lock, Mail } from 'lucide-react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

interface LoginProps { }

export const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading: isLoading } = useAppSelector((state) => state.auth);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // Trigger Redux Thunk
      dispatch(loginUser({
        credentials: { email, password },
        navigate
      }));
    }
  };

  const handleDemoLogin = () => {
    const credentials = { email: 'demo@lea.org', password: 'demopassword' };
    dispatch(loginUser({
      credentials,
      navigate
    }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-blue-50 via-transparent to-transparent opacity-70 pointer-events-none" />

      <Card
        className="w-full max-w-md shadow-2xl shadow-blue-100/50 border-t-4 border-blue-600 rounded-xl z-10"
        role="main"
        aria-label="Login form"
      >
        <div className="text-center mb-10">
          <div className="h-20 w-20 bg-linear-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200 ring-4 ring-white">
            <span className="text-white font-black text-2xl tracking-tighter">LEA</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
            Student Eligibility
          </h1>
          <p className="text-slate-500 font-medium">Proof of Concept Demo Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-700 ml-1"
            >
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors h-5 w-5" />
              <InputText
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11! py-3! border-slate-200! hover:border-blue-400! transition-all rounded-lg!"
                placeholder="demo@lea.org"
                required
                aria-required="true"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-700 ml-1"
            >
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors h-5 w-5" />
              <InputText
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11! py-3! border-slate-200! hover:border-blue-400! transition-all rounded-lg!"
                placeholder="••••••••"
                required
                aria-required="true"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <Button
              type="submit"
              label={isLoading ? "Authenticating..." : "Sign In"}
              icon={isLoading ? "pi pi-spin pi-spinner" : "pi pi-sign-in"}
              className="w-full py-3! bg-blue-600! border-none! hover:bg-blue-700! transition-all transform active:scale-[0.98] font-bold shadow-md shadow-blue-200!"
              disabled={isLoading}
              aria-label={isLoading ? "Logging in, please wait" : "Login to system"}
            />

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-semibold">Quick Access</span></div>
            </div>

            <Button
              type="button"
              label="Use Demo Credentials"
              icon="pi pi-user"
              className="p-button-outlined w-full py-3! border-slate-300! text-slate-700! hover:bg-slate-50! transition-all font-semibold"
              onClick={handleDemoLogin}
              disabled={isLoading}
              aria-label="Login with demo credentials"
            />
          </div>
        </form>
      </Card>

      <p className="mt-8 text-slate-400 text-sm font-medium">
        © 2026 LEA Systems Inc. All rights reserved.
      </p>
    </div>
  );
};