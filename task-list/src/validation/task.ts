import { z } from 'zod';
import { format } from 'date-fns';

import {
  TaskKeysEnum,
  TaskPriorityEnum,
  TaskSortEnum,
  TaskStatusEnum,
} from '@/interfaces/task';

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
      .transform((value) => format(new Date(value), 'yyyy-MM-dd'))
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
