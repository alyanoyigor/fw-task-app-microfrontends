import { BaseTaskInterface } from '@/interfaces/task';

export const updateTask= async ({
  id,
  task,
  supabase,
}: {
  id: number;
  task: Partial<BaseTaskInterface>;
  supabase: any;
}) => {
  const { error, data } = await supabase.from('tasks').update(task).eq('id', id).select();
  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};
