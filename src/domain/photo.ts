export interface Photo {
  id?: string;
  src: string;
  thumbnail: string;
  uid: string;
  userDisplayName: string | null;
  userPhotoUrl: string | null;
  blob?: Blob;
  groundId: string;
  likes: Map<string, boolean>;
}
