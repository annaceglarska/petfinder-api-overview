export interface MessageData {
    email: string,
    name: string,
    phone: string,
    message: string,
    agreement: Boolean,
    organizationEmail: string | undefined,
    petId?: number,
}

export interface MessageInfoDTO {
    message: string;
    data: any;
    error?: string;
}