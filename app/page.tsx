import Header from "./components/Header";
import { Instrument_Sans } from "next/font/google";
import Footer from "./components/Footer";

const instrumentSans = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });


export default function Home() {
  return (
    <main className={instrumentSans.className}>
    <Header/>
    <Footer/>
  </main>
  );
}
