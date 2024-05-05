export interface Client {
    _id: string;
    userId: string;
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
}