"use client";
import SettingsCard from "@/components/SettingsCard";
import { useAuth } from "@/hooks/useAuth";
import withAuth from "@/hoc/withAuth";

const Settings = () => {
  const { handleLogout } = useAuth();

  return (
    <>
      <div className="p-20">
        <SettingsCard
          buttonVariant="secondary"
          title="Sign Out"
          description="Safely exit your account."
          buttonText="Sign Out"
          buttonOnClick={() => {
            handleLogout();
          }}
        />
      </div>
    </>
  );
};

export default withAuth(Settings);
