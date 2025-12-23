import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { toast } from '@/hooks/use-toast';
import type { Customer } from '@/lib/mockData';

interface CustomerDrawerProps {
  open: boolean;
  onClose: () => void;
  customer?: Customer | null;
}

export const CustomerDrawer = ({ open, onClose, customer }: CustomerDrawerProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const isEditing = !!customer;

  // Reset form when drawer opens/closes or customer changes
  useEffect(() => {
    if (open) {
      const defaultAddress = customer?.addresses?.find(a => a.isDefault) || customer?.addresses?.[0];
      setName(customer?.name || '');
      setEmail(customer?.email || '');
      setPhone(customer?.phone || '');
      setCity(defaultAddress?.city || '');
      setAddress(defaultAddress?.address || '');
      setNotes(customer?.notes || '');
    }
  }, [open, customer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast({
        title: 'خطأ في البيانات',
        description: 'الاسم والبريد الإلكتروني مطلوبان',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: isEditing ? 'تم تحديث العميل' : 'تم إضافة العميل',
      description: isEditing
        ? 'تم تحديث بيانات العميل بنجاح'
        : 'تمت إضافة العميل بنجاح',
    });
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="left"
        className="w-full sm:max-w-lg overflow-y-auto p-0"
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b border-border sticky top-0 bg-card z-10">
            <div className="flex items-center justify-between">
              <SheetTitle className="font-heading text-xl">
                {isEditing ? 'تعديل العميل' : 'إضافة عميل جديد'}
              </SheetTitle>
              <Button type="button" variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </SheetHeader>

          <div className="flex-1 p-6 space-y-5">
            {/* Name */}
            <div>
              <Label htmlFor="name">الاسم الكامل *</Label>
              <Input
                id="name"
                placeholder="مثال: أحمد محمد"
                className="mt-1.5"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">البريد الإلكتروني *</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                className="mt-1.5"
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+966 50 000 0000"
                className="mt-1.5"
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* City */}
            <div>
              <Label htmlFor="city">المدينة</Label>
              <Input
                id="city"
                placeholder="مثال: الرياض"
                className="mt-1.5"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address">العنوان</Label>
              <Textarea
                id="address"
                placeholder="أدخل العنوان التفصيلي..."
                className="mt-1.5 min-h-[80px]"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea
                id="notes"
                placeholder="ملاحظات إضافية عن العميل..."
                className="mt-1.5 min-h-[80px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border sticky bottom-0 bg-card">
            <div className="flex gap-3">
              <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                إلغاء
              </Button>
              <Button type="submit" className="flex-1">
                {isEditing ? 'حفظ التعديلات' : 'إضافة العميل'}
              </Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
