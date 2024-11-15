import Calculator from "./components/Calculator";
import "./globals.css";

export default function Home() {
  return (
    <main style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Calculator />
    </main>
  );
}
