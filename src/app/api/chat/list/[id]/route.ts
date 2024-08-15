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
  { params }: { params: { id: string } },
) {
  try {
    const res = await sequelize.query(
      "SELECT chat_sessions.*,  json_agg(json_build_object('id', users.id, 'name', users.name)) as members  FROM chat_sessions JOIN chat_members ON chat_sessions.id = chat_members.id_chat_session JOIN users ON chat_members.id_user = users.id where users.id = :userId GROUP BY chat_sessions.id",
      { replacements: { userId: params.id } },
    );
    const response = res[0].map(async (chat: any) => {
      try {
        const messageRes = await sequelize.query(
          "SELECT messages.*, row_to_json(users.*) as user FROM messages JOIN users ON messages.id_user = users.id WHERE messages.id_chat_session = :sessionId ORDER BY messages.created_at DESC LIMIT 1",
          {
            replacements: { sessionId: chat.id },
          },
        );
        return { ...chat, lastMessage: messageRes[0][0] };
      } catch (error) {
        console.log(error);
      }
    });
    const finalRes = await Promise.all(response);
    return Response.json({ data: finalRes });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
