import { AppLayout } from "@/components/AppLayout";
import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <AppLayout title="Settings" subtitle="Application configuration">
      <div className="max-w-2xl">
        <div className="bg-card rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <SettingsIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-card-foreground">Application Settings</h3>
              <p className="text-xs text-muted-foreground">Configure your SupplAI Wise instance</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Settings and user management will be available after connecting to Lovable Cloud for authentication and database.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
