"use client";
import withAuth from "@/hoc/withAuth";

const Profile = () => {
  return (
    <>
      <h1>Profile Component</h1>
    </>
  );
};

export default withAuth(Profile)
