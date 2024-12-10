export interface Order {
  id: number;
  userId: number;
  status: "Created" | "inProgress" | "Finished";
  address: string;
  postIndex: number;
}
