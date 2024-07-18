"use client";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { getReceivedRequests } from "@/services/friendsService";
import { acceptRequest } from "@/services/friendsService";
import { useRouter } from "next/navigation";

const ReceivedRequests = () => {
  const [requests, setRequests] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getReceivedRequests();
        setRequests(data);
      } catch (err) {
        setError("Failed to fetch requests");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleAccept = async (username: string) => {
    await acceptRequest(username);
    router.refresh();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Requested</CardTitle>
        <CardDescription>Your received requests</CardDescription>
      </CardHeader>
      {requests.length > 0 ? (
        requests.map((username: string, index: number) => (
          <CardContent key={index}>
            <div className="flex flex-row gap-5 text-center items-center align-middle">
              <h2>{username}</h2>
              <Button onClick={() => handleAccept(username)}>Accept</Button>
            </div>
          </CardContent>
        ))
      ) : (
        <CardContent>No requests</CardContent>
      )}
    </Card>
  );
};

export default ReceivedRequests;
