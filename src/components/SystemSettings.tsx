
import { useState } from 'react';
import { Save, Bell, Shield, Database, Mail, Users, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface SystemSettings {
  systemName: string;
  systemDescription: string;
  adminEmail: string;
  supportEmail: string;
  maxFileSize: number;
  allowedFileTypes: string[];
  emailNotifications: boolean;
  smsNotifications: boolean;
  autoApproval: boolean;
  backupEnabled: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
}

export function SystemSettings() {
  const [settings, setSettings] = useState<SystemSettings>({
    systemName: 'نظام إدارة فواتير البرامج القرآنية',
    systemDescription: 'نظام شامل لإدارة ومراجعة فواتير المدارس القرآنية',
    adminEmail: 'admin@quranprograms.sa',
    supportEmail: 'support@quranprograms.sa',
    maxFileSize: 10,
    allowedFileTypes: ['pdf', 'doc', 'docx'],
    emailNotifications: true,
    smsNotifications: false,
    autoApproval: false,
    backupEnabled: true,
    sessionTimeout: 30,
    maxLoginAttempts: 3
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // محاكاة حفظ الإعدادات
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('تم حفظ الإعدادات بنجاح');
  };

  const updateSetting = (key: keyof SystemSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-purple-800">إعدادات النظام</h1>
          <p className="text-purple-600 mt-2">إدارة إعدادات النظام والتكوين العام</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Save className="w-4 h-4 ml-2" />
          {isSaving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* الإعدادات العامة */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              الإعدادات العامة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="systemName">اسم النظام</Label>
              <Input
                id="systemName"
                value={settings.systemName}
                onChange={(e) => updateSetting('systemName', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="systemDescription">وصف النظام</Label>
              <Textarea
                id="systemDescription"
                value={settings.systemDescription}
                onChange={(e) => updateSetting('systemDescription', e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="adminEmail">بريد المدير الإلكتروني</Label>
              <Input
                id="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => updateSetting('adminEmail', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="supportEmail">بريد الدعم الفني</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => updateSetting('supportEmail', e.target.value)}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* إعدادات الأمان */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              إعدادات الأمان
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="sessionTimeout">مهلة انتهاء الجلسة (بالدقائق)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="maxLoginAttempts">الحد الأقصى لمحاولات تسجيل الدخول</Label>
              <Input
                id="maxLoginAttempts"
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => updateSetting('maxLoginAttempts', parseInt(e.target.value))}
                className="mt-1"
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="autoApproval">الموافقة التلقائية على الفواتير</Label>
              <Switch
                id="autoApproval"
                checked={settings.autoApproval}
                onCheckedChange={(checked) => updateSetting('autoApproval', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* إعدادات الملفات */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              إعدادات الملفات
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="maxFileSize">الحد الأقصى لحجم الملف (ميجابايت)</Label>
              <Input
                id="maxFileSize"
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => updateSetting('maxFileSize', parseInt(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label>أنواع الملفات المسموحة</Label>
              <div className="mt-2 space-y-2">
                {['pdf', 'doc', 'docx', 'jpg', 'png'].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={type}
                      checked={settings.allowedFileTypes.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateSetting('allowedFileTypes', [...settings.allowedFileTypes, type]);
                        } else {
                          updateSetting('allowedFileTypes', settings.allowedFileTypes.filter(t => t !== type));
                        }
                      }}
                      className="ml-2"
                    />
                    <Label htmlFor={type} className="text-sm">.{type}</Label>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="backupEnabled">تفعيل النسخ الاحتياطي التلقائي</Label>
              <Switch
                id="backupEnabled"
                checked={settings.backupEnabled}
                onCheckedChange={(checked) => updateSetting('backupEnabled', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* إعدادات التنبيهات */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              إعدادات التنبيهات
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">التنبيهات عبر البريد الإلكتروني</Label>
                <p className="text-sm text-gray-600">إرسال تنبيهات للمديرين عند تقديم فواتير جديدة</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="smsNotifications">التنبيهات عبر الرسائل النصية</Label>
                <p className="text-sm text-gray-600">إرسال تنبيهات للمدارس عند تحديث حالة الفواتير</p>
              </div>
              <Switch
                id="smsNotifications"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => updateSetting('smsNotifications', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* إجراءات سريعة */}
      <Card>
        <CardHeader>
          <CardTitle>إجراءات النظام</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Database className="w-6 h-6" />
              <span>نسخ احتياطي يدوي</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Key className="w-6 h-6" />
              <span>إعادة تعيين كلمات المرور</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Mail className="w-6 h-6" />
              <span>اختبار البريد الإلكتروني</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
