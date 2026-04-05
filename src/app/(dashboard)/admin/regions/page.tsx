'use client';
import { useState } from 'react';
import { MapPin, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { mockAllRegions, getRegionsByParent } from '@/mock/data/regions';

export default function AdminRegionsPage() {
  const [expanded, setExpanded] = useState<string[]>([]);
  const provinces = mockAllRegions.filter(r => r.level === 'province');

  const toggle = (id: string) => {
    setExpanded(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Wilayah</h1>
        <p className="text-sm text-muted mt-1">{provinces.length} provinsi terdaftar</p>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="divide-y divide-border">
          {provinces.map(prov => {
            const children = getRegionsByParent(prov.id);
            const isExpanded = expanded.includes(prov.id);
            return (
              <div key={prov.id}>
                <button
                  onClick={() => children.length > 0 && toggle(prov.id)}
                  className="flex items-center gap-3 w-full px-5 py-3 text-left hover:bg-surface/50 transition-colors"
                >
                  <ChevronRight className={`h-4 w-4 text-muted transition-transform ${isExpanded ? 'rotate-90' : ''} ${children.length === 0 ? 'invisible' : ''}`} />
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-foreground">{prov.name}</span>
                    <span className="text-xs text-muted ml-2">({prov.id})</span>
                  </div>
                  <Badge variant="neutral">{prov.level}</Badge>
                  {children.length > 0 && (
                    <span className="text-xs text-muted">{children.length} kab/kota</span>
                  )}
                </button>
                {isExpanded && children.length > 0 && (
                  <div className="bg-surface/30">
                    {children.map(child => (
                      <div key={child.id} className="flex items-center gap-3 px-5 py-2.5 pl-14 border-t border-border/50">
                        <MapPin className="h-3.5 w-3.5 text-muted shrink-0" />
                        <span className="text-xs font-semibold text-foreground">{child.name}</span>
                        <span className="text-[10px] text-muted">({child.id})</span>
                        <Badge variant="info">{child.level}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
