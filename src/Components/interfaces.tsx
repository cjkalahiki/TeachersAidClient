export interface ICampaign {
    title: string;
    amount: number;
    description: string;
    endDate: string;
    id: number;
}

export interface ITransaction {
    amount: number;
    id: number;
    campaignId: number;
}

export interface ICampaignTransaction {
    title: string;
    amount: number;
    description: string;
    endDate: string;
    id: number;
    user: IUser;
}

interface IUser {
    username: string
}