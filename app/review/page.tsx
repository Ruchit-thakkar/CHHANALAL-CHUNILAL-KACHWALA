import type { Metadata } from "next";
import ReviewGeneratorClient from "./ReviewGeneratorClient";

export const metadata: Metadata = {
  title: "Share Your Experience | Google Review Generator — Chhanalal Chunilal Kachwala",
  description:
    "Generate authentic Google review suggestions for your experience with Chhanalal Chunilal Kachwala glass and aluminium studio in seconds.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function ReviewPage() {
  return <ReviewGeneratorClient />;
}
