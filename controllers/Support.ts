import { SupportDataModel } from '~/model/Support';
import { useSupportStore } from '~/stores';
import type { IChatList } from '~/types/Support';

const { success, error } = useToast();

class SupportController extends SupportDataModel {
  private intervalId: NodeJS.Timeout | null = null;
  private chatIntervalIds: Map<string, NodeJS.Timeout> = new Map();
  private isPolling: boolean = false;

  constructor() {
    super();
  }

  private supportStore = useSupportStore();

  async getChatList() {
    try {
      const serverResponse = await this.Get('/api/support/chat-list');
      const parseResult = await this.chatListParsed(serverResponse);
      this.supportStore.setChatList(parseResult);
    } catch (err) {
      error('Chat list fetching field');
      console.error(error);
      this.stopPolling();
    }
  }

  startPolling(intervalTime: number = 30000) {
    if (this.isPolling) return;

    this.isPolling = true;
    this.getChatList();
    this.intervalId = setInterval(async () => {
      await this.getChatList();
    }, intervalTime);
  }

  stopPolling() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isPolling = false;
    }
  }

  startChatPolling(chatId: string, intervalTime: number = 10000) {
    this.stopChatPolling(chatId);

    this.getChat(chatId);

    const intervalId = setInterval(async () => {
      await this.getChat(chatId);
    }, intervalTime);

    this.chatIntervalIds.set(chatId, intervalId);
  }

  stopChatPolling(chatId: string) {
    const intervalId = this.chatIntervalIds.get(chatId);
    if (intervalId) {
      clearInterval(intervalId);
      this.chatIntervalIds.delete(chatId);
    }
  }

  stopAllChatPolling() {
    this.chatIntervalIds.forEach((intervalId, chatId) => {
      clearInterval(intervalId);
    });
    this.chatIntervalIds.clear();
  }

  restartPolling(intervalTime: number = 30000) {
    this.stopPolling();
    this.startPolling(intervalTime);
  }

  async getChat(chatId: string) {
    try {
      const serverResponse = await this.Get(`/api/support/${chatId}`);
      const parseList = await this.chatParsed(serverResponse);
      this.supportStore.setMessages(parseList);
      const targetChat = this.supportStore.getChatList.find(
        (chat: IChatList) => {
          return chat.chatId == chatId;
        }
      );
      if (targetChat) {
        if (targetChat.badge != 0) {
          targetChat.badge = 0;
        }
      }
    } catch (err) {
      error('Fetching chat item field');
      console.error(error);
      this.stopChatPolling(chatId);
    }
  }

  async sendMsgAdmin(body: { chatId: string; content: string; type: string }) {
    try {
      const serverResponse = await this.Post(
        '/api/support/admin/send-message',
        body
      );
      const newMessage = await this.generateMessage(serverResponse);
      this.supportStore.addToMessages(newMessage);
      await this.getChatList();
    } catch (err) {
      const textError = 'Send message field';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  async sendMsgUser(body: { chatId: string; content: string; type: string }) {
    try {
      const serverResponse = await this.Post('/api/support/send-message', body);
      const newMessage = await this.generateMessage(serverResponse);
      this.supportStore.addToMessages(newMessage);
    } catch (err) {
      const textError = 'Send message field';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  async seen(body: { id: string; chatId: string }) {
    try {
      await this.Patch(`/api/support/${body.id}`, {
        seen: true,
        chatId: body.chatId,
      });
    } catch (err) {
      const textError = 'Seen message field';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  destroy() {
    this.stopPolling();
    this.stopAllChatPolling();
  }
}

export const supportController = new SupportController();
