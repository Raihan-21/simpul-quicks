import { Sequelize, sequelize } from "../../../../../../../models";
import messageModel from "../../../../../../../models/message";

const Message = messageModel(sequelize, Sequelize.DataTypes);

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { content } = await req.json();
    const res = await Message.update({ content }, { where: { id: params.id } });
    return Response.json({ data: res });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
