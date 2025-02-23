import { X } from "lucide-react"
import { Button } from "@repo/ui/components/ui/button"

interface NotificationItem {
  id: string
  name: string
  message: string
}

interface NotificationsListProps {
  notifications: NotificationItem[]
  onAccept: (id: string) => void
  onDismiss: (id: string) => void
}

export function NotificationsList({ notifications, onAccept, onDismiss }: NotificationsListProps) {
  return (
    <div className="flex flex-col gap-4">
      {notifications.map((notification) => (
        <div key={notification.id} className="flex items-center justify-between gap-4 py-2">
          <div className="flex flex-col gap-1">
            <button 
              onClick={() => console.log(`Navigate to profile ${notification.id}`)}
              className="font-medium text-left hover:underline cursor-pointer"
            >
              {notification.name}
            </button>
            <span className="text-sm text-muted-foreground">{notification.message}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => onAccept(notification.id)}
            >
              Accept
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => onDismiss(notification.id)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

