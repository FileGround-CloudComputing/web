import { Photo } from "./photo";

export interface Ground {
  photos: Photo[] | null;
  title: string;
  uid: string;
  userDisplayName: string | null;
  userPhotoUrl: string | null;
  id: number;
  createdAt: number;
  password?: string;
}
