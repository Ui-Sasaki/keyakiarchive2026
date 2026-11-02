import { findTicketById } from "@/repositories/user/ticket";
import QRCodePresenter from "./QRCode";
import { Ticket, User } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function QRCode(props: {
  params: Promise<{ id: string; salt: string }>;
}) {
  const params = await props.params;
  const ticket = (await findTicketById(params.id, {
    include: { user: true },
  })) as Ticket & { user: User };
  if (!ticket)
    return <div className="p-4">チケットが見つかりませんでした。(I)</div>;
  if (ticket.salt !== params.salt)
    return <div className="p-4">チケットが見つかりませんでした。(S)</div>;
  return (
    <QRCodePresenter
      value={`${ticket.user.grade!}_${ticket.user.class}_${ticket.user.studentNumber}_${ticket.id}_${ticket.salt}`}
      message={ticket.customerMessage ?? ""}
      name={ticket.customerName}
    />
  );
}
