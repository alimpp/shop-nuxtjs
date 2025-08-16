export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  avatarUrl: string;
  phone: string;
  created_at: string;
}

export interface IChatList {
  id: string;
  created_at: string;
  update_at: string;
  chatId: string;
  badge: number;
  lastMessageContent: string;
  lastMessageTime: string;
  user: IUser;
}

export interface IMessage {
  id: string;
  created_at: string;
  chatId: string;
  type: MessageType;
  seen: boolean;
  content: string;
  from: string;
  itsMe: boolean
}

export interface ICurrentChat {
  chatId: string,
  name: string,
  sub: string
}

type MessageType = "txt" | "img" | "file" | "audio"; // extend with other possible types