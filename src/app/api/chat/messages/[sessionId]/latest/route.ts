import { Sequelize, sequelize } from "../../../../../../../models";
import messageModel from "../../../../../../../models/message";
import userModel from "../../../../../../../models/user";

const Message = messageModel(sequelize, Sequelize.DataTypes);
const User = userModel(sequelize, Sequelize.DataTypes);

export async function GET(
  req: Request,
  { params }: { params: { sessionId: string; id: string } }
) {
  try {
    const res = await sequelize.query(
      "SELECT messages.*, row_to_json(users.*) as user FROM messages JOIN users ON messages.id_user = users.id WHERE messages.id_chat_session = :sessionId ORDER BY messages.created_at DESC LIMIT 1",
      {
        replacements: { sessionId: params.sessionId },
      }
    );
    return Response.json({ data: res[0] });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
