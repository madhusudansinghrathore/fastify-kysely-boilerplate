import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { FundraiseStage, DebtUrgency, DealHistoryOutcome, FundingStatus } from "./enums";

export type Actions = {
    id: string;
    alteriaEmployeeId: string;
    insightId: string;
    description: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    deletedAt: Timestamp | null;
};
export type AlteriaEmployee = {
    id: string;
    mobile: string;
    name: string | null;
    email: string | null;
    role: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    deletedAt: Timestamp | null;
};
export type DealHistory = {
    id: string;
    leadCompany: string;
    amount: string;
    outcome: DealHistoryOutcome;
    reason: string;
    insightId: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    deletedAt: Timestamp | null;
};
export type Funding = {
    id: string;
    insightId: string;
    leadCompanyId: string | null;
    amount: string | null;
    status: FundingStatus | null;
    date: Timestamp;
    summary: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    deletedAt: Timestamp | null;
};
export type FundingInvestorLink = {
    fundingId: string;
    investorId: string;
    createdAt: Generated<Timestamp>;
};
export type Insight = {
    id: string;
    leadCompanyId: string | null;
    debtRequirement: string | null;
    debtUrgency: DebtUrgency | null;
    description: string | null;
    sector: string | null;
    location: string | null;
    notes: string | null;
    summary: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    deletedAt: Timestamp | null;
    messageId: string;
};
export type Interaction = {
    id: string;
    insightId: string;
    summary: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    deletedAt: Timestamp | null;
};
export type InteractionAlteriaEmployee = {
    interactionId: string;
    alteriaEmployeeId: string;
    createdAt: Generated<Timestamp>;
};
export type InteractionLeadContact = {
    interactionId: string;
    leadContactId: string;
    createdAt: Generated<Timestamp>;
};
export type Investor = {
    id: string;
    name: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    deletedAt: Timestamp | null;
};
export type LeadCompany = {
    id: string;
    name: string;
    description: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    deletedAt: Timestamp | null;
};
export type LeadContact = {
    id: string;
    leadCompanyId: string;
    name: string | null;
    email: string | null;
    role: string | null;
    company: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    deletedAt: Timestamp | null;
};
export type LeadFinancials = {
    id: string;
    profitability: string | null;
    revenue: string | null;
    burn: string | null;
    cash: string | null;
    insightId: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    deletedAt: Timestamp | null;
};
export type Messages = {
    id: string;
    message: string;
    dateInteracted: Timestamp;
    isProcessed: Generated<number>;
    threadId: string;
    alteriaEmployeeId: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    deletedAt: Timestamp | null;
};
export type DB = {
    Actions: Actions;
    AlteriaEmployee: AlteriaEmployee;
    DealHistory: DealHistory;
    Funding: Funding;
    FundingInvestorLink: FundingInvestorLink;
    Insight: Insight;
    Interaction: Interaction;
    InteractionAlteriaEmployee: InteractionAlteriaEmployee;
    InteractionLeadContact: InteractionLeadContact;
    Investor: Investor;
    LeadCompany: LeadCompany;
    LeadContact: LeadContact;
    LeadFinancials: LeadFinancials;
    Messages: Messages;
};
