import { useState } from 'react';
import { cn } from '@/lib/utils';
import { MoreHorizontal, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface Action<T> {
  label: string;
  onClick: (item: T) => void;
  variant?: 'default' | 'destructive';
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  pageSize?: number;
  className?: string;
  emptyMessage?: string;
}

export function DataTable<T>({
  data,
  columns,
  actions,
  keyExtractor,
  onRowClick,
  pageSize = 10,
  className,
  emptyMessage = 'لا توجد بيانات',
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  return (
    <div className={cn('card-flat overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-4 py-3 text-right text-sm font-medium text-muted-foreground',
                    column.className
                  )}
                >
                  {column.header}
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground w-12">
                  <span className="sr-only">الإجراءات</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-4 py-12 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr
                  key={keyExtractor(item)}
                  className={cn(
                    'border-b border-border table-row-interactive',
                    onRowClick && 'cursor-pointer'
                  )}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn('px-4 py-4 text-sm', column.className)}
                    >
                      {column.render
                        ? column.render(item)
                        : (item as Record<string, unknown>)[column.key]?.toString()}
                    </td>
                  ))}
                  {actions && actions.length > 0 && (
                    <td className="px-4 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          {actions.map((action, index) => (
                            <DropdownMenuItem
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                action.onClick(item);
                              }}
                              className={cn(
                                action.variant === 'destructive' && 'text-destructive'
                              )}
                            >
                              {action.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-sm text-muted-foreground">
            عرض {startIndex + 1} - {Math.min(startIndex + pageSize, data.length)} من {data.length}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground px-2">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
