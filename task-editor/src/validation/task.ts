import { format } from 'date-fns';
import { z } from 'zod';

import { TaskKeysEnum } from '@/interfaces/task';

export const TaskFormSchema = z.object({
  [TaskKeysEnum.TITLE]: z.string().min(1, { message: 'Title is required' }),
  [TaskKeysEnum.DESCRIPTION]: z
    .string()
    .min(1, { message: 'Description is required' }),
  [TaskKeysEnum.PRIORITY]: z.enum(['low', 'medium', 'high'], {
    required_error: 'Priority is required',
  }),
  [TaskKeysEnum.STATUS]: z.enum(['pending', 'in-progress', 'completed'], {
    required_error: 'Status is required',
  }),
  [TaskKeysEnum.DEADLINE]: z
    .date({
      required_error: 'Deadline is required',
    })
    .transform((value) => format(value, 'yyyy-MM-dd')),
});
