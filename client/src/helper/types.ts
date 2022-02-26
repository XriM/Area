export interface User {
  email: string;
  password: string;
  username : string;
}

export interface UserResponse {
  id: string;
  email: string;
  password: string;
  username: string;
}

export interface Area {
  id: string;
  name : string;
  actionName : string;
  actionConfig : any;
  reactionName : string;
  reactionConfig : any;
}
