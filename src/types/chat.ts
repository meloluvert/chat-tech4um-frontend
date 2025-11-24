export type ChatParticipant = {
    id: string;
    name: string;
    color: string; 
    avatarUrl?: string;
    online: boolean;
  };
  
  export type Message = {
    id: string;
    sender: {
      id: string;
      name: string;
      avatarUrl: string;
      color: string
    };
    content: string;
    createdAt: number;
    updatedAt: number;
  };
  
  
  export type ChatRoomData = {
    id: string;
    name: string;
    description?: string;
    creator: string;
    participants: ChatParticipant[];
    messages: Message[];
    peopleCount: number;
  };
  