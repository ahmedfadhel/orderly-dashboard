import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import type { Product } from '@/lib/mockData';

interface ProductDrawerProps {
  open: boolean;
  onClose: () => void;
  product?: Product | null;
}

interface Variant {
  id: string;
  option1: string;
  option2: string;
  sku: string;
  price: string;
  compareAtPrice: string;
  cost: string;
  stock: string;
}

const categories = [
  'ملابس رجالية',
  'ملابس نسائية',
  'إكسسوارات',
  'إلكترونيات',
  'عطور',
  'أحذية',
  'حقائب',
  'العناية الشخصية',
  'مكتبيات',
];

const vendors = [
  'مصنع النسيج الوطني',
  'ورشة الجلود الفاخرة',
  'تقنيات المستقبل',
  'دار العطور الشرقية',
  'أزياء الشرق',
  'مصنع الأحذية العربي',
  'بصريات النخبة',
  'مختبرات الجمال الطبيعي',
];

const getInitialVariants = (product?: Product | null): Variant[] => {
  if (product && product.variants.length > 0) {
    return product.variants.map((v) => ({
      id: v.id,
      option1: v.option1 || '',
      option2: v.option2 || '',
      sku: v.sku || '',
      price: v.price?.toString() || '',
      compareAtPrice: v.compareAtPrice?.toString() || '',
      cost: v.cost?.toString() || '',
      stock: v.stock?.toString() || '',
    }));
  }
  return [{
    id: '1',
    option1: '',
    option2: '',
    sku: '',
    price: '',
    compareAtPrice: '',
    cost: '',
    stock: '',
  }];
};

export const ProductDrawer = ({ open, onClose, product }: ProductDrawerProps) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [trackInventory, setTrackInventory] = useState(true);
  const [variants, setVariants] = useState<Variant[]>(getInitialVariants(product));

  // Form state
  const [title, setTitle] = useState(product?.title || '');
  const [description, setDescription] = useState(product?.description || '');
  const [status, setStatus] = useState(product?.status || 'draft');
  const [category, setCategory] = useState(product?.category || '');
  const [vendor, setVendor] = useState(product?.vendor || '');

  const isEditing = !!product;

  // Reset form when product changes or drawer opens/closes
  useEffect(() => {
    if (open) {
      setTitle(product?.title || '');
      setDescription(product?.description || '');
      setStatus(product?.status || 'draft');
      setCategory(product?.category || '');
      setVendor(product?.vendor || '');
      setVariants(getInitialVariants(product));
      setActiveTab('basic');
    }
  }, [open, product]);

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        id: Date.now().toString(),
        option1: '',
        option2: '',
        sku: '',
        price: '',
        compareAtPrice: '',
        cost: '',
        stock: '',
      },
    ]);
  };

  const removeVariant = (id: string) => {
    if (variants.length > 1) {
      setVariants(variants.filter((v) => v.id !== id));
    }
  };

  const updateVariant = (id: string, field: keyof Variant, value: string) => {
    setVariants(
      variants.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: isEditing ? 'تم تحديث المنتج' : 'تم إضافة المنتج',
      description: isEditing ? 'تم تحديث بيانات المنتج بنجاح' : 'تمت إضافة المنتج بنجاح إلى المتجر',
    });
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent 
        side="left" 
        className="w-full sm:max-w-xl md:max-w-2xl overflow-y-auto p-0"
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b border-border sticky top-0 bg-card z-10">
            <div className="flex items-center justify-between">
              <SheetTitle className="font-heading text-xl">{isEditing ? 'تعديل المنتج' : 'إضافة منتج جديد'}</SheetTitle>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </SheetHeader>

          <div className="flex-1 p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full mb-6">
                <TabsTrigger value="basic">الأساسي</TabsTrigger>
                <TabsTrigger value="pricing">التسعير</TabsTrigger>
                <TabsTrigger value="inventory">المخزون</TabsTrigger>
                <TabsTrigger value="media">الوسائط</TabsTrigger>
              </TabsList>

              {/* Basic Info Tab */}
              <TabsContent value="basic" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">اسم المنتج *</Label>
                    <Input
                      id="title"
                      placeholder="مثال: قميص قطني كلاسيكي"
                      className="mt-1.5"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">الوصف</Label>
                    <Textarea
                      id="description"
                      placeholder="أضف وصفاً تفصيلياً للمنتج..."
                      className="mt-1.5 min-h-[120px]"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="status">الحالة</Label>
                      <Select value={status} onValueChange={(val) => setStatus(val as 'draft' | 'active' | 'archived')}>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">مسودة</SelectItem>
                          <SelectItem value="active">نشط</SelectItem>
                          <SelectItem value="archived">مؤرشف</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="category">الفئة</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="vendor">المورد</Label>
                    <Select value={vendor} onValueChange={setVendor}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="اختر المورد" />
                      </SelectTrigger>
                      <SelectContent>
                        {vendors.map((v) => (
                          <SelectItem key={v} value={v}>
                            {v}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              {/* Pricing Tab */}
              <TabsContent value="pricing" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    المتغيرات والأسعار
                  </h3>

                  {variants.map((variant, index) => (
                    <div
                      key={variant.id}
                      className="p-4 rounded-lg border border-border space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">المتغير {index + 1}</span>
                        {variants.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeVariant(variant.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs">الخيار 1 (مثل: اللون)</Label>
                          <Input
                            value={variant.option1}
                            onChange={(e) =>
                              updateVariant(variant.id, 'option1', e.target.value)
                            }
                            placeholder="أبيض"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">الخيار 2 (مثل: المقاس)</Label>
                          <Input
                            value={variant.option2}
                            onChange={(e) =>
                              updateVariant(variant.id, 'option2', e.target.value)
                            }
                            placeholder="M"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs">السعر (ر.س) *</Label>
                          <Input
                            type="number"
                            value={variant.price}
                            onChange={(e) =>
                              updateVariant(variant.id, 'price', e.target.value)
                            }
                            placeholder="0.00"
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label className="text-xs">السعر قبل الخصم</Label>
                          <Input
                            type="number"
                            value={variant.compareAtPrice}
                            onChange={(e) =>
                              updateVariant(
                                variant.id,
                                'compareAtPrice',
                                e.target.value
                              )
                            }
                            placeholder="0.00"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs">التكلفة (ر.س)</Label>
                        <Input
                          type="number"
                          value={variant.cost}
                          onChange={(e) =>
                            updateVariant(variant.id, 'cost', e.target.value)
                          }
                          placeholder="0.00"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={addVariant}
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة متغير
                  </Button>
                </div>
              </TabsContent>

              {/* Inventory Tab */}
              <TabsContent value="inventory" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium">تتبع المخزون</p>
                      <p className="text-sm text-muted-foreground">
                        تفعيل تتبع كمية المخزون لهذا المنتج
                      </p>
                    </div>
                    <Switch
                      checked={trackInventory}
                      onCheckedChange={setTrackInventory}
                    />
                  </div>

                  {trackInventory && (
                    <div className="space-y-4">
                      <h3 className="font-medium text-sm text-muted-foreground">
                        كمية المخزون لكل متغير
                      </h3>

                      {variants.map((variant, index) => (
                        <div
                          key={variant.id}
                          className="flex items-center gap-4 p-3 rounded-lg border border-border"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-sm">
                              المتغير {index + 1}
                              {variant.option1 && ` - ${variant.option1}`}
                              {variant.option2 && ` / ${variant.option2}`}
                            </p>
                          </div>
                          <div className="w-32">
                            <Input
                              type="number"
                              value={variant.stock}
                              onChange={(e) =>
                                updateVariant(variant.id, 'stock', e.target.value)
                              }
                              placeholder="0"
                            />
                          </div>
                        </div>
                      ))}

                      {variants.map((variant, index) => (
                        <div
                          key={`sku-${variant.id}`}
                          className="flex items-center gap-4 p-3 rounded-lg border border-border"
                        >
                          <div className="flex-1">
                            <Label className="text-xs">
                              SKU للمتغير {index + 1}
                            </Label>
                          </div>
                          <div className="w-48">
                            <Input
                              value={variant.sku}
                              onChange={(e) =>
                                updateVariant(variant.id, 'sku', e.target.value)
                              }
                              placeholder="PROD-001"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Media Tab */}
              <TabsContent value="media" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div>
                    <Label>صور المنتج</Label>
                    <div className="mt-2 border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                          <Plus className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <p className="font-medium mb-1">اسحب الصور هنا</p>
                        <p className="text-sm text-muted-foreground">
                          أو انقر للاختيار من جهازك
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          PNG, JPG, WEBP حتى 5 ميجابايت
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-lg bg-muted flex items-center justify-center border border-border"
                      >
                        <Plus className="w-6 h-6 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border sticky bottom-0 bg-card">
            <div className="flex gap-3">
              <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                إلغاء
              </Button>
              <Button type="submit" className="flex-1">
                {isEditing ? 'حفظ التعديلات' : 'حفظ المنتج'}
              </Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
