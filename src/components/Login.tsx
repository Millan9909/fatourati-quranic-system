
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, School, Shield } from 'lucide-react';

export function Login() {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code || !password) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال الرمز وكلمة المرور",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const success = login(code, password);
    
    if (success) {
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في نظام فاتورتي القرآنية",
      });
    } else {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "الرمز أو كلمة المرور غير صحيحة",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src="https://www.qksh.org.sa/rafed/uploads/system/67a8c3fc404e25.53027719.png" 
            alt="شعار المنصة" 
            className="mx-auto h-24 w-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-purple-800 mb-2">فاتورتي القرآنية</h1>
          <p className="text-purple-600">نظام إدارة فواتير البرامج القرآنية</p>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl text-purple-800 flex items-center justify-center gap-2">
              <School className="h-5 w-5" />
              تسجيل الدخول
            </CardTitle>
            <CardDescription className="text-purple-600">
              أدخل رمز المدرسة وكلمة المرور للدخول
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="code" className="text-sm font-medium text-purple-800">
                  رمز المدرسة أو الإدارة
                </label>
                <Input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="مثال: NOOR004 أو ADMIN"
                  className="text-right border-purple-200 focus:border-purple-400"
                  dir="ltr"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-purple-800">
                  كلمة المرور
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور"
                    className="text-right border-purple-200 focus:border-purple-400 pl-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2.5"
                disabled={isLoading}
              >
                {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>

              <div className="text-center">
                <button 
                  type="button" 
                  className="text-sm text-purple-600 hover:text-purple-800 underline"
                  onClick={() => toast({
                    title: "استعادة كلمة المرور",
                    description: "يرجى التواصل مع الإدارة لاستعادة كلمة المرور",
                  })}
                >
                  نسيت كلمة المرور؟
                </button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                معلومات تجريبية:
              </h3>
              <div className="text-sm text-purple-700 space-y-1">
                <p><strong>للإدارة:</strong> ADMIN / 9909</p>
                <p><strong>مدرسة النور:</strong> NOOR004 / 4567</p>
                <p><strong>مدرسة أسماء:</strong> ASMA002 / 2345</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
