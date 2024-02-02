/* eslint-disable max-lines */
/* eslint-disable camelcase */

export type colors = "white" | 
"gray-40" | "transparent" | "gray-20" | "gray-10" | 
"blue-40" | "blue-30" | "blue-20" | 
"green-40" | "green-30" | "green-20" | "green-10" | 
"indigo-40" | "indigo-20" | "indigo-10" | 
"red-40" | "red-30" | "red-20" | 
"yellow-40" | "yellow-20";
export interface UserData {
  content: {
    data: GetQuestionResponse,
    created: string,
    content: string
  }[],
  avatar: string,
  nick: string,
  lastPage?: boolean
}

export interface ReportData {
  success: boolean;
  validates: boolean;
  message: string;
  protocol: string;
  impl: string;
  schema: string;
  data: {
    data?:{
      type: string;
    }
    visible: boolean;
    text: string;
    id: number;
    subcategories?: {
      id: number;
      text: string;
      data?: {
        type: string
      }
    }[]
  }[]
}
export interface QuestionLogEntry {
    class: 
      | "accepted"
      | "added"
      | "best"
      | "deleted"
      | "edited"
      | "info"
      | "reported";
    date: string;
    descriptions?: {
      subject: string;
      text: string;
    }[];
    owner_id: number;
    text: string;
    time: string;
    type: number;
    user_id: number;
    warn: boolean;
}
  
interface Attachment {
    extension: string;
    full: string;
    hash: string;
    id: number;
    size: number;
    thumbnail: string;
    type: string;
}
export interface ReferenceData {
  data: {
    config: {
      timezone: string
    }
    grades:{
      id: number;
      icon: string;
      name: string;
      slug: string;
      filter_name: string
    }[];
    rankings:{
      id: number;
      name: string
    }[];
    ranks:{
      color: string;
      description: string;
      name: string;
      promoted_text: string;
      type: number;
      the_best_resps: number;
      points: number;
      id: number
    }[];
    subjects:{
      best_in_name: string;
      enabled: boolean;
      filter_name: string;
      name: string;
      icon: string;
      slug: string;
      id: number;
      occupants: number;
      rankable: string
    }[]
  }
}
export interface ContentList {
  data: {
    task?: Task[];
    responses?: {
      items: ContentListAns[],
      last_id: number
    }
  };
  users_data: User[]
}
export interface ContentListAns {
  content: string,
  created: string,
  id: number,
  is_the_best: boolean,
  points: number,
  points_for_best: number,
  task_id: number,
  thanks: number,
  user_id: number,
  vote: number,
  wrong: number
}
export interface Notifications {
  data:{
    items: Notification[]
  },
  users_data: User[]
}
export interface Notification {
  button?: string,
  content: string,
  created: string,
  event: number,
  id: number,
  model_id: number,
  model_type_id: number,
  notification_type: number,
  response_id?: number,
  text: string,
  type: string,
  user_id: number
}
export interface UserInfo {
  data:{
    auth:{
      comet:{
        auth_hash: string;
        avatar_url: string;
        hash: string
      }
    };
    ban:{
      active: boolean;
      expires: string | null;
    };
    comments: number;
    current_best_answers: number;
    preferences:{
      stream:{
        grade_ids: number[];
        subject_ids: number[]
      }
    };
    priviledges: number[];
    responses: number;
    tasks: number;
    user: {
      activated: string;
      avatar: Avatar;
      avatars: Avatar;
      category: number,
      client_type: number,
      entry: number,
      gender: number,
      grade_id: number,
      id: number,
      is_deleted: boolean,
      nick: string,
      points: number,
      ranks: {
        color: string,
        count: number,
        names: string[]
      },
      ranks_ids: number[],
      registration_datetime: string,
      username: string //email
    };
  }
}
// interface Rank {
//   best_responses: number;
//   color: string;
//   description: string;
//   id: number;
//   name: string;
//   points: number;
//   type: number
// }
interface CommentsData {
  items: {
    can_mark_abuse: boolean;
    content: string;
    created: string;
    deleted: boolean;
    id: number;
    is_marked_abuse: number;
    user_id: number;
  }[];
  count: number;
  last_id: number;
}

interface Avatar {
  "64": string;
  "100": string;
  avatar_id?: number;
}

export interface Task {
  attachments: Attachment[];
  client_type: string;
  content: string;
  created: string;
  first_resp?: string;
  grade_id: number;
  id: number;
  points: {
    ptsForTask: number;
    ptsForResp: number;
    ptsForBest: number;
  };
  responses: number;
  source: string;
  tickets: number;
  report?:{
    created:string,
    abuse:{
      category_id: number,
      subcategory_id: number,
      name: string,
      data: string
    },
    user:User
  },
  user_category: number;
  user_id: number;
  the_best_resp_id?: number;
  subject_id: number;
  settings: {
    [x in keyof {
      "can_comment";
      "can_edit";
      "can_follow";
      "can_mark_abuse";
      "can_moderate";
      "can_unfollow";
      "is_answer_button";
      "is_closed";
      "is_confirmed";
      "is_deleted";
      "is_following";
      "is_marked_abuse"
    }]: boolean;
  };
  comments: CommentsData;
}
interface Points{
  ptsForBest: number;
  ptsForTask: number;
  ptsForResp: number
}
export interface Response {
  approved: {
    date?: string; 
    approver?: {
      id: number;
      nickname: string;
      points: number;
      grade: number;
      gender: number;
      avatars: Avatar;
      content_approved_count: number;
    };
  };
  attachments: Attachment[];
  best: boolean;
  report?:{
    created:string,
    abuse:{
      category_id: number,
      subcategory_id: number,
      name: string,
      data: string
    }
  },
  client_type: string;
  comments: CommentsData;
  content: string;
  created: string;
  id: number;
  mark: number;
  marks_count: number;
  points: number;
  settings: {
    [x in keyof {
      "can_comment";
      "can_edit";
      "can_mark_abuse";
      "can_mark_as_best";
      "can_moderate";
      "is_confirmed";
      "is_deleted";
      "is_excellent";
      "is_marked_abuse";
      "is_to_correct"
    }]: boolean;
  };
  source: string;
  task_id: number;
  thanks: number;
  user_best_rank_id?: number;
  user_id: number;
}
interface PrevSettings{
  can_comment: boolean
  can_edit: boolean
  can_follow?: boolean
  can_mark_abuse: boolean
  can_moderate: boolean
  can_unfollow?: boolean
  is_answer_button?: boolean
  is_closed?: boolean
  is_confirmed: boolean
  is_deleted: boolean
  is_following?: boolean
  is_marked_abuse: boolean;
  can_mark_as_best?: boolean;
  is_excellent?: boolean;
  is_to_correct?: boolean
}
export interface PreviewData {
  data: {
    task:{
      attachments: Attachment[];
      client_type: string;
      content: string;
      created: string;
      first_resp: string;
      grade_id: number;
      id: number;
      responses: number;
      source: string;
      subject_id: number;
      the_best_resp_id?: number;
      tickets: number;
      user_category: number;
      user_id: number;
      comments: CommentsData;
      points: Points;
      settings: PrevSettings
    };
    responses:{
      attachments: Attachment[];
      client_type: string;
      content: string;
      created: string;
      best: boolean;
      source: string;
      id: number;
      mark: number;
      mark_precise: number;
      marks_count: number;
      points: number;
      settings: PrevSettings;
      user_best_rank_id: number;
      thanks: number;
      task_id: number;
      user_id: number
    }[]
  };
  users_data:{
    avatar: {
      64: string;
      100: string
    };
    avatars: {
      64: string;
      100: string
    };
    gender: number;
    id: number;
    is_deleted: boolean;
    nick: string;
    ranks: {
      color: string;
      count: number;
      names: string[]
    };
    rank_ids: number[];
    stats: {
      questions: number;
      answers: number;
      comments: number
    }
  }[]
}
export interface QuestionData {
  task: Task;
  responses: Response[];
}

export interface User {
  id: number;
  nick: string;
  gender: 1 | 2;
  is_deleted: boolean;
  avatar: string;
  stats: {
    questions: number;
    answers: number;
    comments: number;
  };
  avatars: {
    [x in keyof {64; 100}]?: string;
  };
  ranks: {
    color: string;
    names: string[];
    count: number;
  };
  ranks_ids: number[];
}
export type CommonResponse<T = void> = {
    success: boolean;
    users_data?: User[];
    data: T;
    impl?: string;
    protocol?: "28";
    schema?: string;
    message?: string;
  };
  
export type GetConversationResponse = CommonResponse<{
    conversation_id: number;
  }>
  
export type GetMessagesResponse = CommonResponse<{
    last_id: number;
    conversation: {
      id: number;
      user_id: number;
      created: string;
      recipient_id: number;
      allow_link_from: unknown[];
    };
    messages: {
      id: number;
      conversation_id: number;
      user_id: number;
      created: string;
      content: string;
      is_harmful: boolean;
      new: boolean;
    }[];
  }>;
export type GetQuestionResponse = CommonResponse<{
    task: Task;
    responses: Response[];
    users_data: User[];
  }>
  