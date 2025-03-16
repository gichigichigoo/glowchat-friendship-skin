
import React, { useState, useRef } from 'react';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type AuthMode = 'login' | 'signup';

const AuthScreen: React.FC<{ onAuthSuccess: () => void }> = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Simple email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password strength indicators
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: '', color: '' };
    if (password.length < 6) return { strength: 1, text: 'Yếu', color: 'bg-red-400' };
    if (password.length < 10) return { strength: 2, text: 'Trung bình', color: 'bg-yellow-400' };
    return { strength: 3, text: 'Mạnh', color: 'bg-green-400' };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailValid(true); // Reset validation on change
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsPasswordValid(true); // Reset validation on change
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!validateEmail(email)) {
      setIsEmailValid(false);
      toast({
        title: "Oops!",
        description: "Hình như bạn nhập sai email rồi.",
        variant: "destructive",
      });
      return;
    }

    if (mode === 'login') {
      // Simulate login logic
      // In a real app, you would call an auth API here
      if (password === 'demo123') {
        toast({
          title: "Đăng nhập thành công!",
          description: "Chào mừng bạn quay trở lại!",
        });
        onAuthSuccess();
      } else {
        setIsPasswordValid(false);
        // Shake animation trigger
        if (passwordRef.current) {
          passwordRef.current.classList.add('animate-shake');
          setTimeout(() => {
            if (passwordRef.current) {
              passwordRef.current.classList.remove('animate-shake');
            }
          }, 500);
        }
        toast({
          title: "Oops!",
          description: "Mật khẩu không đúng. Hãy thử lại hoặc nhấn 'Quên mật khẩu?' để đặt lại nhé.",
          variant: "destructive",
        });
      }
    } else {
      // Simulate signup
      toast({
        title: "Đăng ký thành công!",
        description: "Vui lòng kiểm tra email của bạn để xác nhận tài khoản.",
      });
      // In a real app, you would call a registration API here
      setTimeout(() => {
        setMode('login');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-lilac-50 to-peach-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all animate-fade-in">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-lilac-800 mb-2">
                Chào mừng bạn đến với GlowUp! ✨
              </h2>
              <p className="text-sm text-lilac-600">
                Hãy đăng nhập để bắt đầu hành trình chăm sóc da của bạn.
              </p>
            </div>

            {/* Decorative illustration */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-peach-100 flex items-center justify-center">
                <span className="text-4xl">✨</span>
              </div>
            </div>

            {/* Toggle between login and signup */}
            <div className="flex rounded-xl bg-lilac-50 p-1 mb-8">
              <button
                className={`flex-1 py-2 rounded-lg transition-all ${
                  mode === 'login' ? 'bg-white shadow-sm' : 'text-lilac-700'
                }`}
                onClick={() => setMode('login')}
              >
                Đăng nhập
              </button>
              <button
                className={`flex-1 py-2 rounded-lg transition-all ${
                  mode === 'signup' ? 'bg-white shadow-sm' : 'text-lilac-700'
                }`}
                onClick={() => setMode('signup')}
              >
                Đăng ký
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Email field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-lilac-700 mb-2" htmlFor="email">
                  Email
                </label>
                <div className={`relative rounded-xl overflow-hidden ${!isEmailValid ? 'ring-2 ring-red-400' : ''}`}>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-lilac-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="w-full pl-10 pr-4 py-3 border-lilac-200 rounded-xl focus:ring-2 focus:ring-lilac-500 focus:border-transparent transition-all"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {!isEmailValid && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                {!isEmailValid && (
                  <p className="mt-1 text-xs text-red-500">
                    Oops! Hình như bạn nhập sai email rồi.
                  </p>
                )}
              </div>

              {/* Password field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-lilac-700 mb-2" htmlFor="password">
                  Mật khẩu
                </label>
                <div 
                  className={`relative rounded-xl overflow-hidden ${!isPasswordValid ? 'ring-2 ring-red-400' : ''}`}
                  ref={passwordRef}
                >
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-lilac-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="w-full pl-10 pr-10 py-3 border-lilac-200 rounded-xl focus:ring-2 focus:ring-lilac-500 focus:border-transparent transition-all"
                    placeholder="Nhập mật khẩu của bạn"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-lilac-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-lilac-400" />
                    )}
                  </button>
                </div>
                {!isPasswordValid && (
                  <p className="mt-1 text-xs text-red-500">
                    Mật khẩu không đúng. Hãy thử lại.
                  </p>
                )}
              </div>

              {/* Password strength indicator (only for signup) */}
              {mode === 'signup' && password && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-lilac-600">Độ mạnh mật khẩu:</span>
                    <span className="text-xs font-medium">{passwordStrength.text}</span>
                  </div>
                  <div className="w-full h-1.5 bg-lilac-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.color} transition-all`}
                      style={{ width: `${(passwordStrength.strength / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Forgot password link (only for login) */}
              {mode === 'login' && (
                <div className="text-right mb-6">
                  <button
                    type="button"
                    className="text-sm text-lilac-600 hover:text-lilac-700 transition-colors"
                    onClick={() => toast({
                      title: "Đặt lại mật khẩu",
                      description: "Chúng tôi đã gửi email hướng dẫn đặt lại mật khẩu cho bạn.",
                    })}
                  >
                    Quên mật khẩu?
                  </button>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-3 px-6 bg-lilac-500 text-white rounded-xl font-semibold hover:bg-lilac-600 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
              >
                {mode === 'login' ? 'Đăng nhập' : 'Tiếp tục'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
