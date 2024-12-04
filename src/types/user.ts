enum role{
    Admin="admin",
    User = "user"
}
export interface User{
    id: number
    email: string
    password: string
    role: role
}