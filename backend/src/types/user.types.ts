export interface UserAttributes {
    user_id: number;
    user_name: string;
    email: string;
    password: string;
}

export type UserCreationAttributes = Optional<UserAttributes, "user_id">;
