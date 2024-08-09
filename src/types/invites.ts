import { User } from "./user";

export interface Invite {
  id: string;
  createdAt: Date;
  invitationAccepted: boolean;
  organizationId: string;
  recipientId: string;
  senderId: string;
  organization: {
    id: string;
    createdAt: Date;
    name: string;
    slug: string | null;
    ownerId: string;
  };
  recipient: User;
  sender: User;
}
