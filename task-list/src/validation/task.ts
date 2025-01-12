import { z } from 'zod';

import { TaskKeysEnum, TaskPriorityEnum, TaskSortEnum, TaskStatusEnum } from '@/interfaces/task';
import { formatDate } from '@/lib/utils';

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
    .transform((value) => formatDate(value)),
});

export const TaskFiltersSchema = z
  .object({
    [TaskKeysEnum.PRIORITY]: z
      .enum([
        'all',
        TaskPriorityEnum.LOW,
        TaskPriorityEnum.MEDIUM,
        TaskPriorityEnum.HIGH,
      ])
      .optional(),
    [TaskKeysEnum.STATUS]: z
      .enum([
        'all',
        TaskStatusEnum.PENDING,
        TaskStatusEnum.IN_PROGRESS,
        TaskStatusEnum.COMPLETED,
      ])
      .optional(),
    [TaskKeysEnum.DEADLINE]: z
      .string()
      .refine((str) => !isNaN(Date.parse(str)), {
        message: 'Invalid date format',
      })
      .transform((value) => formatDate(new Date(value)))
      .optional(),
    [TaskKeysEnum.SORT]: z
      .enum([
        'none',
        TaskSortEnum.TITLE,
        TaskSortEnum.PRIORITY,
        TaskSortEnum.STATUS,
        TaskSortEnum.DEADLINE,
      ])
      .optional(),
  })
  .strict();
