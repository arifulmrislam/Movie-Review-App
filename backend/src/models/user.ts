import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";
import { UserAttributes, UserCreationAttributes } from "../types/user.types";

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public user_id!: number; 
    public user_name!: string;
    public email!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize, 
        modelName: "User",
        tableName: "Users",
        timestamps: true, 
    }
);

export default User;
