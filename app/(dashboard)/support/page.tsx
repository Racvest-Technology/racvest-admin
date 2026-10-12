import * as React from "react";
import { CustomerSupportView } from "@/features/support";

export const metadata = {
  title: "Customer Support Overview | Racvest Admin",
  description:
    "Manage customer issues, live conversations, safety emergencies, and resolution history across the Racvest network.",
};

export default function CustomerSupportPage() {
  return <CustomerSupportView />;
}
