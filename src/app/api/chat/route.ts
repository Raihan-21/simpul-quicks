import { Sequelize, sequelize } from "../../../../models";
import chatSessionModel from "..//../../../models/chatsession";

const ChatSession = chatSessionModel(sequelize, Sequelize.DataTypes);

export async function GET(req: Request) {
  try {
    const res = await ChatSession.findAll();
    return Response.json({ data: res });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
