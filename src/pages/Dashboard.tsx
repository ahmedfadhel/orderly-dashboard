import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DollarSign, 
  ShoppingCart, 
  TrendingUp, 
  Users,
  AlertTriangle,
  Package,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KPICard } from '@/components/ui/KPICard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  orders, 
  products, 
  analyticsData, 
  formatCurrency, 
  formatDate,
  type Order,
  type Product,
} from '@/lib/mockData';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [chartPeriod, setChartPeriod] = useState<'daily' | 'weekly'>('daily');

  // Calculate KPIs
  const totalSales = orders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalCustomers = new Set(orders.map(o => o.customer.id)).size;

  // Recent orders (last 5)
  const recentOrders = orders.slice(0, 5);

  // Low stock products (stock < 10)
  const lowStockProducts = products
    .flatMap(p => p.variants.map(v => ({ product: p, variant: v })))
    .filter(item => item.variant.stock < 10 && item.variant.stock > 0)
    .slice(0, 5);

  const orderColumns = [
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
      render: (order: Order) => order.customer.name,
    },
    {
      key: 'status',
      header: 'الحالة',
      render: (order: Order) => <StatusBadge status={order.status} />,
    },
    {
      key: 'total',
      header: 'الإجمالي',
      render: (order: Order) => formatCurrency(order.total),
    },
    {
      key: 'date',
      header: 'التاريخ',
      render: (order: Order) => formatDate(order.createdAt),
      className: 'hidden md:table-cell',
    },
  ];

  const chartData = chartPeriod === 'daily' 
    ? analyticsData.revenue.daily 
    : analyticsData.revenue.weekly;

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="لوحة التحكم"
        description="نظرة عامة على أداء المتجر"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <KPICard
          title="إجمالي المبيعات"
          value={formatCurrency(totalSales)}
          change={12.5}
          changeLabel="من الشهر الماضي"
          icon={<DollarSign className="w-5 h-5" />}
        />
        <KPICard
          title="الطلبات"
          value={totalOrders.toString()}
          change={8.2}
          changeLabel="من الأسبوع الماضي"
          icon={<ShoppingCart className="w-5 h-5" />}
        />
        <KPICard
          title="الإيرادات"
          value={formatCurrency(totalSales * 0.3)}
          change={-2.4}
          changeLabel="من الشهر الماضي"
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <KPICard
          title="العملاء"
          value={totalCustomers.toString()}
          change={15.3}
          changeLabel="من الشهر الماضي"
          icon={<Users className="w-5 h-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 card-elevated p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-lg font-heading font-semibold">المبيعات</h2>
            <Tabs value={chartPeriod} onValueChange={(v) => setChartPeriod(v as 'daily' | 'weekly')}>
              <TabsList className="grid w-full grid-cols-2 max-w-[200px]">
                <TabsTrigger value="daily">يومي</TabsTrigger>
                <TabsTrigger value="weekly">أسبوعي</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="date" 
                  className="text-xs fill-muted-foreground"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  className="text-xs fill-muted-foreground"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    direction: 'rtl',
                  }}
                  formatter={(value: number) => [formatCurrency(value), 'المبيعات']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="card-elevated p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <h2 className="text-lg font-heading font-semibold">تنبيه المخزون</h2>
          </div>
          
          <div className="space-y-3">
            {lowStockProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                جميع المنتجات متوفرة بكمية كافية
              </p>
            ) : (
              lowStockProducts.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.variant.id}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  onClick={() => navigate(`/products/${item.product.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                      <Package className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium line-clamp-1">
                        {item.product.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.variant.sku}
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-warning">
                      {item.variant.stock}
                    </p>
                    <p className="text-xs text-muted-foreground">متبقي</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {lowStockProducts.length > 0 && (
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => navigate('/products')}
            >
              عرض كل المنتجات
            </Button>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-6 lg:mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold">أحدث الطلبات</h2>
          <Button variant="ghost" onClick={() => navigate('/orders')}>
            عرض الكل
          </Button>
        </div>
        
        <DataTable
          data={recentOrders}
          columns={orderColumns}
          keyExtractor={(order) => order.id}
          onRowClick={(order) => navigate(`/orders/${order.id}`)}
          actions={[
            { label: 'عرض التفاصيل', onClick: (order) => navigate(`/orders/${order.id}`) },
          ]}
          pageSize={5}
        />
      </div>
    </div>
  );
};

export default Dashboard;
