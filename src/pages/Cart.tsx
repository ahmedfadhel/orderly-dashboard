import { useState } from 'react';
import { Plus, ShoppingBasket, Search, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { DataTable } from '@/components/ui/DataTable';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { formatCurrency, formatDate } from '@/lib/mockData';

// Mock cart data
interface Cart {
  id: string;
  customerName: string;
  customerEmail: string;
  itemsCount: number;
  total: number;
  status: 'active' | 'abandoned' | 'converted';
  createdAt: string;
  updatedAt: string;
}

const mockCarts: Cart[] = [
  {
    id: 'cart-1',
    customerName: 'أحمد محمد العلي',
    customerEmail: 'ahmed@example.com',
    itemsCount: 3,
    total: 520,
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'cart-2',
    customerName: 'فاطمة سعيد الحربي',
    customerEmail: 'fatima@example.com',
    itemsCount: 1,
    total: 450,
    status: 'abandoned',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-14T14:20:00Z',
  },
  {
    id: 'cart-3',
    customerName: 'محمد عبدالله القحطاني',
    customerEmail: 'mohammed@example.com',
    itemsCount: 2,
    total: 1170,
    status: 'converted',
    createdAt: '2024-01-13T09:45:00Z',
    updatedAt: '2024-01-13T12:00:00Z',
  },
];

const statusLabels: Record<Cart['status'], string> = {
  active: 'نشطة',
  abandoned: 'متروكة',
  converted: 'محولة لطلب',
};

const statusColors: Record<Cart['status'], string> = {
  active: 'bg-success/10 text-success',
  abandoned: 'bg-warning/10 text-warning',
  converted: 'bg-primary/10 text-primary',
};

const Cart = () => {
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [carts] = useState<Cart[]>(mockCarts);

  // Filter carts
  const filteredCarts = carts.filter(
    (cart) =>
      cart.customerName.toLowerCase().includes(search.toLowerCase()) ||
      cart.customerEmail.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: 'customer',
      header: 'العميل',
      render: (cart: Cart) => (
        <div>
          <p className="font-medium text-foreground">{cart.customerName}</p>
          <p className="text-sm text-muted-foreground">{cart.customerEmail}</p>
        </div>
      ),
    },
    {
      key: 'items',
      header: 'المنتجات',
      render: (cart: Cart) => (
        <span className="text-sm">{cart.itemsCount} منتج</span>
      ),
    },
    {
      key: 'total',
      header: 'الإجمالي',
      render: (cart: Cart) => (
        <span className="font-medium">{formatCurrency(cart.total)}</span>
      ),
    },
    {
      key: 'status',
      header: 'الحالة',
      render: (cart: Cart) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[cart.status]}`}
        >
          {statusLabels[cart.status]}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'تاريخ الإنشاء',
      render: (cart: Cart) => (
        <span className="text-sm text-muted-foreground">{formatDate(cart.createdAt)}</span>
      ),
      className: 'hidden md:table-cell',
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="السلات"
        description={`${carts.length} سلة في المتجر`}
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/dashboard' },
          { label: 'السلات' },
        ]}
        actions={
          <Button onClick={() => setDrawerOpen(true)}>
            <Plus className="w-4 h-4 ml-2" />
            إنشاء سلة
          </Button>
        }
      />

      {/* Filters */}
      <div className="card-flat p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="البحث عن سلة..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-10"
            />
          </div>
        </div>
      </div>

      {/* Carts Table */}
      {filteredCarts.length === 0 ? (
        <EmptyState
          icon={<ShoppingBasket className="w-8 h-8" />}
          title="لا توجد سلات"
          description={
            search ? 'لا توجد نتائج تطابق معايير البحث' : 'ابدأ بإنشاء سلة جديدة'
          }
          action={
            search
              ? undefined
              : {
                  label: 'إنشاء سلة',
                  onClick: () => setDrawerOpen(true),
                }
          }
        />
      ) : (
        <DataTable
          data={filteredCarts}
          columns={columns}
          keyExtractor={(cart) => cart.id}
          actions={[
            { label: 'تحويل لطلب', onClick: (cart) => console.log('Convert', cart.id) },
            { label: 'حذف', onClick: (cart) => console.log('Delete', cart.id), variant: 'destructive' },
          ]}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Cart;
