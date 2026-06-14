"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useSettings } from "@/hooks/UseSettings";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/mode-toggle";

export const SettingsModal = () => {
  const settings = useSettings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <DialogTitle>
            My Settings
          </DialogTitle>

          <DialogDescription>
            Manage your application preferences and appearance settings.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>
              Appearance
            </Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how Obsidia looks on your device
            </span>
          </div>

          <ThemeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};