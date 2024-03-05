export interface IUser {
    firstName:string,
    lastName:string,
    email: string;
    password: string; 
    passwordChangedAt?: {
       getTime(): unknown;
       type: Date,
     },
     branch?: string;
    role: 'seller' | 'branchManager'|'superAdmin'; 
  }
