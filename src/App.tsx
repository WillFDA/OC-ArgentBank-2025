import { Outlet } from "react-router";
import Footer from "./components/ui/Footer";
import Navbar from "./components/ui/navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="main bg-dark">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
