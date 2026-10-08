import SettingsForm from "@/components/admin/SettingsForm";
import { readDb } from "@/lib/db";

export default async function SettingsPage() {
  const { settings } = await readDb();
  return (
    <div className="space-y-8">
      <h1 className="font-serif text-4xl text-cream">Settings</h1>
      <SettingsForm settings={settings} />
    </div>
  );
}
