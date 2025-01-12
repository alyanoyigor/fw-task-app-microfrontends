export enum TaskStatusEnum {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

export enum TaskPriorityEnum {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum TaskSortEnum {
  TITLE = 'title',
  PRIORITY = 'priority',
  STATUS = 'status',
  DEADLINE = 'deadline',
}

export enum TaskKeysEnum {
  ID = 'id',
  TITLE = 'title',
  DESCRIPTION = 'description',
  PRIORITY = 'priority',
  STATUS = 'status',
  DEADLINE = 'deadline',
  SORT = 'sort',
  USER_ID = 'user_id',
}

export interface BaseTaskInterface {
  [TaskKeysEnum.TITLE]: string;
  [TaskKeysEnum.DESCRIPTION]: string;
  [TaskKeysEnum.PRIORITY]: TaskPriorityEnum;
  [TaskKeysEnum.STATUS]: TaskStatusEnum;
  [TaskKeysEnum.DEADLINE]: Date;
}

export interface TaskInterface extends BaseTaskInterface {
  [TaskKeysEnum.ID]: number;
  [TaskKeysEnum.USER_ID]: string;
}

export interface TaskFiltersInterface {
  [TaskKeysEnum.PRIORITY]: TaskPriorityEnum | 'all';
  [TaskKeysEnum.STATUS]: TaskStatusEnum | 'all';
  [TaskKeysEnum.DEADLINE]: string;
  [TaskKeysEnum.SORT]: TaskSortEnum | 'none';
}
