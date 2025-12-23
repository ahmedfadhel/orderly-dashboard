import { cn } from '@/lib/utils';

type ProductStatus = 'draft' | 'active' | 'archived';
type OrderStatus = 'pending' | 'paid' | 'fulfilled' | 'refunded' | 'cancelled';
type DiscountStatus = 'active' | 'scheduled' | 'expired';

interface StatusBadgeProps {
  status: ProductStatus | OrderStatus | DiscountStatus;
  className?: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  // Product statuses
  draft: { label: 'مسودة', className: 'bg-muted text-muted-foreground' },
  active: { label: 'نشط', className: 'bg-success/10 text-success' },
  archived: { label: 'مؤرشف', className: 'bg-secondary text-secondary-foreground' },
  
  // Order statuses
  pending: { label: 'معلق', className: 'bg-warning/10 text-warning' },
  paid: { label: 'مدفوع', className: 'bg-info/10 text-info' },
  fulfilled: { label: 'مكتمل', className: 'bg-success/10 text-success' },
  refunded: { label: 'مسترد', className: 'bg-destructive/10 text-destructive' },
  cancelled: { label: 'ملغي', className: 'bg-muted text-muted-foreground' },
  
  // Discount statuses
  scheduled: { label: 'مجدول', className: 'bg-info/10 text-info' },
  expired: { label: 'منتهي', className: 'bg-muted text-muted-foreground' },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status] || { label: status, className: 'bg-muted text-muted-foreground' };
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};
