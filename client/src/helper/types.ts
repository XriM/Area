export interface User {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  password: string;
}

export interface Area {
  name : string;
  actionName : string;
  actionConfig : any;
  reactionName : string;
  reactionConfig : any;
}