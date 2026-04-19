import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">
        Route Placeholder Missing
      </p>
      <h1 className="font-heading text-5xl tracking-tight text-foreground">
        This room does not exist yet.
      </h1>
      <p className="max-w-xl text-base text-muted-foreground">
        The route structure is ready, but this particular path has no mock
        content assigned yet.
      </p>
      <Button nativeButton={false} render={<Link href="/" />}>
        Back to home
      </Button>
    </div>
  );
}
