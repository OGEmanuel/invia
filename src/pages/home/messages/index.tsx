import { Button } from '@/components/ui/button';
import Banner from '../banner';
import MainContent from './main-content';
import MessagesIcon from '@/assets/jsx-icons/messages-icon';
import TemplateForm from './template-form';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Dialog, DialogClose, DialogFooter } from '@/components/ui/dialog';
import DialogContentWrapper from '@/components/ui/custom/dialog-content-wrapper';
import {
  Drawer,
  DrawerClose,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer';
import DrawerContentWrapper from '@/components/ui/custom/drawer-content-wrapper';

const Messages = () => {
  return (
    <>
      <Banner
        header="Send consistent invitations faster"
        description="Create reusable templates for invitations and follow-ups across all your events."
        className="py-7 sm:[&>div]:gap-6"
      >
        <TemplateFormDialog className="max-sm:hidden">
          <Button className="max-sm:w-max [&_svg:not([class*='size-'])]:size-6 [&>svg]:shrink-0">
            <MessagesIcon />
            New message template
          </Button>
        </TemplateFormDialog>
        <TemplateFormDrawer className="sm:hidden">
          <Button className="max-sm:w-max [&_svg:not([class*='size-'])]:size-6 [&>svg]:shrink-0">
            <MessagesIcon />
            New message template
          </Button>
        </TemplateFormDrawer>
      </Banner>
      <MainContent />
    </>
  );
};

export default Messages;

const TemplateFormDialog = (props: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const { children, className } = props;

  return (
    <Dialog>
      <DialogTrigger asChild className={className}>
        {children}
      </DialogTrigger>
      <DialogContentWrapper
        title="Create message template"
        description="Create a reusable message template for your guests."
        className="bg-white"
      >
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
  );
};

const TemplateFormDrawer = (props: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const { children, className } = props;

  return (
    <Drawer>
      <DrawerTrigger asChild className={className}>
        {children}
      </DrawerTrigger>
      <DrawerContentWrapper
        title="Create message template"
        description="Create a reusable message template for your guests."
        className="bg-white"
      >
        <TemplateForm>
          <DrawerFooter className="flex-row justify-end border-t border-[#00000014] p-4">
            <DrawerClose asChild>
              <Button type="button" variant={'neutral'}>
                Cancel
              </Button>
            </DrawerClose>
            <Button type="submit">Create template</Button>
          </DrawerFooter>
        </TemplateForm>
      </DrawerContentWrapper>
    </Drawer>
  );
};

// export const SendInvitationsMobileSheet = (props: {
//   open: boolean;
//   onSetOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   className?: string;
//   children?: React.ReactNode;
// }) => {
//   const { open, onSetOpen, children, className } = props;
//   const [page, setPage] = useState(0);

//   return (
//     <Sheet open={open} onOpenChange={onSetOpen}>
//       {children && (
//         <SheetTrigger asChild className={className}>
//           {children}
//         </SheetTrigger>
//       )}
//       <Activity mode={page === 0 ? 'visible' : 'hidden'}>
//         <SheetContentWrapper
//           title="Send Invitations"
//           description="Send invitations to your guests."
//           className="bg-white"
//           setOpen={onSetOpen}
//         >
//           <SendInvitationsForm setPage={setPage}>
//             <SheetFooter className="flex-row justify-end border-t border-[#00000014] p-4">
//               <SheetClose asChild>
//                 <Button type="button" variant={'neutral'}>
//                   Cancel
//                 </Button>
//               </SheetClose>
//               <Button type="submit">Preview message</Button>
//             </SheetFooter>
//           </SendInvitationsForm>
//         </SheetContentWrapper>
//       </Activity>
//       <Activity mode={page === 1 ? 'visible' : 'hidden'}>
//         <SheetContentWrapper
//           title="Preview and send to guests"
//           description="Review your invitation before sending it to your guests."
//           className="bg-white"
//           setOpen={onSetOpen}
//         >
//           <PreviewInvitations>
//             <SheetFooter className="flex-row justify-end border-t border-[#00000014] p-4">
//               <Button
//                 type="button"
//                 variant={'neutral'}
//                 onClick={() => setPage(0)}
//               >
//                 Back to edit
//               </Button>
//               <Button type="submit" onClick={() => setPage(2)}>
//                 Send to guests
//               </Button>
//             </SheetFooter>
//           </PreviewInvitations>
//         </SheetContentWrapper>
//       </Activity>
//       <Activity mode={page === 2 ? 'visible' : 'hidden'}>
//         <SheetContentWrapper
//           title="Message sent"
//           className="h-auto items-center gap-5 px-4 pt-10 pb-4"
//           hideHeader
//           setOpen={onSetOpen}
//         >
//           <MessageSent />
//           <div className="flex w-full max-w-100 flex-col gap-2 text-center">
//             <h3 className="font-serif text-xl/7 text-[#212121]">
//               Your invitations are on the way!
//             </h3>
//             <p className="text-sm/5 -tracking-[0.02em] text-[#575554]">
//               Guests will receive your invitation shortly, and you’ll see
//               updates as they respond.
//             </p>
//           </div>
//           <SheetFooter className="justify-center sm:w-full sm:justify-center">
//             <DialogClose asChild>
//               <Button
//                 type="button"
//                 variant={'neutral'}
//                 onClick={() => setPage(0)}
//               >
//                 Close
//               </Button>
//             </DialogClose>
//           </SheetFooter>
//         </SheetContentWrapper>
//       </Activity>
//     </Sheet>
//   );
// };
