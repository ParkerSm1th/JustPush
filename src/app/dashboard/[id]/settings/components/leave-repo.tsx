"use client";

import { useState } from "react";
import { Button } from "../../../../../components/ui/button";

export default function LeaveRepo({ action }: { action: () => Promise<void> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Button
      variant="destructive"
      disabled={isSubmitting}
      onClick={async () => {
        setIsSubmitting(true);

        await action();
        setIsSubmitting(false);
      }}
    >
      Leave Repo
    </Button>
  );
}
