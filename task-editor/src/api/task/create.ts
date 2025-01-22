import { BaseTaskInterface } from '@/interfaces/task';

export const createTask = async ({
  supabase,
  task,
}: {
  supabase: any;
  task: BaseTaskInterface;
}) => {
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // if (!user) {
  //   throw new Error('User not found');
  // }

  const { error, data } = await supabase
    .from('tasks')
    .insert({ ...task })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};
