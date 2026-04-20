"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function AdminProductDeleteButton({
  productId,
}: {
  productId: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      disabled={isDeleting}
      onClick={async () => {
        const confirmed = window.confirm(
          "Delete this product? This will remove its cart rows and admin record.",
        );

        if (!confirmed) {
          return;
        }

        setIsDeleting(true);

        const response = await fetch(`/api/admin/products/${productId}`, {
          method: "DELETE",
        });

        setIsDeleting(false);

        if (!response.ok) {
          const payload = (await response.json().catch(() => null)) as
            | { error?: string }
            | null;
          window.alert(payload?.error ?? "Unable to delete product.");
          return;
        }

        router.refresh();
      }}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  );
}
