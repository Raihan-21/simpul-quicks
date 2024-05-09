import { Sequelize, sequelize } from "../../../../../../models";
import taskModel from "../../../../../../models/task";

const Task = taskModel(sequelize, Sequelize.DataTypes);

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { type } = await req.json();
    const res = await Task.update({ type }, { where: { id: params.id } });
    return Response.json({ data: res });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
