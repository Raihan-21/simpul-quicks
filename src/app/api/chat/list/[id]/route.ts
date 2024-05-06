import { Sequelize, sequelize } from "../../../../../../models";
import chatSessionModel from "../../../../../../models/chatsession";

const ChatSession = chatSessionModel(sequelize, Sequelize.DataTypes);

export async function GET(req: Request) {
  try {
  } catch (error) {}
}
