import { redirect } from "next/navigation";

// The middleware handles redirecting / to /{locale}
// This is a fallback
export default function Page() {
  redirect("/en");
}
