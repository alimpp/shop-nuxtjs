import { BaseStore } from '../../core/BaseStore';
import { StoreManager } from '../../core/StoreManager';

import type { IChatList, ICurrentChat, IMessage } from '~/types/Support';

interface ISupportState {
  chatList: IChatList[];
  messages: IMessage[];
  currentChat: ICurrentChat;
  moduleState: string;
  unReadCount: number;
}

export class SupportStore extends BaseStore<ISupportState> {
  private static _instance: SupportStore;

  public static getInstance(): SupportStore {
    if (!SupportStore._instance) {
      SupportStore._instance = new SupportStore();
    }
    return SupportStore._instance;
  }

  private constructor() {
    super('support', {
      chatList: [],
      messages: [],
      currentChat: { chatId: '', name: '', sub: '' },
      moduleState: '',
      unReadCount: 0,
    });

    StoreManager.register(this);
  }

  get getModuleState(): string {
    return this._state.moduleState;
  }

  public setModuleState(moduleState: string) {
    this._state.moduleState = moduleState;
  }

  public setUnReadCount(val: number) {
    this._state.unReadCount = val;
  }

  public setChatList(chatList: IChatList[]) {
    this._state.chatList = chatList;
  }

  public get getChatList() {
    return this._state.chatList;
  }

  public setMessages(messages: IMessage[]) {
    this._state.messages = messages;
  }

  public addToMessages(messages: IMessage) {
    this._state.messages.push(messages);
  }

  public get getMessages() {
    return this._state.messages;
  }

  public resetMessages() {
    this._state.messages = [];
  }

  public setChatInfo(data: { chatId: string; name: string; sub: string }) {
    this._state.currentChat = data;
  }

  public get getChatInfo() {
    return this._state.currentChat;
  }

  public reset() {
    this._state.chatList = [];
    this._state.messages = [];
    this._state.currentChat = { chatId: '', name: '', sub: '' };
    this._state.moduleState = '';
  }
}
