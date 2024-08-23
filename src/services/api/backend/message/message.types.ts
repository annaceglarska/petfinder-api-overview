export interface MessageData {
    email: string,
    name: string,
    phone: string,
    message: string,
    agreement: Boolean,
    organizationEmail: string | undefined,
    petId: number | undefined,
}

export interface MessageInfoDTO {
    message: string;
    data: any;
    error?: string;
}