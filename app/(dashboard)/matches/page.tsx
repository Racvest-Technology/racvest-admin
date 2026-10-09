import * as React from "react";
import { BidsMatchesView } from "@/features/matches";

export const metadata = {
  title: "Bids & Matches | Racvest Admin",
  description: "Track bid activity and traveler matching across every open delivery.",
};

export default function MatchesPage() {
  return <BidsMatchesView />;
}
