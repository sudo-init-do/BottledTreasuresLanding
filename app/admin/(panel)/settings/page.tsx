import HelpBox from "@/components/admin/HelpBox";
import SettingsForm from "@/components/admin/SettingsForm";
import { readDb } from "@/lib/db";

export default async function SettingsPage() {
  const { settings } = await readDb();
  return (
    <div className="space-y-8">
      <HelpBox title="What this page is for">
        <p>The bank details here are shown to customers at checkout, so they know where to send the money. Check the account number carefully.</p>
      </HelpBox>
      <h1 className="text-3xl text-cream">Settings</h1>
      <SettingsForm settings={settings} />
    </div>
  );
}
