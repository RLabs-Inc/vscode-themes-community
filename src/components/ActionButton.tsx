import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

interface ActionButtonProps {
  label: string
  onClick: () => void
  pending?: boolean
  disabled?: boolean
  variant?:
    | 'ghost'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'link'
    | null
    | undefined
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  variant,
  pending,
  disabled,
}) => {
  return (
    <Button variant={variant} onClick={onClick} disabled={pending || disabled}>
      {pending ? <Loader2 className="animate-spin" /> : label}
    </Button>
  )
}
