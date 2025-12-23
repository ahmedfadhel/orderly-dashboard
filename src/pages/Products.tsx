import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Package } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable } from '@/components/ui/DataTable';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductDrawer } from '@/components/products/ProductDrawer';
import { products, formatCurrency, formatDate, type Product } from '@/lib/mockData';

const Products = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Get unique categories
  const categories = [...new Set(products.map(p => p.category))];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.vendor.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const columns = [
    {
      key: 'image',
      header: 'الصورة',
      render: (product: Product) => (
        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
          <Package className="w-5 h-5 text-muted-foreground" />
        </div>
      ),
      className: 'w-16',
    },
    {
      key: 'title',
      header: 'المنتج',
      render: (product: Product) => (
        <div>
          <p className="font-medium text-foreground">{product.title}</p>
          <p className="text-sm text-muted-foreground">{product.vendor}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'الحالة',
      render: (product: Product) => <StatusBadge status={product.status} />,
    },
    {
      key: 'category',
      header: 'الفئة',
      render: (product: Product) => (
        <span className="text-sm">{product.category}</span>
      ),
      className: 'hidden md:table-cell',
    },
    {
      key: 'price',
      header: 'السعر',
      render: (product: Product) => (
        <span className="text-sm">
          {product.price.min === product.price.max
            ? formatCurrency(product.price.min)
            : `${formatCurrency(product.price.min)} - ${formatCurrency(product.price.max)}`}
        </span>
      ),
    },
    {
      key: 'stock',
      header: 'المخزون',
      render: (product: Product) => (
        <span className={`text-sm font-medium ${product.totalStock < 10 ? 'text-warning' : 'text-foreground'}`}>
          {product.totalStock}
        </span>
      ),
    },
    {
      key: 'updatedAt',
      header: 'آخر تحديث',
      render: (product: Product) => (
        <span className="text-sm text-muted-foreground">
          {formatDate(product.updatedAt)}
        </span>
      ),
      className: 'hidden lg:table-cell',
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="المنتجات"
        description={`${products.length} منتج في المتجر`}
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/dashboard' },
          { label: 'المنتجات' },
        ]}
        actions={
          <Button onClick={() => setDrawerOpen(true)}>
            <Plus className="w-4 h-4 ml-2" />
            إضافة منتج
          </Button>
        }
      />

      {/* Filters */}
      <div className="card-flat p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="البحث عن منتج..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-10"
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="active">نشط</SelectItem>
              <SelectItem value="draft">مسودة</SelectItem>
              <SelectItem value="archived">مؤرشف</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="الفئة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الفئات</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Table */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          icon={<Package className="w-8 h-8" />}
          title="لا توجد منتجات"
          description={search || statusFilter !== 'all' || categoryFilter !== 'all'
            ? 'لا توجد نتائج تطابق معايير البحث'
            : 'ابدأ بإضافة منتجك الأول'}
          action={
            search || statusFilter !== 'all' || categoryFilter !== 'all'
              ? undefined
              : {
                  label: 'إضافة منتج',
                  onClick: () => setDrawerOpen(true),
                }
          }
        />
      ) : (
        <DataTable
          data={filteredProducts}
          columns={columns}
          keyExtractor={(product) => product.id}
          onRowClick={(product) => navigate(`/products/${product.id}`)}
          actions={[
            { label: 'تعديل', onClick: (product) => navigate(`/products/${product.id}`) },
            { label: 'نسخ', onClick: (product) => console.log('Copy', product.id) },
            { label: 'أرشفة', onClick: (product) => console.log('Archive', product.id), variant: 'destructive' },
          ]}
        />
      )}

      {/* Product Drawer */}
      <ProductDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Products;
