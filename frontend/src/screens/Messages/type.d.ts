type Message = {
  id: string;
  avatar: ImageSourcePropType;
  unreadHighlight: boolean;
  content: string;
  recipient_id: string;
  author_id: string;
  thread_id: string;
  seen: boolean;
  visible: boolean;
  sent_at: string;
  created_at: string;
  metadata: object;
};

type MessageParams = {
  content: string;
  recipient_id: string;
  thread_id?: string;
  metadata?: object;
};

type Participant = {
  id: string;
  first_name: string;
  last_name: string;
  asset_url: string;
};

type Thread = {
  id: string;
  messages: Message[];
  thread_participants: ThreadParticipant[];
  last_message: Message;
  unseen_msg_count: number;
};

type ThreadParticipant = {
  thread_id: string;
  participant_id: string;
  participant: Participant;
  online: boolean;
};
