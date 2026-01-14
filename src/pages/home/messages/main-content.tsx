// import UpgradeEmpty from './upgrade-empty';
// import TemplatesEmpty from './templates-empty';

import Edit from '@/assets/jsx-icons/edit';
import CategoryPill from '@/components/ui/custom/category-pill';
import DialogContentWrapper from '@/components/ui/custom/dialog-content-wrapper';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Clock3, MoreVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
import TemplateForm from './template-form';
import notice from '@/assets/icons/notice.svg';
import { Button } from '@/components/ui/button';
import { Drawer } from '@/components/ui/drawer';
import DrawerContentWrapper, {
  DrawerFooterWrapper,
} from '@/components/ui/custom/drawer-content-wrapper';

const MainContent = () => {
  const data = [];

  for (let i = 0; i < 6; i++) {
    data.push({
      id: `${i}`,
      category:
        Math.random() > 0.3
          ? 'Wedding'
          : Math.random() > 0.5
            ? 'Party'
            : Math.random() > 0.8
              ? 'Corporate'
              : 'Others',
    });
  }

  return (
    <section className="flex min-h-[calc(100vh-326px)] justify-center max-md:px-5 md:min-h-[calc(100vh-297px)] md:max-xl:px-8">
      <div className="_items-center _justify-center flex w-full max-w-300">
        {/* <UpgradeEmpty /> */}
        {/* <TemplatesEmpty /> */}
        <div className="grid gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map(template => (
            <TemplateCard
              key={template.id}
              category={template.category}
              name={`${template.category} invite template`}
              description={
                'Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.'
              }
              followUp={1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainContent;

const TemplateCard = (props: {
  category: string;
  name: string;
  description: string;
  followUp?: number;
}) => {
  const { category, name, description, followUp } = props;
  return (
    <div className="flex flex-col gap-3 rounded-[12px] border border-black/8 p-5">
      <div className="flex items-center justify-between">
        <CategoryPill category={category} />
        <TemplateActions>
          <MoreVertical className="text-[#212121]" />
        </TemplateActions>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-serif leading-6">{name}</p>
        <p className="line-clamp-3 text-sm/[22px] -tracking-[0.02em] text-ellipsis text-[#575554]">
          {description}
        </p>
      </div>
      {followUp && (
        <div className="flex items-center gap-2">
          <Clock3 className="size-5 text-[#A3A19D]" />
          <p className="text-sm/[22px] -tracking-[0.02em] text-[#575554]">
            <span className="font-medium text-[#212121]">{followUp}</span>{' '}
            follow-up message
          </p>
        </div>
      )}
    </div>
  );
};

const TemplateActions = (props: {
  className?: string;
  children: React.ReactNode;
  asChild?: boolean;
}) => {
  const { className, children, asChild } = props;
  const [showEditTemplateDialog, setShowEditTemplateDialog] = useState(false);
  const [showRemoveTemplateDialog, setShowRemoveTemplateDialog] =
    useState(false);
  const [showEditTemplateDrawer, setShowEditTemplateDrawer] = useState(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          className={cn('cursor-pointer', className)}
          asChild={asChild}
        >
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={() => setShowEditTemplateDialog(true)}
            className="max-sm:hidden"
          >
            <Edit />
            Edit template
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setShowEditTemplateDrawer(true)}
            className="sm:hidden"
          >
            <Edit />
            Edit guest
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => setShowRemoveTemplateDialog(true)}
          >
            <Trash2 />
            Delete template
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog
        open={showEditTemplateDialog}
        onOpenChange={setShowEditTemplateDialog}
      >
        <DialogContentWrapper title="Edit message template" className="h-max">
          <TemplateForm>
            <DialogFooter className="border-t border-[#00000014] p-4">
              <DialogClose asChild>
                <Button type="button" variant={'neutral'}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Create template</Button>
            </DialogFooter>
          </TemplateForm>
        </DialogContentWrapper>
      </Dialog>
      <Dialog
        open={showRemoveTemplateDialog}
        onOpenChange={setShowRemoveTemplateDialog}
      >
        <DialogContent className="flex max-w-88.25 flex-col gap-8 rounded-3xl px-4 pt-10 pb-4 sm:max-w-130 [&>button_svg:not([class*='size-'])]:size-6">
          <DialogHeader className="sr-only">
            <DialogTitle>Delete this message template?</DialogTitle>
            <DialogDescription>
              This template will be permanently removed and will no longer be
              available for use.
            </DialogDescription>
          </DialogHeader>
          <RemoveTemplate />
          <DialogFooter className="flex-row justify-center sm:justify-center">
            <DialogClose asChild>
              <Button variant="neutral">Go back</Button>
            </DialogClose>
            <Button variant={'destructive'}>Remove template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Drawer
        open={showEditTemplateDrawer}
        onOpenChange={setShowEditTemplateDrawer}
      >
        <DrawerContentWrapper title="Edit message template">
          <TemplateForm>
            <DrawerFooterWrapper
              buttonLabel="Save changes"
              className="sm:hidden"
            ></DrawerFooterWrapper>
          </TemplateForm>
        </DrawerContentWrapper>
      </Drawer>
    </>
  );
};

export const RemoveTemplate = () => {
  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-100 flex-col items-center gap-5 text-center">
        <div className="size-22">
          <img src={notice} alt="notice-icon" className="size-full" />
        </div>
        <div className="flex flex-col gap-2 text-sm/[22px] -tracking-[0.02em] text-[#575554]">
          <h3 className="font-serif text-xl/7 text-[#212121]">
            Delete this message template?
          </h3>
          <p>
            This template will be permanently removed and will no longer be
            available for use.
          </p>
        </div>
      </div>
    </div>
  );
};
