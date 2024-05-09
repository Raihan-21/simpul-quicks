import { Sequelize, sequelize } from "../../../../../../models";
import taskModel from "../../../../../../models/task";

const Task = taskModel(sequelize, Sequelize.DataTypes);

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await Task.destroy({ where: { id: params.id } });
    return Response.json({ data: res });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
