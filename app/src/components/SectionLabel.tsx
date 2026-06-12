interface SectionLabelProps {
  text: string;
  color?: 'orange' | 'yellow';
}

export function SectionLabel({ text, color = 'orange' }: SectionLabelProps) {
  const colorClass = color === 'orange' ? 'text-fuego' : 'text-chispa';
  
  return (
    <span className={`inline-block font-inter font-semibold text-xs uppercase tracking-[0.2em] ${colorClass} mb-4`}>
      {text}
    </span>
  );
}
