import { Sequelize, sequelize } from "../../../../../../models";
import chatSessionModel from "../../../../../../models/chatsession";
import userModel from "../../../../../../models/user";
import chatMemberModel from "../../../../../../models/chatmember";
// import chatMemberModel from "../../../../../../models/chatmember";

const ChatSession = chatSessionModel(sequelize, Sequelize.DataTypes);
const User = userModel(sequelize, Sequelize.DataTypes);
const ChatMember = chatMemberModel(sequelize, Sequelize.DataTypes);

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await sequelize.query(
      "SELECT chat_sessions.*,  json_agg(json_build_object('id', users.id, 'name', users.name)) as members  FROM chat_sessions JOIN chat_members ON chat_sessions.id = chat_members.id_chat_session JOIN users ON chat_members.id_user = users.id where users.id = :userId GROUP BY chat_sessions.id",
      { replacements: { userId: params.id } }
    );
    return Response.json({ data: res });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
