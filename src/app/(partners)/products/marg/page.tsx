import { permanentRedirect } from "next/navigation";

/** Each product runs on its own site; this address goes to its card on /products, which links out. */
export default function Page() {
  permanentRedirect("/products#marg");
}
