import Hero from '@/components/sections/hero';
import ProfileCard from '@/components/sections/profile-card';
import StatsBar from '@/components/sections/stats-bar';
import LatestPosts from '@/components/sections/latest-posts';
import RecentRides from '@/components/sections/recent-rides';
import TrainingDashboard from '@/components/sections/training-dashboard';
import PhotoDiary from '@/components/sections/photo-diary';
import CurrentBike from '@/components/sections/current-bike';
import Goals from '@/components/sections/goals';
import ExploreRoutes from '@/components/sections/explore-routes';

export default function HomePage() {
  return (
    <div className="grain">
      {/* Hero with profile card */}
      <div className="container-editorial">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <div className="lg:order-1">
            <Hero />
          </div>
          <div className="lg:order-2 lg:pt-16">
            <ProfileCard />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container-editorial section-padding !py-8 lg:!py-12">
        <StatsBar />
      </div>

      {/* Blog posts */}
      <div className="container-editorial section-padding !py-8 lg:!py-12">
        <LatestPosts />
      </div>

      {/* Rides + Training */}
      <div className="container-editorial section-padding !py-8 lg:!py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <RecentRides />
          <TrainingDashboard />
        </div>
      </div>

      {/* Photo diary */}
      <div className="container-editorial section-padding !py-8 lg:!py-12">
        <PhotoDiary />
      </div>

      {/* Bike + Goals */}
      <div className="container-editorial section-padding !py-8 lg:!py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <CurrentBike />
          <Goals />
        </div>
      </div>

      {/* Routes */}
      <div className="container-editorial section-padding !py-8 lg:!py-12">
        <ExploreRoutes />
      </div>

      {/* Bottom spacer */}
      <div className="h-8" />
    </div>
  );
}
