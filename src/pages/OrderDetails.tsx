import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ShoppingCart, 
  User, 
  MapPin, 
  Phone,
  Mail,
  Check,
  Clock,
  Truck,
  Package,
  CreditCard,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { orders, formatCurrency, formatDate, formatDateTime } from '@/lib/mockData';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">الطلب غير موجود</h2>
        <p className="text-muted-foreground mb-4">لم يتم العثور على الطلب المطلوب</p>
        <Button onClick={() => navigate('/orders')}>
          <ArrowRight className="w-4 h-4 ml-2" />
          العودة للطلبات
        </Button>
      </div>
    );
  }

  // Timeline steps
  const timelineSteps = [
    { 
      label: 'تم الإنشاء', 
      date: order.createdAt, 
      completed: true,
      icon: Clock,
    },
    { 
      label: 'تم الدفع', 
      date: order.paidAt, 
      completed: !!order.paidAt,
      icon: CreditCard,
    },
    { 
      label: 'تم التجهيز', 
      date: order.fulfilledAt, 
      completed: !!order.fulfilledAt,
      icon: Package,
    },
    { 
      label: 'تم الشحن', 
      date: order.shippedAt, 
      completed: !!order.shippedAt,
      icon: Truck,
    },
    { 
      label: 'تم التسليم', 
      date: order.deliveredAt, 
      completed: !!order.deliveredAt,
      icon: Check,
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title={`الطلب ${order.orderNumber}`}
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/dashboard' },
          { label: 'الطلبات', href: '/orders' },
          { label: order.orderNumber },
        ]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline">طباعة الفاتورة</Button>
            {order.status === 'paid' && (
              <Button>تحديث الحالة</Button>
            )}
          </div>
        }
      />

      {/* Status & Timeline */}
      <div className="card-elevated p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <StatusBadge status={order.status} />
          <span className="text-muted-foreground">
            {formatDateTime(order.createdAt)}
          </span>
        </div>

        {/* Timeline */}
        <div className="flex items-center justify-between overflow-x-auto pb-2">
          {timelineSteps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === timelineSteps.length - 1;
            
            return (
              <div key={step.label} className="flex items-center flex-1 min-w-[120px]">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.completed 
                      ? 'bg-success text-success-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`mt-2 text-sm font-medium ${
                    step.completed ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </span>
                  {step.date && (
                    <span className="text-xs text-muted-foreground">
                      {formatDate(step.date)}
                    </span>
                  )}
                </div>
                {!isLast && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    step.completed && timelineSteps[index + 1].completed
                      ? 'bg-success'
                      : 'bg-muted'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-elevated overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-heading font-semibold">المنتجات</h3>
            </div>
            <div className="divide-y divide-border">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4">
                  <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.variantTitle}</p>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(item.price)} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Totals */}
            <div className="p-4 bg-muted/30 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">المجموع الفرعي</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">الشحن</span>
                <span>{order.shipping === 0 ? 'مجاني' : formatCurrency(order.shipping)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-success">
                  <span>الخصم</span>
                  <span>-{formatCurrency(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">الضريبة</span>
                <span>{formatCurrency(order.tax)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border font-bold text-lg">
                <span>الإجمالي</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer & Shipping */}
        <div className="space-y-6">
          {/* Customer */}
          <div className="card-elevated p-6">
            <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              العميل
            </h3>
            <div className="space-y-3">
              <p className="font-medium">{order.customer.name}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{order.customer.email}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => navigate(`/customers/${order.customer.id}`)}
              >
                عرض الملف الشخصي
              </Button>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="card-elevated p-6">
            <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              عنوان الشحن
            </h3>
            <div className="space-y-2 text-sm">
              <p className="font-medium">{order.shippingAddress.name}</p>
              <p className="text-muted-foreground">{order.shippingAddress.address}</p>
              <p className="text-muted-foreground">
                {order.shippingAddress.city}، {order.shippingAddress.country}
              </p>
              <div className="flex items-center gap-2 text-muted-foreground pt-2">
                <Phone className="w-4 h-4" />
                <span dir="ltr">{order.shippingAddress.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
