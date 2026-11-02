
import "./home.css";
import { Navigation } from "./_home";
import dynamic from "next/dynamic";
import Title from "./_home/Title";
import Information from "./_home/Informations";
import News from "./_home/News";
import PageTop from "./_home/PageTop";
import LoadingScreen from "../components/ClientLoadingScreen";

const Footer = dynamic(() => import("../components/Footer"));

export default function App() {
  return (
    <div className="text-maintext overflow-x-hidden">
      <LoadingScreen />
      <Navigation />

      <div className="h-[5px]" />

      <Title />

      <News />

      <div className="bg-gradient-to-b from-[#6A1717] to-[#CE2D2D] flex flex-col items-center">
        <Information />
      </div>

      <PageTop />

      <Footer />
    </div>
  );
}
