import { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { analyticsData, formatCurrency } from '@/lib/mockData';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

const Analytics = () => {
  const [dateRange, setDateRange] = useState('7days');
  const [chartType, setChartType] = useState<'revenue' | 'orders'>('revenue');

  const chartData = chartType === 'revenue' 
    ? analyticsData.revenue.daily 
    : analyticsData.orders.daily;

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="التحليلات"
        description="تحليل أداء المتجر"
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/dashboard' },
          { label: 'التحليلات' },
        ]}
        actions={
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">آخر 7 أيام</SelectItem>
              <SelectItem value="30days">آخر 30 يوم</SelectItem>
              <SelectItem value="90days">آخر 90 يوم</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue/Orders Chart */}
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading font-semibold">
              {chartType === 'revenue' ? 'الإيرادات' : 'الطلبات'}
            </h3>
            <Tabs value={chartType} onValueChange={(v) => setChartType(v as 'revenue' | 'orders')}>
              <TabsList>
                <TabsTrigger value="revenue">الإيرادات</TabsTrigger>
                <TabsTrigger value="orders">الطلبات</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAnalytics" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickFormatter={(value) => chartType === 'revenue' ? `${(value / 1000).toFixed(0)}k` : value}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    direction: 'rtl',
                  }}
                  formatter={(value: number) => [
                    chartType === 'revenue' ? formatCurrency(value) : value,
                    chartType === 'revenue' ? 'الإيرادات' : 'الطلبات'
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAnalytics)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="card-elevated p-6">
          <h3 className="font-heading font-semibold mb-6">أفضل المنتجات</h3>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={analyticsData.topProducts} 
                layout="vertical"
                margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  type="number"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  width={120}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    direction: 'rtl',
                  }}
                  formatter={(value: number) => [formatCurrency(value), 'الإيرادات']}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="hsl(var(--primary))" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="card-elevated p-6">
        <h3 className="font-heading font-semibold mb-6">مصادر الزيارات</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">المصدر</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">الزيارات</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">الطلبات</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">معدل التحويل</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.traffic.map((item, index) => (
                <tr key={item.channel} className="border-b border-border">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="font-medium">{item.channel}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    {item.visits.toLocaleString('ar-SA')}
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    {item.orders.toLocaleString('ar-SA')}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`font-medium ${item.conversion > 4 ? 'text-success' : ''}`}>
                      {item.conversion}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
