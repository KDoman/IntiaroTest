import { Link } from "react-router-dom";
import { HopePageCard } from "../components/HomePageCard";
import { TABS_WITHOUT_HOMEPAGE } from "../data/tabs";

export function HomePage() {
  return (
    <div className="grid gap-10 grid-cols-2 place-items-center py-10 ">
      {TABS_WITHOUT_HOMEPAGE.map((tab) => {
        return (
          <Link key={tab.id} to={tab.path}>
            <HopePageCard imgSrc={tab.img}>{tab.label}</HopePageCard>
          </Link>
        );
      })}
    </div>
  );
}
