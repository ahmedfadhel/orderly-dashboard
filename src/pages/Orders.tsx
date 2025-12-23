import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable } from '@/components/ui/DataTable';
import { EmptyState } from '@/components/ui/EmptyState';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { orders, formatCurrency, formatDate, type Order } from '@/lib/mockData';

const Orders = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Calculate status counts
  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    paid: orders.filter(o => o.status === 'paid').length,
    fulfilled: orders.filter(o => o.status === 'fulfilled').length,
    refunded: orders.filter(o => o.status === 'refunded').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: 'orderNumber',
      header: 'رقم الطلب',
      render: (order: Order) => (
        <span className="font-medium text-foreground">{order.orderNumber}</span>
      ),
    },
    {
      key: 'customer',
      header: 'العميل',
      render: (order: Order) => (
        <div>
          <p className="font-medium">{order.customer.name}</p>
          <p className="text-sm text-muted-foreground">{order.customer.email}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'الحالة',
      render: (order: Order) => <StatusBadge status={order.status} />,
    },
    {
      key: 'payment',
      header: 'الدفع',
      render: (order: Order) => (
        <StatusBadge status={order.paymentStatus === 'refunded' ? 'refunded' : order.paymentStatus} />
      ),
      className: 'hidden md:table-cell',
    },
    {
      key: 'fulfillment',
      header: 'التوصيل',
      render: (order: Order) => (
        <span className="text-sm capitalize">
          {order.fulfillmentStatus === 'unfulfilled' && 'غير مكتمل'}
          {order.fulfillmentStatus === 'partial' && 'جزئي'}
          {order.fulfillmentStatus === 'fulfilled' && 'مكتمل'}
        </span>
      ),
      className: 'hidden lg:table-cell',
    },
    {
      key: 'total',
      header: 'الإجمالي',
      render: (order: Order) => (
        <span className="font-medium">{formatCurrency(order.total)}</span>
      ),
    },
    {
      key: 'date',
      header: 'التاريخ',
      render: (order: Order) => (
        <span className="text-sm text-muted-foreground">
          {formatDate(order.createdAt)}
        </span>
      ),
      className: 'hidden md:table-cell',
    },
  ];

  const statusPills = [
    { value: 'all', label: 'الكل', count: statusCounts.all },
    { value: 'pending', label: 'معلق', count: statusCounts.pending },
    { value: 'paid', label: 'مدفوع', count: statusCounts.paid },
    { value: 'fulfilled', label: 'مكتمل', count: statusCounts.fulfilled },
    { value: 'refunded', label: 'مسترد', count: statusCounts.refunded },
    { value: 'cancelled', label: 'ملغي', count: statusCounts.cancelled },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="الطلبات"
        description={`${orders.length} طلب`}
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/dashboard' },
          { label: 'الطلبات' },
        ]}
      />

      {/* Status Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statusPills.map((pill) => (
          <button
            key={pill.value}
            onClick={() => setStatusFilter(pill.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              statusFilter === pill.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {pill.label}
            <span className="mr-2 opacity-70">({pill.count})</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="card-flat p-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="البحث بالرقم أو اسم العميل..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <EmptyState
          icon={<ShoppingCart className="w-8 h-8" />}
          title="لا توجد طلبات"
          description={search || statusFilter !== 'all'
            ? 'لا توجد نتائج تطابق معايير البحث'
            : 'لم يتم استلام أي طلبات بعد'}
        />
      ) : (
        <DataTable
          data={filteredOrders}
          columns={columns}
          keyExtractor={(order) => order.id}
          onRowClick={(order) => navigate(`/orders/${order.id}`)}
          actions={[
            { label: 'عرض التفاصيل', onClick: (order) => navigate(`/orders/${order.id}`) },
            { label: 'طباعة الفاتورة', onClick: (order) => console.log('Print', order.id) },
          ]}
        />
      )}
    </div>
  );
};

export default Orders;
