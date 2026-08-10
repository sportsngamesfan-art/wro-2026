interface BadgeProps {
  label: string
  variant?: 'primary' | 'secondary'
}

export function Badge({ label, variant = 'primary' }: BadgeProps) {
  const variants = {
    primary: 'bg-gradient-saffron text-white',
    secondary: 'bg-navy-900 text-white',
  }

  return (
    <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${variants[variant]}`}>
      {label}
    </div>
  )
}
