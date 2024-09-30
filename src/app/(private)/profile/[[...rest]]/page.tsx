import { UserProfile } from '@clerk/nextjs'
import Navigation from '@/components/Navigation'

const ProfilePage = () => {
  return (
    <div>
      <Navigation />
      <div className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
        <UserProfile />
      </div>
    </div>
  )
}
export default ProfilePage
