export enum GuestType {
  COMMON = 'COMMON',
  SPECIAL = 'SPECIAL',
  STORY = 'STORY',
}

export interface Guest {
  id: string;
  name: string;
  type: GuestType;
  avatar: string;
  personality: string;
  favoriteTag?: string;
  story?: string;
}

export interface GuestVisit {
  guest: Guest;
  order?: string;
  satisfaction: number;
  dialogue: string[];
}
