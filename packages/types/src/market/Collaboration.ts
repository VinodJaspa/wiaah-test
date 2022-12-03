export interface CollaboratorCategory {
  name: string;
  shops: CollaboratorShop[];
}

export interface CollaboratorShop {
  id: string;
  name: string;
  location: string;
  thumbnailUrl: string;
  url?: string;
}
