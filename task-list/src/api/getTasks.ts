import { TaskFiltersSchema } from '@/validation/task';
import {
  TaskFiltersInterface,
  TaskInterface,
  TaskKeysEnum,
} from '@/interfaces/task';

export const getTasks = async (
  supabase: any,
  filters?: Partial<TaskFiltersInterface>
): Promise<TaskInterface[]> => {
  const searchParams = new URLSearchParams(window.location.search);
  const filtersSearchParams = {
    ...(searchParams.get('priority') && {
      priority: searchParams.get('priority'),
    }),
    ...(searchParams.get('status') && {
      status: searchParams.get('status'),
    }),
    ...(searchParams.get('deadline') && {
      deadline: searchParams.get('deadline'),
    }),
    ...(searchParams.get('sort') && { sort: searchParams.get('sort') }),
  };

  const { error: validationError, data: validatedParams } =
    TaskFiltersSchema.safeParse(filters || filtersSearchParams);

  if (validationError) {
    console.error(validationError);
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
    .order(validatedParams?.sort || 'created_at');
  // .eq(TaskKeysEnum.USER_ID, user.id);

  Object.entries(validatedParams).forEach(([key, value]) => {
    if (key !== TaskKeysEnum.SORT) {
      query = query.eq(key, value);
    }
  });

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};
