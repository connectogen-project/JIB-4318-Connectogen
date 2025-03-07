import { InboxIcon, X } from "lucide-react"
import { Button } from "@repo/ui/components/ui/button"
import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/ui/sheet";

export interface NotificationItem {
  id: string
  name: string
  message: string
}

// interface NotificationsListProps {
//   onAccept: (id: string) => void
//   onDismiss: (id: string) => void
// }

const Notification = z.object({
  // need to add username? inconsistecies in db
  notifID: z.string(),
  notifType: z.string(),
  message: z.string(),
  userEmail: z.string(),
  time: z.string(),
  read: z.boolean(),
});
const NotificationsResponse = z.array(Notification)


async function fetchNotifs() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:2999';

  try {
    const res = await fetch(`${API_BASE_URL}/api/notifications/getNotif/?userEmail=test@gatech.edu`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      throw new Error("Failed to get notifications");
    }
    return NotificationsResponse.parse(await res.json());
  } catch (error) {
    console.error("Error during fetch of notifications:", error);
    return []
  }
}

// const handleAcceptRequest = (id: string) => {
//   // Add your accept request logic here
//   setNotifications((prev) =>
//     prev.filter((notification) => notification !== id)
//   );
// };

// const handleDismissRequest = (id: string) => {
//   setNotifications((prev) =>
//     prev.filter((notification) => notification !== id)
//   );
// };

export async function NotificationsList() {
  const notifications = await fetchNotifs()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="relative rounded-full bg-black p-2"
        >
          <InboxIcon className="h-5 w-5 text-white" />
          {notifications.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {notifications.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader className="pb-6">
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          {notifications.map((notification) => (
            <div key={notification.notifID} className="flex items-center justify-between gap-4 py-2">
              <div className="flex flex-col gap-1">
                {/* <span className="font-medium">{notification.username}</span> */}
                <Button
                  className="font-medium text-left hover:underline cursor-pointer"
                >
                  {notification.userEmail}
                </Button>

                <span className="text-sm text-muted-foreground">{notification.message}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/80"
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  className="bg-secondary text-black hover:bg-gray-200"
                >
                  Decline
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

