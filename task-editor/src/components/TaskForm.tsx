import { FC, useState } from 'react';
import { CalendarIcon, Check } from 'lucide-react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  BaseTaskInterface,
  TaskInterface,
  TaskPriorityEnum,
  TaskStatusEnum,
} from '@/interfaces/task';
import { cn, dirtyValues } from '@/lib/utils';
import { TaskFormSchema } from '@/validation/task';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Calendar } from './ui/calendar';
import { Textarea } from './ui/textarea';

interface TaskFormProps {
  action: (
    task: BaseTaskInterface
  ) => Promise<any>;
  onCloseDialog: () => void;
  actionName: 'create' | 'update';
  defaultTaskValues?: TaskInterface;
}

const initialTaskValues = {
  title: '',
  description: '',
  priority: TaskPriorityEnum.LOW,
  status: TaskStatusEnum.PENDING,
  deadline: new Date(),
};

const TaskForm: FC<TaskFormProps> = ({
  defaultTaskValues = initialTaskValues,
  onCloseDialog,
  action,
  actionName,
}) => {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const form = useForm<BaseTaskInterface>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      ...defaultTaskValues,
      deadline:
        defaultTaskValues.deadline && new Date(defaultTaskValues.deadline),
    },
    reValidateMode: 'onSubmit',
  });
  const {
    formState: { errors, dirtyFields },
    setError,
  } = form;

  const onSubmit = async (data: BaseTaskInterface) => {
    try {
      let tempData = data;

      if (actionName === 'update') {
        tempData = dirtyValues<BaseTaskInterface>(dirtyFields, data);
      }

      await action(tempData);

      onCloseDialog();
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError('root', { message: error.message });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-0 grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <FormLabel className="text-right">Title</FormLabel>
              <FormControl>
                <Input className="col-span-3" {...field} />
              </FormControl>
              <FormMessage className="col-start-2 col-end-5" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-0 grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <FormLabel className="text-right">Description</FormLabel>
              <FormControl>
                <Textarea className="col-span-3" {...field} />
              </FormControl>
              <FormMessage className="col-start-2 col-end-5" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem className="space-y-0 grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <FormLabel className="text-right">Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3 data-[placeholder]:text-gray-500">
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage className="col-start-2 col-end-5" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-0 grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <FormLabel className="text-right">Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3 data-[placeholder]:text-gray-500">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage className="col-start-2 col-end-5" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem className="space-y-0 grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <FormLabel className="text-right">Deadline</FormLabel>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'col-span-3 pl-3',
                        !field.value && 'text-gray-500'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                  hideWhenDetached
                >
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(value) => {
                      field.onChange(value ?? null);
                      setCalendarOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="col-start-2 col-end-5" />
            </FormItem>
          )}
        />

        {errors.root && (
          <p className="text-red-500 text-xs text-right">
            {errors.root.message}
          </p>
        )}

        <Button type="submit" className="w-full max-w-[100px] ml-auto gap-2">
          <Check className="h-4 w-4" /> <span>Save</span>
        </Button>
      </form>
    </Form>
  );
};

export default TaskForm;
