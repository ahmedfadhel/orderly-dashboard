import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { KPICard } from '@/components/ui/KPICard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton, KPICardSkeleton, TableSkeleton } from '@/components/ui/LoadingSkeleton';
import { DollarSign, Package, Search, Plus, Bell } from 'lucide-react';

const DesignTokens = () => {
  const colors = [
    { name: '--background', label: 'الخلفية' },
    { name: '--foreground', label: 'النص الأساسي' },
    { name: '--card', label: 'البطاقات' },
    { name: '--primary', label: 'الأساسي' },
    { name: '--secondary', label: 'الثانوي' },
    { name: '--muted', label: 'المخفف' },
    { name: '--accent', label: 'التمييز' },
    { name: '--destructive', label: 'التحذيري' },
    { name: '--success', label: 'النجاح' },
    { name: '--warning', label: 'التنبيه' },
    { name: '--info', label: 'المعلومات' },
    { name: '--border', label: 'الحدود' },
  ];

  const spacing = [
    { value: '4px', class: 'p-1' },
    { value: '8px', class: 'p-2' },
    { value: '12px', class: 'p-3' },
    { value: '16px', class: 'p-4' },
    { value: '24px', class: 'p-6' },
    { value: '32px', class: 'p-8' },
    { value: '48px', class: 'p-12' },
  ];

  const typography = [
    { size: '12px', class: 'text-xs', label: 'XS' },
    { size: '14px', class: 'text-sm', label: 'SM' },
    { size: '16px', class: 'text-base', label: 'Base' },
    { size: '20px', class: 'text-xl', label: 'XL' },
    { size: '24px', class: 'text-2xl', label: '2XL' },
    { size: '32px', class: 'text-3xl', label: '3XL' },
  ];

  const radii = [
    { value: '4px', class: 'rounded-sm' },
    { value: '8px', class: 'rounded-md' },
    { value: '12px', class: 'rounded-lg' },
    { value: '16px', class: 'rounded-xl' },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="نظام التصميم"
        description="دليل مرجعي لعناصر التصميم والمكونات"
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/dashboard' },
          { label: 'نظام التصميم' },
        ]}
      />

      {/* Colors */}
      <section className="mb-12">
        <h2 className="text-xl font-heading font-bold mb-6">الألوان</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {colors.map((color) => (
            <div key={color.name} className="card-flat p-4">
              <div 
                className="w-full h-16 rounded-lg mb-3 border border-border"
                style={{ backgroundColor: `hsl(var(${color.name}))` }}
              />
              <p className="text-sm font-medium">{color.label}</p>
              <p className="text-xs text-muted-foreground font-mono">{color.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing */}
      <section className="mb-12">
        <h2 className="text-xl font-heading font-bold mb-6">المسافات</h2>
        <div className="card-flat p-6">
          <div className="flex flex-wrap items-end gap-4">
            {spacing.map((space) => (
              <div key={space.value} className="text-center">
                <div 
                  className={`bg-primary ${space.class} mb-2`}
                  style={{ width: space.value, height: space.value }}
                />
                <p className="text-sm font-mono">{space.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="mb-12">
        <h2 className="text-xl font-heading font-bold mb-6">الخطوط</h2>
        <div className="card-flat p-6 space-y-4">
          {typography.map((type) => (
            <div key={type.size} className="flex items-center gap-4">
              <span className="w-16 text-sm text-muted-foreground font-mono">{type.size}</span>
              <span className={type.class}>نص عربي للاختبار - Arabic Sample Text</span>
            </div>
          ))}
        </div>
      </section>

      {/* Border Radius */}
      <section className="mb-12">
        <h2 className="text-xl font-heading font-bold mb-6">الحواف</h2>
        <div className="card-flat p-6">
          <div className="flex flex-wrap gap-6">
            {radii.map((radius) => (
              <div key={radius.value} className="text-center">
                <div className={`w-20 h-20 bg-primary ${radius.class} mb-2`} />
                <p className="text-sm font-mono">{radius.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="mb-12">
        <h2 className="text-xl font-heading font-bold mb-6">الأزرار</h2>
        <div className="card-flat p-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <Button>أساسي</Button>
            <Button variant="secondary">ثانوي</Button>
            <Button variant="outline">محاط</Button>
            <Button variant="ghost">شبحي</Button>
            <Button variant="destructive">تحذيري</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="sm">صغير</Button>
            <Button size="default">متوسط</Button>
            <Button size="lg">كبير</Button>
            <Button size="icon"><Plus className="w-4 h-4" /></Button>
          </div>
        </div>
      </section>

      {/* Inputs */}
      <section className="mb-12">
        <h2 className="text-xl font-heading font-bold mb-6">الحقول</h2>
        <div className="card-flat p-6">
          <div className="grid gap-4 max-w-md">
            <Input placeholder="حقل نصي عادي" />
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="حقل مع أيقونة" className="pr-10" />
            </div>
            <Input placeholder="حقل معطل" disabled />
          </div>
        </div>
      </section>

      {/* Status Badges */}
      <section className="mb-12">
        <h2 className="text-xl font-heading font-bold mb-6">شارات الحالة</h2>
        <div className="card-flat p-6">
          <div className="flex flex-wrap gap-3 mb-4">
            <p className="w-full text-sm text-muted-foreground mb-2">حالات المنتجات:</p>
            <StatusBadge status="draft" />
            <StatusBadge status="active" />
            <StatusBadge status="archived" />
          </div>
          <div className="flex flex-wrap gap-3">
            <p className="w-full text-sm text-muted-foreground mb-2">حالات الطلبات:</p>
            <StatusBadge status="pending" />
            <StatusBadge status="paid" />
            <StatusBadge status="fulfilled" />
            <StatusBadge status="refunded" />
            <StatusBadge status="cancelled" />
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="mb-12">
        <h2 className="text-xl font-heading font-bold mb-6">بطاقات المؤشرات</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <KPICard
            title="إجمالي المبيعات"
            value="125,450 ر.س"
            change={12.5}
            changeLabel="من الشهر الماضي"
            icon={<DollarSign className="w-5 h-5" />}
          />
          <KPICard
            title="المنتجات"
            value="156"
            change={-2.4}
            changeLabel="من الأسبوع الماضي"
            icon={<Package className="w-5 h-5" />}
          />
          <KPICardSkeleton />
        </div>
      </section>

      {/* Empty State */}
      <section className="mb-12">
        <h2 className="text-xl font-heading font-bold mb-6">حالة فارغة</h2>
        <div className="card-flat">
          <EmptyState
            icon={<Package className="w-8 h-8" />}
            title="لا توجد منتجات"
            description="ابدأ بإضافة منتجك الأول إلى المتجر"
            action={{
              label: 'إضافة منتج',
              onClick: () => console.log('Add product'),
            }}
          />
        </div>
      </section>

      {/* Loading Skeletons */}
      <section className="mb-12">
        <h2 className="text-xl font-heading font-bold mb-6">حالات التحميل</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-24" />
          </div>
          <TableSkeleton rows={3} columns={4} />
        </div>
      </section>

      {/* Shadows */}
      <section className="mb-12">
        <h2 className="text-xl font-heading font-bold mb-6">الظلال</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-card p-6 rounded-lg shadow-sm text-center">
            <p className="text-sm">Shadow SM</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md text-center">
            <p className="text-sm">Shadow MD</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg text-center">
            <p className="text-sm">Shadow LG</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-xl text-center">
            <p className="text-sm">Shadow XL</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignTokens;
