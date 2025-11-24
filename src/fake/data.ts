import { ChatParticipant, ChatRoomData, Message } from "@/types/chat";


export const fakeParticipants: ChatParticipant[] = [
  {
    id: "u1",
    name: "Carlos Eduardo",
    color: "#1772B2",
    avatarUrl: "https://randomuser.me/api/portraits/men/12.jpg",
    online: true,
  },
  {
    id: "u2",
    name: "Mariana Silva",
    color: "#D93B6A",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    online: true,
  },
  {
    id: "u3",
    name: "João Pedro",
    color: "#F2A900",
    avatarUrl: "https://randomuser.me/api/portraits/men/73.jpg",
    online: false,
  },
];

export const fakeMessages: Message[] = [
  {
    id: "m1",
    sender: {
      id: "u1",
      name: "Carlos Eduardo",
      avatarUrl: "https://randomuser.me/api/portraits/men/12.jpg",
      color: "#1772B2",
    },
    content: "Fala pessoal! Como estão indo os testes do chat?",
    createdAt: Date.now() - 15000,
    updatedAt: Date.now() - 15000,
  },
  {
    id: "m2",
    sender: {
      id: "u2",
      name: "Mariana Silva",
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      color: "#D93B6A",
    },
    content: "Tudo fluindo bem! O layout está ficando muito bom ",
    createdAt: Date.now() - 12000,
    updatedAt: Date.now() - 12000,
  },
  {
    id: "m3",
    sender: {
      id: "u3",
      name: "João Pedro",
      avatarUrl: "https://randomuser.me/api/portraits/men/73.jpg",
      color: "#F2A900",
    },
    content: "Vou revisar o sistema de WebSockets hoje mais tarde.",
    createdAt: Date.now() - 8000,
    updatedAt: Date.now() - 8000,
  },
];

export const fakeRoom: ChatRoomData = {
  id: "room1",
  name: "Sala Principal",
  description: "Chat geral do projeto",
  creator: "Carlos Eduardo",
  participants: fakeParticipants,
  messages: fakeMessages,
  peopleCount: fakeParticipants.length,
};

export const fakeRooms: ChatRoomData[] = [
  fakeRoom,
  {
    id: "room2",
    name: "Dev Backend",
    description: "Discussões sobre Node, AdonisJS e API",
    creator: "Mariana Silva",
    participants: fakeParticipants.slice(0, 2),
    messages: [],
    peopleCount: 2,
  },
  {
    id: "room3",
    name: "Frontend UI/UX",
    description: "Layout, responsividade e experiência do usuário",
    creator: "João Pedro",
    participants: [fakeParticipants[2]],
    messages: [],
    peopleCount: 1,
  },
];
