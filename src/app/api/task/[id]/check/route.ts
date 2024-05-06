import { Sequelize, sequelize } from "../../../../../../models";
import taskModel from "../../../../../../models/task";

const Task = taskModel(sequelize, Sequelize.DataTypes);

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { completed } = await req.json();
    const res = await Task.update({ completed }, { where: { id: params.id } });
    console.log(res);
    return Response.json({ data: res });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
