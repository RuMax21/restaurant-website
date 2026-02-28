import type { MapTooltipProps } from '../model';

export function MapTooltip({ title, description }: MapTooltipProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
