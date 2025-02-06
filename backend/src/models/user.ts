import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

// Define UserAttributes
interface UserAttributes {
    user_id: number; // Primary key
    user_name: string;
    email: string;
    password: string;
}

// Define UserCreationAttributes 
interface UserCreationAttributes extends Optional<UserAttributes, "user_id"> { }

// Extend Sequelize's Model to include the attributes
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public user_id!: number; // Primary key (non-nullable)
    public user_name!: string;
    public email!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the model
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
        sequelize, // Pass the Sequelize instance
        modelName: "User",
        tableName: "Users",
        timestamps: true, // Enable createdAt and updatedAt
    }
);

export default User;
