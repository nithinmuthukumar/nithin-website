import { SideboardMatrix } from "@/components/blog/SideboardMatrix";
import { matrix, title } from "@/content/matrices/golgari-airship-matchups";

export const metadata = {
  title: `${title} | Nithin Muthukumar`,
};

export default function GolgariAirshipMatchups() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-screen-2xl">
      <h1 className="text-2xl font-bold mb-8">{title}</h1>
      <SideboardMatrix {...matrix} />
    </div>
  );
}
