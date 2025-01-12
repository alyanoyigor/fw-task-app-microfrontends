import supabase from "@/lib/supabase";
import { TaskFiltersSchema } from "@/validation/task";
import { TaskInterface, TaskKeysEnum } from "@/interfaces/task";

export const getTasks = async (params: Record<string, never> = {}): Promise<TaskInterface[]> => {
  const { error: validationError, data: validatedParams } =
    TaskFiltersSchema.safeParse(params);

  if (validationError) {
    throw new Error('Invalid params or values');
  }

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // if (!user) {
  //   throw new Error('User not found');
  // }

  let query = supabase
    .from('tasks')
    .select()
    .order(validatedParams?.sort || 'created_at')
    // .eq(TaskKeysEnum.USER_ID, user.id);

  Object.entries(validatedParams).forEach(([key, value]) => {
    console.log(key, value);
    if (key !== TaskKeysEnum.SORT) {
      query = query.eq(key, value);
    }
  });

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}