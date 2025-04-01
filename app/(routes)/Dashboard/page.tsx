//import { UserButton } from "@clerk/nextjs";
import { LastCustomers } from "./components/LastCustomers";
import { CardSummary} from "./components/CardSummary/CardSummary"
import { BookOpenCheck, UsersRound, Waypoints } from 'lucide-react';
import { Salesdistributors } from "./components/Salesdistributors";
import { TotalSuscribers } from "./components/TotalSuscribers";
import { ListIntegration } from "./components/ListIntegration";
export default function Home() {
  return (
    <div>
  
    <h2 className="text-2xl mb-4">Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20">
      <CardSummary
      icon={UsersRound }
      total="12.450"
      average={15}
      title="Total Sales"
      tooltipText="see all sales"
      />
      <CardSummary
      icon={Waypoints }
      total="86.5%"
      average={80}
      title="Total revenue"
      tooltipText="see all sumary sales"
      />
      <CardSummary
      icon={BookOpenCheck }
      total="363,450$"
      average={30}
      title="Bounce Rate"
      tooltipText="see all Bounce Rate"
      />
    </div>
      <div className="grid grid-cols-1 mt-12 gap-y-10 xl:grid-cols-2 md:gap-x-10">
        <LastCustomers />
        <Salesdistributors />
      </div>
      <div className="flex-col md:gap-x-10 xl:flex xl:flex-row gap-y-4 md:gap-y-0 mt-12 md:mb-10 justify-center">
          <TotalSuscribers/>
          <ListIntegration/>
      </div>
    </div>
 
  );
}
