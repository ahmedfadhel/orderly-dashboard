import { useState } from 'react';
import { 
  Store, 
  Users, 
  CreditCard, 
  Truck, 
  Plug, 
  Moon, 
  Sun,
  Globe,
  Bell,
  Shield,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme } from '@/contexts/ThemeContext';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('store');

  const settingsSections = [
    { id: 'store', label: 'المتجر', icon: Store },
    { id: 'users', label: 'المستخدمين', icon: Users },
    { id: 'payments', label: 'الدفع', icon: CreditCard },
    { id: 'shipping', label: 'الشحن', icon: Truck },
    { id: 'integrations', label: 'التكاملات', icon: Plug },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="الإعدادات"
        description="إدارة إعدادات المتجر"
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/dashboard' },
          { label: 'الإعدادات' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="card-elevated p-4 h-fit">
          <nav className="space-y-1">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    activeTab === section.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'store' && (
            <>
              {/* Store Info */}
              <div className="card-elevated p-6">
                <h3 className="font-heading font-semibold mb-6">معلومات المتجر</h3>
                <div className="grid gap-4 max-w-lg">
                  <div>
                    <Label htmlFor="storeName">اسم المتجر</Label>
                    <Input id="storeName" defaultValue="متجري" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="storeEmail">البريد الإلكتروني</Label>
                    <Input id="storeEmail" type="email" defaultValue="store@example.com" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="storePhone">رقم الهاتف</Label>
                    <Input id="storePhone" defaultValue="+966501234567" className="mt-1.5" dir="ltr" />
                  </div>
                  <Button className="w-fit">حفظ التغييرات</Button>
                </div>
              </div>

              {/* Appearance */}
              <div className="card-elevated p-6">
                <h3 className="font-heading font-semibold mb-6">المظهر</h3>
                <div className="space-y-6 max-w-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {theme === 'light' ? (
                        <Sun className="w-5 h-5 text-warning" />
                      ) : (
                        <Moon className="w-5 h-5 text-info" />
                      )}
                      <div>
                        <p className="font-medium">الوضع الداكن</p>
                        <p className="text-sm text-muted-foreground">تفعيل المظهر الداكن للوحة التحكم</p>
                      </div>
                    </div>
                    <Switch
                      checked={theme === 'dark'}
                      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">اللغة</p>
                        <p className="text-sm text-muted-foreground">لغة لوحة التحكم</p>
                      </div>
                    </div>
                    <Select defaultValue="ar">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="card-elevated p-6">
                <h3 className="font-heading font-semibold mb-6">الإشعارات</h3>
                <div className="space-y-4 max-w-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">إشعارات الطلبات الجديدة</p>
                        <p className="text-sm text-muted-foreground">تلقي إشعار عند استلام طلب جديد</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">تنبيهات المخزون</p>
                        <p className="text-sm text-muted-foreground">تنبيه عند انخفاض المخزون</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'users' && (
            <div className="card-elevated p-6">
              <h3 className="font-heading font-semibold mb-6">المستخدمين والصلاحيات</h3>
              <div className="text-center py-12 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>إدارة المستخدمين والصلاحيات</p>
                <Button className="mt-4">إضافة مستخدم</Button>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="card-elevated p-6">
              <h3 className="font-heading font-semibold mb-6">إعدادات الدفع</h3>
              <div className="text-center py-12 text-muted-foreground">
                <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>ربط بوابات الدفع الإلكتروني</p>
                <Button className="mt-4">إضافة بوابة دفع</Button>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="card-elevated p-6">
              <h3 className="font-heading font-semibold mb-6">إعدادات الشحن</h3>
              <div className="text-center py-12 text-muted-foreground">
                <Truck className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>إدارة شركات الشحن والأسعار</p>
                <Button className="mt-4">إضافة طريقة شحن</Button>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="card-elevated p-6">
              <h3 className="font-heading font-semibold mb-6">التكاملات</h3>
              <div className="text-center py-12 text-muted-foreground">
                <Plug className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>ربط خدمات وأدوات خارجية</p>
                <Button className="mt-4">استعراض التكاملات</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
