import { UserProfile } from '@clerk/nextjs'

const ProfilePage = () => {
  return (
    <div>
      <div className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
        <UserProfile />
      </div>
    </div>
  )
}
export default ProfilePage
