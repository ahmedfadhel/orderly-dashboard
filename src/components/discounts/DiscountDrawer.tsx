import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { toast } from '@/hooks/use-toast';
import type { Discount } from '@/lib/mockData';

interface DiscountDrawerProps {
  open: boolean;
  onClose: () => void;
  discount?: Discount | null;
}

export const DiscountDrawer = ({ open, onClose, discount }: DiscountDrawerProps) => {
  const [code, setCode] = useState('');
  const [type, setType] = useState<'percentage' | 'fixed' | 'free_shipping'>('percentage');
  const [value, setValue] = useState('');
  const [minSubtotal, setMinSubtotal] = useState('');
  const [usageLimit, setUsageLimit] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hasEndDate, setHasEndDate] = useState(false);
  const [hasUsageLimit, setHasUsageLimit] = useState(false);
  const [hasMinSubtotal, setHasMinSubtotal] = useState(false);

  const isEditing = !!discount;

  // Reset form when drawer opens/closes or discount changes
  useEffect(() => {
    if (open) {
      setCode(discount?.code || '');
      setType(discount?.type || 'percentage');
      setValue(discount?.value?.toString() || '');
      setMinSubtotal(discount?.minSubtotal?.toString() || '');
      setUsageLimit(discount?.usageLimit?.toString() || '');
      setStartDate(discount?.startDate?.split('T')[0] || new Date().toISOString().split('T')[0]);
      setEndDate(discount?.endDate?.split('T')[0] || '');
      setHasEndDate(!!discount?.endDate);
      setHasUsageLimit(!!discount?.usageLimit);
      setHasMinSubtotal(!!discount?.minSubtotal);
    }
  }, [open, discount]);

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCode(result);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      toast({
        title: 'خطأ في البيانات',
        description: 'كود الخصم مطلوب',
        variant: 'destructive',
      });
      return;
    }

    if (type !== 'free_shipping' && !value) {
      toast({
        title: 'خطأ في البيانات',
        description: 'قيمة الخصم مطلوبة',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: isEditing ? 'تم تحديث الخصم' : 'تم إنشاء الخصم',
      description: isEditing
        ? 'تم تحديث كود الخصم بنجاح'
        : `تم إنشاء كود الخصم ${code} بنجاح`,
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
                {isEditing ? 'تعديل الخصم' : 'إنشاء خصم جديد'}
              </SheetTitle>
              <Button type="button" variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </SheetHeader>

          <div className="flex-1 p-6 space-y-5">
            {/* Code */}
            <div>
              <Label htmlFor="code">كود الخصم *</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  id="code"
                  placeholder="SUMMER20"
                  className="font-mono uppercase"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  required
                />
                <Button type="button" variant="outline" onClick={generateCode}>
                  توليد
                </Button>
              </div>
            </div>

            {/* Type */}
            <div>
              <Label htmlFor="type">نوع الخصم</Label>
              <Select value={type} onValueChange={(val) => setType(val as typeof type)}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">نسبة مئوية (%)</SelectItem>
                  <SelectItem value="fixed">مبلغ ثابت (ر.س)</SelectItem>
                  <SelectItem value="free_shipping">شحن مجاني</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Value */}
            {type !== 'free_shipping' && (
              <div>
                <Label htmlFor="value">
                  {type === 'percentage' ? 'نسبة الخصم (%)' : 'مبلغ الخصم (ر.س)'}
                </Label>
                <Input
                  id="value"
                  type="number"
                  placeholder={type === 'percentage' ? '10' : '50'}
                  className="mt-1.5"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  min="0"
                  max={type === 'percentage' ? '100' : undefined}
                  required
                />
              </div>
            )}

            {/* Min Subtotal */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">حد أدنى للشراء</p>
                  <p className="text-xs text-muted-foreground">
                    تطبيق الخصم فقط عند الوصول لمبلغ معين
                  </p>
                </div>
                <Switch checked={hasMinSubtotal} onCheckedChange={setHasMinSubtotal} />
              </div>
              {hasMinSubtotal && (
                <Input
                  type="number"
                  placeholder="100"
                  value={minSubtotal}
                  onChange={(e) => setMinSubtotal(e.target.value)}
                  min="0"
                />
              )}
            </div>

            {/* Usage Limit */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">حد الاستخدام</p>
                  <p className="text-xs text-muted-foreground">
                    عدد مرات استخدام الكود
                  </p>
                </div>
                <Switch checked={hasUsageLimit} onCheckedChange={setHasUsageLimit} />
              </div>
              {hasUsageLimit && (
                <Input
                  type="number"
                  placeholder="100"
                  value={usageLimit}
                  onChange={(e) => setUsageLimit(e.target.value)}
                  min="1"
                />
              )}
            </div>

            {/* Start Date */}
            <div>
              <Label htmlFor="startDate">تاريخ البدء</Label>
              <Input
                id="startDate"
                type="date"
                className="mt-1.5"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* End Date */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">تاريخ انتهاء</p>
                  <p className="text-xs text-muted-foreground">
                    إيقاف الخصم تلقائياً في تاريخ محدد
                  </p>
                </div>
                <Switch checked={hasEndDate} onCheckedChange={setHasEndDate} />
              </div>
              {hasEndDate && (
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                />
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border sticky bottom-0 bg-card">
            <div className="flex gap-3">
              <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                إلغاء
              </Button>
              <Button type="submit" className="flex-1">
                {isEditing ? 'حفظ التعديلات' : 'إنشاء الخصم'}
              </Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
