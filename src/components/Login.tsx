
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { School, Shield } from 'lucide-react';

export function Login() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رمز المدرسة أو الإدارة",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const success = login(code);
    
    if (success) {
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في نظام فاتورتي القرآنية",
      });
    } else {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "الرمز غير صحيح، يرجى التأكد من الرمز المدخل",
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
              أدخل رمز المدرسة أو الإدارة للدخول
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
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="مثال: NOOR004 أو ADMIN"
                  className="text-right border-purple-200 focus:border-purple-400 text-lg font-mono text-center"
                  dir="ltr"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 text-lg"
                disabled={isLoading}
              >
                {isLoading ? "جاري تسجيل الدخول..." : "دخول"}
              </Button>

              <div className="text-center">
                <button 
                  type="button" 
                  className="text-sm text-purple-600 hover:text-purple-800 underline"
                  onClick={() => toast({
                    title: "مساعدة",
                    description: "يرجى التواصل مع الإدارة للحصول على رمز المدرسة",
                  })}
                >
                  لا أملك رمز المدرسة؟
                </button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                أمثلة على الرموز:
              </h3>
              <div className="text-sm text-purple-700 space-y-1">
                <p><strong>للإدارة:</strong> ADMIN</p>
                <p><strong>مدرسة النور:</strong> NOOR004</p>
                <p><strong>مدرسة أسماء:</strong> ASMA002</p>
                <p><strong>مدرسة آسيا:</strong> ASIA003</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
