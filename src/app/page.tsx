import Home from "./Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Index() {
  return <Home />;
}
