import { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { products, customers, formatCurrency, type Product, type Customer } from '@/lib/mockData';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

interface CartItem {
  productId: string;
  variantId: string;
  title: string;
  variantTitle: string;
  price: number;
  quantity: number;
}

export const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [productSearch, setProductSearch] = useState('');
  const [showProductSearch, setShowProductSearch] = useState(false);

  // Reset form when drawer closes
  useEffect(() => {
    if (!open) {
      setSelectedCustomer('');
      setCartItems([]);
      setProductSearch('');
      setShowProductSearch(false);
    }
  }, [open]);

  // Filter products based on search
  const filteredProducts = products.filter(
    (p) =>
      p.status === 'active' &&
      (p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.vendor.toLowerCase().includes(productSearch.toLowerCase()))
  );

  const addToCart = (product: Product, variantId: string) => {
    const variant = product.variants.find((v) => v.id === variantId);
    if (!variant) return;

    const existingIndex = cartItems.findIndex(
      (item) => item.productId === product.id && item.variantId === variantId
    );

    if (existingIndex >= 0) {
      const updatedItems = [...cartItems];
      updatedItems[existingIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      setCartItems([
        ...cartItems,
        {
          productId: product.id,
          variantId: variant.id,
          title: product.title,
          variantTitle: `${variant.option1}${variant.option2 ? ' / ' + variant.option2 : ''}`,
          price: variant.price,
          quantity: 1,
        },
      ]);
    }

    setShowProductSearch(false);
    setProductSearch('');
  };

  const updateQuantity = (index: number, delta: number) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity += delta;
    if (updatedItems[index].quantity <= 0) {
      updatedItems.splice(index, 1);
    }
    setCartItems(updatedItems);
  };

  const removeItem = (index: number) => {
    const updatedItems = [...cartItems];
    updatedItems.splice(index, 1);
    setCartItems(updatedItems);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast({
        title: 'السلة فارغة',
        description: 'أضف منتجات إلى السلة قبل الحفظ',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'تم إنشاء السلة',
      description: `تم إنشاء سلة جديدة بقيمة ${formatCurrency(total)}`,
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
              <SheetTitle className="font-heading text-xl">سلة جديدة</SheetTitle>
              <Button type="button" variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </SheetHeader>

          <div className="flex-1 p-6 space-y-6">
            {/* Customer Selection */}
            <div>
              <Label>العميل</Label>
              <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="اختر العميل" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name} - {customer.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Add Products */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>المنتجات</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowProductSearch(!showProductSearch)}
                >
                  <Plus className="w-4 h-4 ml-1" />
                  إضافة منتج
                </Button>
              </div>

              {/* Product Search */}
              {showProductSearch && (
                <div className="border border-border rounded-lg p-4 space-y-3 bg-muted/30">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="ابحث عن منتج..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="pr-10"
                    />
                  </div>

                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {filteredProducts.slice(0, 10).map((product) => (
                      <div key={product.id} className="border border-border rounded-lg p-3">
                        <p className="font-medium text-sm mb-2">{product.title}</p>
                        <div className="flex flex-wrap gap-2">
                          {product.variants.map((variant) => (
                            <Button
                              key={variant.id}
                              type="button"
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => addToCart(product, variant.id)}
                              disabled={variant.stock <= 0}
                            >
                              {variant.option1}
                              {variant.option2 && ` / ${variant.option2}`}
                              <span className="mr-1 text-muted-foreground">
                                ({formatCurrency(variant.price)})
                              </span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                    {filteredProducts.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        لا توجد منتجات
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Cart Items */}
              <div className="space-y-3">
                {cartItems.length === 0 ? (
                  <div className="border border-dashed border-border rounded-lg p-8 text-center">
                    <p className="text-muted-foreground">السلة فارغة</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      أضف منتجات من الزر أعلاه
                    </p>
                  </div>
                ) : (
                  cartItems.map((item, index) => (
                    <div
                      key={`${item.productId}-${item.variantId}`}
                      className="flex items-center justify-between p-3 border border-border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.variantTitle}</p>
                        <p className="text-sm text-primary mt-1">
                          {formatCurrency(item.price)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-border rounded-lg">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(index, -1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(index, 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeItem(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Summary */}
            {cartItems.length > 0 && (
              <div className="border border-border rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">المجموع الفرعي</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">الضريبة (15%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-medium">
                  <span>الإجمالي</span>
                  <span className="text-primary">{formatCurrency(total)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border sticky bottom-0 bg-card">
            <div className="flex gap-3">
              <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                إلغاء
              </Button>
              <Button type="submit" className="flex-1" disabled={cartItems.length === 0}>
                إنشاء السلة
              </Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
