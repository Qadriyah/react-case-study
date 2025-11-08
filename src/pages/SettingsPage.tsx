import React from "react";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Input from "../components/Input";
import { usePollingSettings } from "../hooks/usePollingSettings";
import { notify, setPollingSettings } from "../utils/helpers";

export const SettingsPage = () => {
  const { settings, setSettings } = usePollingSettings();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setPollingSettings(settings);
    notify("Setting have been saved successfully", { type: "success" });
  };

  return (
    <main style={{ padding: "1rem" }}>
      <form className="form card" onSubmit={handleSubmit}>
        <h1>Polling Settings</h1>
        <Checkbox
          type="checkbox"
          id="isPolling"
          name="isPolling"
          label="Enable polling"
          checked={settings.isPolling}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              isPolling: e.target.checked,
            }))
          }
        />
        <Input
          type="number"
          id="interval"
          name="interval"
          label="Interval in seconds"
          placeholder="10000"
          value={settings.interval}
          required
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              interval: e.target.valueAsNumber,
            }))
          }
        />
        <Button className="button" type="submit">
          Save
        </Button>
      </form>
    </main>
  );
};
