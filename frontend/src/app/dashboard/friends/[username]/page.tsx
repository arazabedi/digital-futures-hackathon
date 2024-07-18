"use client";
import {
  getAllFriendsWeightLogs,
  getAllUsernamesInArray,
  getUserDetails,
  isRequested,
  sendFriendRequest,
  getFormattedUserWeightLog,
} from "@/services/friendsService";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ResponsiveLineComponent from "@/components/ResponsiveLineComponent";
import withAuth from "@/hoc/withAuth";

const UserPage = ({ params }: { params: { username: string } }) => {
  const [usernameExists, setUsernameExists] = useState(false);
  const [userDetails, setUserDetails] = useState<any>();
  const [requested, setRequested] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [weightLog, setWeightLog] = useState<
    { id: string; color: string; data: any }[]
  >([]);
  const [allFriendWeightLogs, setAllFriendWeightLogs] = useState<any[]>([]);

  const username = params.username;

  useEffect(() => {
    const checkUsername = async () => {
      const allUsernames = await getAllUsernamesInArray();
      if (allUsernames.includes(username)) {
        setUsernameExists(true);
      }
    };

    checkUsername();
  }, [username]);

  useEffect(() => {
    if (!usernameExists) return;

    const attachUserDetails = async () => {
      const data = await getUserDetails(username);
      setUserDetails(data);
    };

    attachUserDetails();
  }, [username, usernameExists]);

  useEffect(() => {
    if (!userDetails) return;

    const checkIsRequested = async () => {
      const res: any = await isRequested(userDetails._id);
      setRequested(res);
    };

    checkIsRequested();
  }, [userDetails]);

  const handleRequest = async () => {
    if (userDetails) {
      await sendFriendRequest(userDetails._id);
      setRequested(true);
    }
  };

  useEffect(() => {
    if (!userDetails) return;

    const checkIsFriend = async () => {
      const res: any = await getAllFriendsWeightLogs();
      setAllFriendWeightLogs(res);

      const isFriend = res.some(
        (friend: any) => friend.friend_id === userDetails._id
      );
      setIsFriend(isFriend);
    };

    checkIsFriend();
  }, [userDetails]);

  useEffect(() => {
    if (!allFriendWeightLogs.length || !username) return;

    if (!isFriend) return;

    const getData = async () => {
      const formattedLog = await getFormattedUserWeightLog(
        allFriendWeightLogs,
        username
      );
      if (formattedLog) {
        setWeightLog(formattedLog.slice(-30));
      }
    };

    getData();
  }, [allFriendWeightLogs, username, isFriend]);

  console.log(weightLog);

  if (!usernameExists) {
    return (
      <main className="h-full w-full text-center font-bold m-auto items">
        <h1 className="mt-60">User does not exist</h1>
      </main>
    );
  }

  if (usernameExists && userDetails && !isFriend) {
    return (
      <main className="h-full w-full text-center">
        <div className="h-3/6 w-1/4 m-auto mt-5">
          <Card>
            <CardHeader>
              <CardTitle>{username}</CardTitle>
              <CardDescription>
                {userDetails.full_name.first_name +
                  " " +
                  userDetails.full_name.middle_name +
                  " " +
                  userDetails.full_name.last_name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {requested ? (
                <Button variant="ghost">Requested</Button>
              ) : (
                <Button onClick={handleRequest}>Request</Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  if (usernameExists && userDetails && isFriend) {
    return (
      <main className="h-full w-full text-center">
        <div className="h-3/6 w-1/4 m-auto mt-5">
          <Card>
            <CardHeader>
              <CardTitle>{userDetails.username}</CardTitle>
              <CardDescription>
                {userDetails.full_name.first_name +
                  " " +
                  userDetails.full_name.middle_name +
                  " " +
                  userDetails.full_name.last_name}
                <p>{userDetails.email}</p>
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
        <div className="h-screen w-screen ">
          <div className="h-4/6 w-4/6 m-auto">
            <ResponsiveLineComponent
              data={weightLog}
              xTitle="Date"
              yTitle="Weight (kg)"
            />
          </div>
        </div>
      </main>
    );
  }

  return null;
};

export default withAuth(UserPage);
