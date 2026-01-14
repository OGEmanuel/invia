import { Button } from '@/components/ui/button';
import EditBusinessName from './profile-edits/business-name';
import EditName from './profile-edits/name';
import EditEmail from './profile-edits/email';
import EditPassword from './profile-edits/password';
import { ProfileCard } from './profile-edits';
import EditBusinessLogo from './profile-edits/business-logo';

const Account = () => {
  return (
    <section className="flex flex-col gap-8">
      <h1 className="font-serif text-2xl/8 text-[#212121]">Account</h1>
      <div className="flex flex-col gap-8">
        <EditBusinessLogo />
        <EditBusinessName />
        <hr className="border-y-[0.5px] border-[#00000014]" />
        <div className="flex flex-col gap-4">
          <EditName />
          <hr className="border-y-[0.5px] border-dashed border-[#00000014]" />
          <EditEmail />
          <hr className="border-y-[0.5px] border-dashed border-[#00000014]" />
          <EditPassword />
        </div>
        <hr className="border-y-[0.5px] border-[#00000014]" />
        <ProfileCard
          name="Permanently delete your invia account."
          value="Delete account"
          className="items-center [&>div]:flex-col-reverse"
        >
          <Button
            variant={'neutral'}
            className="border-destructive/10 text-destructive h-10"
          >
            Delete
          </Button>
        </ProfileCard>
      </div>
    </section>
  );
};

export default Account;
