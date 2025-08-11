import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { AuthButton } from "../auth-button";
import { EnvVarWarning } from "../env-var-warning";
import { ThemeSwitcher } from "../theme-switcher";

export const Header = () => (
  <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
    <div className="container mx-auto flex justify-between items-center py-3 text-sm">
      <Link href="/">
        <p className="flex gap-5 items-center font-semibold text-xl">Vlog.to</p>
      </Link>
      <div className="flex items-center gap-4">
        {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
        <ThemeSwitcher />
      </div>
    </div>
  </nav>
);
