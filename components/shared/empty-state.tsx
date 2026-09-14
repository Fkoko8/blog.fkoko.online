import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function EmptyState({ title, description, icon, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border p-8 text-center',
        className
      )}
    >
      {icon && <div className="text-muted-foreground/40">{icon}</div>}
      <h3 className="font-heading text-lg font-semibold text-muted-foreground">{title}</h3>
      {description && <p className="max-w-sm text-sm text-muted-foreground/60">{description}</p>}
    </div>
  );
}
