import axios, { AxiosResponse } from "axios";
import { MessageData, MessageInfoDTO } from "./message.types";

const DEFAULT_SERVER_BASE_URL = "http://localhost:5000/api/v1/messages";

class MessagesApiService {
    private baseUrl: string =
        process.env.REACT_APP_SERVER_BASE_URL || DEFAULT_SERVER_BASE_URL;

    async sendMessage(messageData: MessageData): Promise<void> {
        try {
            await axios.post<MessageInfoDTO, AxiosResponse<MessageInfoDTO>, MessageData>(
                `${this.baseUrl}/send-message`, messageData
            );

        } catch (error) {
            throw error;
        }
    }
}

export default new MessagesApiService();
