export interface CollaboratorCategory {
  name: string;
  shops: CollaboratorShop[];
}

export interface CollaboratorShop {
  name: string;
  location: string;
  thumbnailUrl: string;
  url?: string;
}
