import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon, Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import { TaskFiltersInterface, TaskInterface } from '@/interfaces/task';
import { TaskFiltersSchema } from '@/validation/task';

import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
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
import { Calendar } from './ui/calendar';
import { getTasks } from '@/api/getTasks';

interface TaskFiltersProps {
  onCloseDialog: () => void;
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[] | null>>;
  onNavigate: any;
  supabase: any;
}

const TaskFilters: FC<TaskFiltersProps> = ({
  onCloseDialog,
  onNavigate,
  setTasks,
  supabase,
}) => {
  const searchParams = new URLSearchParams(window.location.search);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const { data: defaultValues } = TaskFiltersSchema.safeParse({
    priority: searchParams.get('priority') || 'all',
    status: searchParams.get('status') || 'all',
    ...(searchParams.get('deadline') && {
      deadline: searchParams.get('deadline'),
    }),
    sort: searchParams.get('sort') || 'none',
  });

  const form = useForm<TaskFiltersInterface>({
    defaultValues,
  });

  const onSubmit = async (data: TaskFiltersInterface) => {
    const filters: Partial<TaskFiltersInterface> = {
      ...(data.priority !== 'all' && { priority: data.priority }),
      ...(data.status !== 'all' && { status: data.status }),
      ...(data.sort !== 'none' && { sort: data.sort }),
      ...(data.deadline && { deadline: format(data.deadline, 'yyyy-MM-dd') }),
    };

    onNavigate({
      to: '/tasks',
      search: filters,
    });

    const tasks = await getTasks(supabase, filters);
    setTasks(tasks);

    onCloseDialog();
  };

  const onReset = async () => {
    onNavigate({ to: '/tasks' });

    const tasks = await getTasks(supabase, {});
    setTasks(tasks);

    onCloseDialog();
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
                    selected={field.value && new Date(field.value)}
                    onSelect={(value) => {
                      field.onChange(value ?? null);
                      setCalendarOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sort"
          render={({ field }) => (
            <FormItem className="space-y-0 grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <FormLabel className="text-right">Sort by</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3 data-[placeholder]:text-gray-500">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onReset}>
            Reset
          </Button>

          <Button type="submit" className="gap-2">
            <Check className="h-4 w-4" />
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TaskFilters;
