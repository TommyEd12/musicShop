export interface order{
    id: number;
    userId: number;
    status: "Created" | "inProgress" | "Finished"
}