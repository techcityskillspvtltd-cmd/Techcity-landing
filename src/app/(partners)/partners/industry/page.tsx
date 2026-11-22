import { permanentRedirect } from "next/navigation";

/** The industry partners page moved to /partners/industries; keep old links working. */
export default function Page() {
  permanentRedirect("/partners/industries");
}
