"use client";
import { getAllFriendsWeightLogs } from "@/services/friendsService";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "./ui/card";
import { useEffect, useState } from "react";

const FriendsList = () => {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    const getData = async () => {
      const friendsLogs = await getAllFriendsWeightLogs();
      let newArray: string[] = [];
      friendsLogs.forEach((log: any) => {
        newArray.push(log.friend_username);
      });
      setList(newArray);
    };

    getData();
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Friends</CardTitle>
          <CardDescription>
            Click to see your friend&apos;s details
          </CardDescription>
        </CardHeader>
        <CardContent>
          {list.map((username, index) => {
            return (
              <div key={index}>
                <a href={`/dashboard/friends/${username}`}>{username}</a>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </>
  );
};

export default FriendsList;
