import { HomePageView } from "@/features/home/components/home-page-view";
import { getHomePageData } from "@/features/home/server/home-queries";

export default async function HomePage() {
  const homePageData = await getHomePageData();

  return <HomePageView {...homePageData} />;
}
