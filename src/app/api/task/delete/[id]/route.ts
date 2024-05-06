import { Sequelize, sequelize } from "../../../../../../models";
import taskModel from "../../../../../../models/task";

const Task = taskModel(sequelize, Sequelize.DataTypes);

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await Task.destroy({ where: { id: params.id } });
    console.log(res);
    return Response.json({ data: res });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
