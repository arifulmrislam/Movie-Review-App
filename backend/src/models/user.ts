import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./sequelize";
import { sign } from "jsonwebtoken";
import RR from "./review";

const bcrypt = require("bcryptjs") as typeof import("bcryptjs");

class User extends Model {
    public user_id!: number;
    public name!: string;
    public email!: string;
    public password!: string;

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

    generateToken(): string {
        return sign({ id: this.user_id }, process.env.JWT_SECRET as string, {
            expiresIn: "7d",
        });
    }
}

User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: true, 
        },
        email: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "Users",
        timestamps: false,
    }
);

// Hash password before saving to database
User.addHook("beforeCreate", async (user: User) => {
    if (user.changed("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
});

User.hasMany(RR, { foreignKey: "user_id", as: "reviews" }); 
RR.belongsTo(User, { foreignKey: "user_id", as: "user" });

export default User;