import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Package, Edit, Trash2, Copy } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { products, formatCurrency, formatDate } from '@/lib/mockData';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Package className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">المنتج غير موجود</h2>
        <p className="text-muted-foreground mb-4">لم يتم العثور على المنتج المطلوب</p>
        <Button onClick={() => navigate('/products')}>
          <ArrowRight className="w-4 h-4 ml-2" />
          العودة للمنتجات
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        title={product.title}
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/dashboard' },
          { label: 'المنتجات', href: '/products' },
          { label: product.title },
        ]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Copy className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button>
              <Edit className="w-4 h-4 ml-2" />
              تعديل
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Info */}
          <div className="card-elevated p-6">
            <div className="flex items-start gap-6">
              {/* Image Gallery */}
              <div className="w-32 h-32 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <Package className="w-12 h-12 text-muted-foreground" />
              </div>
              
              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <StatusBadge status={product.status} />
                </div>
                <h2 className="text-xl font-heading font-bold mb-2">{product.title}</h2>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">الفئة: </span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">المورد: </span>
                    <span className="font-medium">{product.vendor}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="card-elevated overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-heading font-semibold">المتغيرات</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">المتغير</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">SKU</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">السعر</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">السعر السابق</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">التكلفة</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">المخزون</th>
                  </tr>
                </thead>
                <tbody>
                  {product.variants.map((variant) => (
                    <tr key={variant.id} className="border-b border-border hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <span className="font-medium">
                          {variant.option1}
                          {variant.option2 && ` / ${variant.option2}`}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {variant.sku}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {formatCurrency(variant.price)}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {variant.compareAtPrice ? formatCurrency(variant.compareAtPrice) : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {formatCurrency(variant.cost)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-medium ${variant.stock < 10 ? 'text-warning' : ''}`}>
                          {variant.stock}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing Summary */}
          <div className="card-elevated p-6">
            <h3 className="font-heading font-semibold mb-4">ملخص الأسعار</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">نطاق السعر</span>
                <span className="font-medium">
                  {product.price.min === product.price.max
                    ? formatCurrency(product.price.min)
                    : `${formatCurrency(product.price.min)} - ${formatCurrency(product.price.max)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">متوسط التكلفة</span>
                <span className="font-medium">
                  {formatCurrency(
                    product.variants.reduce((sum, v) => sum + v.cost, 0) / product.variants.length
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">هامش الربح</span>
                <span className="font-medium text-success">
                  {Math.round(
                    ((product.price.min - product.variants[0].cost) / product.price.min) * 100
                  )}%
                </span>
              </div>
            </div>
          </div>

          {/* Inventory Summary */}
          <div className="card-elevated p-6">
            <h3 className="font-heading font-semibold mb-4">ملخص المخزون</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">إجمالي المخزون</span>
                <span className="font-medium">{product.totalStock}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">عدد المتغيرات</span>
                <span className="font-medium">{product.variants.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">متغيرات منخفضة</span>
                <span className="font-medium text-warning">
                  {product.variants.filter(v => v.stock < 10).length}
                </span>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="card-elevated p-6">
            <h3 className="font-heading font-semibold mb-4">النشاط</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">تاريخ الإنشاء</span>
                <span>{formatDate(product.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">آخر تحديث</span>
                <span>{formatDate(product.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
