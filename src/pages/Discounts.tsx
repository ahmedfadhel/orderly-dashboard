import { useState } from 'react';
import { Plus, Percent, Tag, Truck } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable } from '@/components/ui/DataTable';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { DiscountDrawer } from '@/components/discounts/DiscountDrawer';
import { discounts, formatCurrency, formatDate, type Discount } from '@/lib/mockData';

const Discounts = () => {
  const [activeTab, setActiveTab] = useState('coupons');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);

  const openAddDrawer = () => {
    setEditingDiscount(null);
    setDrawerOpen(true);
  };

  const openEditDrawer = (discount: Discount) => {
    setEditingDiscount(discount);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditingDiscount(null);
  };

  const getDiscountTypeIcon = (type: Discount['type']) => {
    switch (type) {
      case 'percentage':
        return <Percent className="w-4 h-4" />;
      case 'fixed':
        return <Tag className="w-4 h-4" />;
      case 'free_shipping':
        return <Truck className="w-4 h-4" />;
    }
  };

  const getDiscountTypeLabel = (type: Discount['type']) => {
    switch (type) {
      case 'percentage':
        return 'نسبة مئوية';
      case 'fixed':
        return 'مبلغ ثابت';
      case 'free_shipping':
        return 'شحن مجاني';
    }
  };

  const getDiscountValue = (discount: Discount) => {
    switch (discount.type) {
      case 'percentage':
        return `${discount.value}%`;
      case 'fixed':
        return formatCurrency(discount.value);
      case 'free_shipping':
        return 'مجاني';
    }
  };

  const columns = [
    {
      key: 'status',
      header: 'الحالة',
      render: (discount: Discount) => <StatusBadge status={discount.status} />,
    },
    {
      key: 'code',
      header: 'الكود',
      render: (discount: Discount) => (
        <span className="font-mono font-medium bg-muted px-2 py-1 rounded">
          {discount.code}
        </span>
      ),
    },
    {
      key: 'type',
      header: 'النوع',
      render: (discount: Discount) => (
        <div className="flex items-center gap-2">
          {getDiscountTypeIcon(discount.type)}
          <span className="text-sm">{getDiscountTypeLabel(discount.type)}</span>
        </div>
      ),
    },
    {
      key: 'value',
      header: 'القيمة',
      render: (discount: Discount) => (
        <span className="font-medium text-primary">{getDiscountValue(discount)}</span>
      ),
    },
    {
      key: 'usage',
      header: 'الاستخدام',
      render: (discount: Discount) => (
        <span className="text-sm">
          {discount.usageCount}
          {discount.usageLimit && ` / ${discount.usageLimit}`}
        </span>
      ),
    },
    {
      key: 'dates',
      header: 'الفترة',
      render: (discount: Discount) => (
        <div className="text-sm">
          <p>{formatDate(discount.startDate)}</p>
          {discount.endDate && (
            <p className="text-muted-foreground">إلى {formatDate(discount.endDate)}</p>
          )}
        </div>
      ),
      className: 'hidden md:table-cell',
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="الخصومات"
        description={`${discounts.length} كود خصم`}
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/dashboard' },
          { label: 'الخصومات' },
        ]}
        actions={
          <Button onClick={openAddDrawer}>
            <Plus className="w-4 h-4 ml-2" />
            إنشاء خصم
          </Button>
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="coupons">أكواد الخصم</TabsTrigger>
          <TabsTrigger value="automatic">الخصومات التلقائية</TabsTrigger>
        </TabsList>

        <TabsContent value="coupons" className="mt-6">
          {discounts.length === 0 ? (
            <EmptyState
              icon={<Percent className="w-8 h-8" />}
              title="لا توجد خصومات"
              description="أنشئ كود خصم لعملائك"
              action={{
                label: 'إنشاء خصم',
                onClick: openAddDrawer,
              }}
            />
          ) : (
            <DataTable
              data={discounts}
              columns={columns}
              keyExtractor={(discount) => discount.id}
              actions={[
                { label: 'تعديل', onClick: (discount) => openEditDrawer(discount) },
                { label: 'نسخ الكود', onClick: (discount) => navigator.clipboard.writeText(discount.code) },
                { label: 'إيقاف', onClick: (discount) => console.log('Disable', discount.id), variant: 'destructive' },
              ]}
            />
          )}
        </TabsContent>

        <TabsContent value="automatic" className="mt-6">
          <EmptyState
            icon={<Percent className="w-8 h-8" />}
            title="لا توجد خصومات تلقائية"
            description="الخصومات التلقائية تطبق بدون كود"
            action={{
              label: 'إنشاء خصم تلقائي',
              onClick: openAddDrawer,
            }}
          />
        </TabsContent>
      </Tabs>

      {/* Discount Drawer */}
      <DiscountDrawer open={drawerOpen} onClose={closeDrawer} discount={editingDiscount} />
    </div>
  );
};

export default Discounts;
