import HelpBox from "@/components/admin/HelpBox";
import SettingsForm from "@/components/admin/SettingsForm";
import { readDb } from "@/lib/db";

export default async function SettingsPage() {
  const { settings } = await readDb();
  return (
    <div className="space-y-8">
      <HelpBox title="What this page is for">
        <p>When a customer taps &ldquo;Order on WhatsApp&rdquo; at checkout, WhatsApp opens with their order written out and sends it to the number below. Check it carefully.</p>
      </HelpBox>
      <h1 className="text-3xl text-cream">Settings</h1>
      <SettingsForm settings={settings} />
    </div>
  );
}
