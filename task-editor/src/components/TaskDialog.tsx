import { FC, PropsWithChildren } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  title: string;
}

const TaskDialog: FC<PropsWithChildren<TaskDialogProps>> = ({title, open, onOpenChange, children}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="sm:max-w-[500px]" onOpenAutoFocus={(event: Event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden">Task manipulation</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
