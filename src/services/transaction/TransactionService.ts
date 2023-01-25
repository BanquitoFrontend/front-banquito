import axios from "axios";
import { PUT_TRANSACTION, POST_TRANSACTION, GET_TRANSACTION_FROM_TO_API } from "src/config/apis/transactionAPI";
import { ResponseFormat } from "../ResponseFormat";
import { RQStatus } from "./dto/RQStatus";
import { RQTransaction } from "./dto/RQTransaction";
import { RSTransaction } from "./dto/RSTransaction";

export class TransactionService {
    public static async putTransaction(codeUniqueTransaction: string, body: RQStatus) {
        try {
            return await axios.put(PUT_TRANSACTION(codeUniqueTransaction), body);
        } catch (error) {
            throw error;
        }
    }

    public static async postTransaction(body: RQTransaction) {
        try {
            return await axios.post<ResponseFormat<RSTransaction>>(POST_TRANSACTION(), body);
        } catch (error) {
            throw error;
        }
    }

    public static async getTransaction(codeLocalAccount: string, from: Date, to: Date) {
        try {
            return await axios.get<ResponseFormat<RSTransaction[]>>(GET_TRANSACTION_FROM_TO_API(codeLocalAccount, from.toISOString(), to.toISOString()));
        } catch (error) {
            throw error;
        }
    }
}