import { Photo } from "./photo";

export interface Ground {
  photos: Photo[] | null;
  title: string;
  uid: string;
  userDisplayName: string | null;
  userPhotoUrl: string | null;
  createdAt: number;
}
