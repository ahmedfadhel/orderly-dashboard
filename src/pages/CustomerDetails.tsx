import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  User, 
  Mail, 
  Phone,
  MapPin,
  ShoppingCart,
  DollarSign,
  Calendar,
  StickyNote,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { customers, orders, formatCurrency, formatDate } from '@/lib/mockData';

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const customer = customers.find(c => c.id === id);
  const customerOrders = orders.filter(o => o.customer.id === id);

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <User className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">العميل غير موجود</h2>
        <p className="text-muted-foreground mb-4">لم يتم العثور على العميل المطلوب</p>
        <Button onClick={() => navigate('/customers')}>
          <ArrowRight className="w-4 h-4 ml-2" />
          العودة للعملاء
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        title={customer.name}
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/dashboard' },
          { label: 'العملاء', href: '/customers' },
          { label: customer.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <div className="card-elevated p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-xl font-bold text-primary">
                  {customer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-heading font-bold mb-2">{customer.name}</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span dir="ltr">{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>عميل منذ {formatDate(customer.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="card-elevated overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-heading font-semibold">الطلبات</h3>
            </div>
            {customerOrders.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>لا توجد طلبات</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {customerOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/30 cursor-pointer transition-colors"
                    onClick={() => navigate(`/orders/${order.id}`)}
                  >
                    <div>
                      <p className="font-medium">{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(order.createdAt)} • {order.items.length} منتج
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={order.status} />
                      <span className="font-medium">{formatCurrency(order.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Addresses */}
          <div className="card-elevated p-6">
            <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              العناوين
            </h3>
            <div className="space-y-4">
              {customer.addresses.map((address) => (
                <div key={address.id} className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{address.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">{address.address}</p>
                      <p className="text-sm text-muted-foreground">
                        {address.city}، {address.country}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1" dir="ltr">
                        {address.phone}
                      </p>
                    </div>
                    {address.isDefault && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        افتراضي
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="card-elevated p-6">
            <h3 className="font-heading font-semibold mb-4">إحصائيات العميل</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي الإنفاق</p>
                  <p className="font-bold text-lg">{formatCurrency(customer.totalSpent)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-info" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">عدد الطلبات</p>
                  <p className="font-bold text-lg">{customer.totalOrders}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">آخر طلب</p>
                  <p className="font-bold">{formatDate(customer.lastOrderDate)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="card-elevated p-6">
            <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
              <StickyNote className="w-5 h-5" />
              ملاحظات
            </h3>
            <Textarea
              placeholder="أضف ملاحظة عن هذا العميل..."
              defaultValue={customer.notes}
              className="min-h-[120px] resize-none"
            />
            <Button className="w-full mt-3" variant="outline">
              حفظ الملاحظة
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
