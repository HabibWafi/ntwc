import { Construction } from 'lucide-react';
import { Badge } from './Badge';

interface ComingSoonProps {
  title: string;
  description: string;
  phase?: string;
}

export function ComingSoon({ title, description, phase = 'Phase 2' }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary-light/10 mb-4">
        <Construction className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-2xl font-extrabold text-foreground mb-2">{title}</h1>
      <p className="text-sm text-muted max-w-md mb-4">{description}</p>
      <Badge variant="purple">{phase}</Badge>
    </div>
  );
}
