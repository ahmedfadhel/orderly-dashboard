import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Users } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { DataTable } from '@/components/ui/DataTable';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CustomerDrawer } from '@/components/customers/CustomerDrawer';
import { customers, formatCurrency, formatDate, type Customer } from '@/lib/mockData';

const Customers = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const openAddDrawer = () => {
    setEditingCustomer(null);
    setDrawerOpen(true);
  };

  const openEditDrawer = (customer: Customer) => {
    setEditingCustomer(customer);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditingCustomer(null);
  };

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search);
    return matchesSearch;
  });

  const columns = [
    {
      key: 'name',
      header: 'العميل',
      render: (customer: Customer) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {customer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div>
            <p className="font-medium">{customer.name}</p>
            <p className="text-sm text-muted-foreground">{customer.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'phone',
      header: 'الهاتف',
      render: (customer: Customer) => (
        <span dir="ltr" className="text-sm text-muted-foreground">
          {customer.phone}
        </span>
      ),
      className: 'hidden md:table-cell',
    },
    {
      key: 'totalSpent',
      header: 'إجمالي الإنفاق',
      render: (customer: Customer) => (
        <span className="font-medium">{formatCurrency(customer.totalSpent)}</span>
      ),
    },
    {
      key: 'totalOrders',
      header: 'الطلبات',
      render: (customer: Customer) => (
        <span className="text-sm">{customer.totalOrders}</span>
      ),
    },
    {
      key: 'lastOrder',
      header: 'آخر طلب',
      render: (customer: Customer) => (
        <span className="text-sm text-muted-foreground">
          {formatDate(customer.lastOrderDate)}
        </span>
      ),
      className: 'hidden lg:table-cell',
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="العملاء"
        description={`${customers.length} عميل`}
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/dashboard' },
          { label: 'العملاء' },
        ]}
        actions={
          <Button onClick={openAddDrawer}>
            <Plus className="w-4 h-4 ml-2" />
            إضافة عميل
          </Button>
        }
      />

      {/* Search */}
      <div className="card-flat p-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="البحث بالاسم أو البريد أو الهاتف..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      {/* Customers Table */}
      {filteredCustomers.length === 0 ? (
        <EmptyState
          icon={<Users className="w-8 h-8" />}
          title="لا يوجد عملاء"
          description={search
            ? 'لا توجد نتائج تطابق معايير البحث'
            : 'لم يتم تسجيل أي عملاء بعد'}
          action={
            search
              ? undefined
              : {
                  label: 'إضافة عميل',
                  onClick: openAddDrawer,
                }
          }
        />
      ) : (
        <DataTable
          data={filteredCustomers}
          columns={columns}
          keyExtractor={(customer) => customer.id}
          onRowClick={(customer) => navigate(`/customers/${customer.id}`)}
          actions={[
            { label: 'تعديل', onClick: (customer) => openEditDrawer(customer) },
            { label: 'عرض الملف الشخصي', onClick: (customer) => navigate(`/customers/${customer.id}`) },
          ]}
        />
      )}

      {/* Customer Drawer */}
      <CustomerDrawer open={drawerOpen} onClose={closeDrawer} customer={editingCustomer} />
    </div>
  );
};

export default Customers;
