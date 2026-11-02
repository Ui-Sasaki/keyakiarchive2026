import { Notification } from "@prisma/client";

export const formatTitle = (notification: Notification) => {
  switch (notification.type) {
    case "enter":
      return (
        <>
          <span className="font-bold">{notification.details1}</span>
          さんが入場しました。
        </>
      );
    case "hiroo-payment":
      return (
        <>
          <span className="font-bold">{notification.details1}</span>
        </>
      );
    default:
      return "";
  }
};
