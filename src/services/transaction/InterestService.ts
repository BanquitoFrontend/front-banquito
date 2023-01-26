import axios from "axios";
import { POST_INTEREST_API, GET_INTEREST_FROM_TO_API, GET_INTEREST_INVESTMENT_API } from "/src/config/apis/transactionAPI";
import { ResponseFormat } from "../ResponseFormat";
import { RQSavingsAccountInterest } from "./dto/RQSavingsAccountInterest";
import { RSInvestmentInterest } from "./dto/RSInvestmentInterest";
import { RSSavingsAccountInterest } from "./dto/RSSavingsAccountInterest";

export class InterestService {

    public static async postInterest(body: RQSavingsAccountInterest) {
        try {
            return await axios.post<ResponseFormat<RSSavingsAccountInterest>>(POST_INTEREST_API(), body);
        } catch (error) {
            throw error;
        }
    }

    public static async getInterest(codeLocalAccount: string, from: Date, to: Date) {
        try {
            return await axios.get<ResponseFormat<RSSavingsAccountInterest[]>>(GET_INTEREST_FROM_TO_API(codeLocalAccount, from.toISOString(), to.toISOString()));
        } catch (error) {
            throw error;
        }
    }

    public static async getInterestInvestment(codeLocalAccount: string, days: number, capital: number, ear: number) {
        try {
            return await axios.get<ResponseFormat<RSInvestmentInterest>>(GET_INTEREST_INVESTMENT_API(codeLocalAccount, days, capital, ear));
        } catch (error) {
            throw error;
        }
    }
}