import dotenv from "dotenv";
dotenv.config();

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;
const STRIPE_SECRET_KEY =
  "sk_test_51RBLl4PaX6hIXI1Jd9jzMGq04cAwFYpStDHfzrlF0ORIgVQAuBocAg8SPMHNYTzl1pPNSrvzxLG92yY8Ck72ANc400sf0Vtgxr";

export default {
  JWT_USER_PASSWORD,
  JWT_ADMIN_PASSWORD,
  STRIPE_SECRET_KEY,
};