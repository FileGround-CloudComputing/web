export interface Photo {
  src: string;
  thumbnail: string;
  uid: string;
  userDisplayName: string | null;
  userPhotoUrl: string | null;
  blob?: Blob;
}
