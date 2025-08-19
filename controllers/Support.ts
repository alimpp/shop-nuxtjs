import { SupportDataModel } from "~/model/Support";
import { useSupportStore } from "~/stores";
import type { IChatList, IMessage } from "~/types/Support";

class SupportController extends SupportDataModel {
   private intervalId: NodeJS.Timeout | null = null;
   private chatIntervalIds: Map<string, NodeJS.Timeout> = new Map();
   private isPolling: boolean = false;
   
   constructor() {
    super()
   }

   private supportStore = useSupportStore()

   async getChatList() {
    await this.Get('/api/support/chat-list')
    .then(async (res: any) => {
        const parsedList = await this.chatListParsed(res)
        this.supportStore.setChatList(parsedList)
    })
    .catch(error => {
        console.error('Error fetching chat list:', error);
        this.stopPolling();
    });
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

   // Start polling for a specific chat
   startChatPolling(chatId: string, intervalTime: number = 10000) {
    this.stopChatPolling(chatId); // Stop any existing polling for this chat
    
    // Initial fetch
    this.getChat(chatId);
    
    // Set up interval for polling
    const intervalId = setInterval(async () => {
      await this.getChat(chatId);
    }, intervalTime);
    
    this.chatIntervalIds.set(chatId, intervalId);
   }

   // Stop polling for a specific chat
   stopChatPolling(chatId: string) {
    const intervalId = this.chatIntervalIds.get(chatId);
    if (intervalId) {
      clearInterval(intervalId);
      this.chatIntervalIds.delete(chatId);
    }
   }

   // Stop all chat polling
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
     await this.Get(`/api/support/${chatId}`)
     .then( async (res: any)=> {
       const parsedList = await this.chatParsed(res) 
       this.supportStore.setMessages(parsedList)
       const targetChat = this.supportStore.getChatList.find((chat: IChatList) => {
        return chat.chatId == chatId
       })
       if(targetChat) {
          if(targetChat.badge != 0) {
            targetChat.badge = 0
          }
       }
     })
     .catch(error => {
        console.error(`Error fetching chat ${chatId}:`, error);
        this.stopChatPolling(chatId); // Stop polling on error
     });
   }

   async sendMsgAdmin(body: {chatId: string, content: string, type: string}) {
      await this.Post('/api/support/admin/send-message', body)
      .then( async (res: any)=> {
          const newMessage = await this.generateMessage(res)
          this.supportStore.addToMessages(newMessage)
          await this.getChatList()
      }).catch((err)=>{err})
   }

   async sendMsgUser(body: {chatId: string, content: string, type: string}) {    
      await this.Post('/api/support/send-message', body)
      .then( async (res: any)=> {
          const newMessage = await this.generateMessage(res)
          this.supportStore.addToMessages(newMessage)
      }).catch((err)=>{err})
   }

   async seen(body: {id: string, chatId: string}) {
    await this.Patch(`/api/support/${body.id}`, {seen: true, chatId: body.chatId})
   }

   // Clean up all intervals when the controller is no longer needed
   destroy() {
    this.stopPolling();
    this.stopAllChatPolling();
   }
}

export const supportController = new SupportController();