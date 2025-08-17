import { SupportDataModel } from "~/model/Support";
import { useSupportStore } from "~/stores";
import type { IChatList, IMessage } from "~/types/Support";

class SupportController extends SupportDataModel {
   private intervalId: NodeJS.Timeout | null = null;
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

   restartPolling(intervalTime: number = 30000) {
    this.stopPolling();
    this.startPolling(intervalTime);
   }

   async getChat(chatId: string) {
     await this.Get(`/api/support/${chatId}`)
     .then( async (res: any)=> {
       const parsedList = await this.chatParsed(res) 
       this.supportStore.setMessages(parsedList)
     })
   }

   async sendMsgAdmin(body: {chatId: string, content: string, type: string}) {
      await this.Post('/api/support/admin/send-message', body)
      .then( async (res: any)=> {
          const newMessage = await this.generateMessage(res)
          this.supportStore.addToMessages(newMessage)
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
}

export const supportController = new SupportController();

