import { permanentRedirect } from "next/navigation";

/** Each product runs on its own site; this address goes to /products, which links to it. */
export default function Page() {
  permanentRedirect("/products");
}
