import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Percent,
  BarChart3,
  Settings,
  Palette,
  ChevronRight,
  ChevronLeft,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems = [
  { path: '/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
  { path: '/products', label: 'المنتجات', icon: Package },
  { path: '/orders', label: 'الطلبات', icon: ShoppingCart },
  { path: '/customers', label: 'العملاء', icon: Users },
  { path: '/discounts', label: 'الخصومات', icon: Percent },
  { path: '/analytics', label: 'التحليلات', icon: BarChart3 },
  { path: '/settings', label: 'الإعدادات', icon: Settings },
  { path: '/design-tokens', label: 'التصميم', icon: Palette },
];

export const Sidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }: SidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 right-0 h-full bg-sidebar z-50 transition-all duration-300 flex flex-col border-l border-sidebar-border',
          'lg:relative lg:z-30',
          isCollapsed ? 'w-20' : 'w-64',
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border h-16">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
                <Package className="w-5 h-5 text-sidebar-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-lg text-sidebar-foreground">
                متجري
              </span>
            </div>
          )}
          
          {isCollapsed && (
            <div className="w-full flex justify-center">
              <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
                <Package className="w-5 h-5 text-sidebar-primary-foreground" />
              </div>
            </div>
          )}
          
          {/* Mobile Close */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Desktop Collapse Toggle */}
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={onToggleCollapse}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Collapsed expand button */}
        {isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex mx-auto mt-2 text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={onToggleCollapse}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-muted transition-all duration-200 min-h-[44px]',
                  'hover:bg-sidebar-accent hover:text-sidebar-foreground',
                  isActive && 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary',
                  isCollapsed && 'justify-center px-2'
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-sidebar-border">
            <p className="text-xs text-sidebar-muted text-center">
              الإصدار 1.0.0
            </p>
          </div>
        )}
      </aside>
    </>
  );
};
