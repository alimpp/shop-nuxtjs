import type { IChatList, IMessage } from '@/types/Support';
import { BaseApp } from '../core/BaseApp';

const { formatDateTime, parseDate } = useDate();

export class SupportDataModel extends BaseApp<any> {
  constructor() {
    super('support');
  }

  async chatListParsed(apiResponse: IChatList[]): Promise<IChatList[]> {
    if (!Array.isArray(apiResponse)) {
      throw new Error('Invalid list data format');
    }

    let list = [];

    for (let key of apiResponse) {
      const isoString = key.lastMessageTime;
      const date = parseDate(isoString);
      const dateFormt = formatDateTime(date);
      const obj = {
        ...key,
        lastMessageContent:
          key.lastMessageContent.length > 50
            ? `${key.lastMessageContent.slice(0, 50)}...`
            : key.lastMessageContent,
        lastMessageTime: dateFormt,
      };
      list.push(obj);
    }

    const sortedChats = [...list].sort((a, b) => {
      return new Date(b.update_at).getTime() - new Date(a.update_at).getTime();
    });

    this.saveAllItems(sortedChats);
    return sortedChats;
  }

  async chatParsed(apiResponse: IMessage[]): Promise<IMessage[]> {
    if (!Array.isArray(apiResponse)) {
      throw new Error('Invalid list data format');
    }

    let list = [];

    for (let key of apiResponse) {
      const isoString = key.created_at;
      const date = parseDate(isoString);
      const dateFormt = formatDateTime(date);
      let content;
      switch (key.type) {
        case 'txt':
          content = key.content.replace(/\n/g, '<br>');
          break;

        default:
          break;
      }
      const obj = {
        ...key,
        content,
        created_at: dateFormt,
      };
      list.push(obj);
    }

    return list;
  }

  async generateMessage(apiResponse: IMessage) {
    const isoString = apiResponse.created_at;
    const date = parseDate(isoString);
    const dateFormt = formatDateTime(date);
    const message = {
      ...apiResponse,
      created_at: dateFormt,
    };
    return message;
  }
}
