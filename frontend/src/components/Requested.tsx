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
import { getSentRequests } from "@/services/friendsService";

const Requested = () => {
  const [requests, setRequests] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getSentRequests();
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Requests</CardTitle>
        <CardDescription>Your sent requests</CardDescription>
      </CardHeader>
      {requests.length > 0 ? (
        requests.map((username: string, index: number) => (
          <CardContent key={index}>
            <div className="flex flex-row gap-5 text-center items-center align-middle">
              <h2>{username}</h2>
            </div>
          </CardContent>
        ))
      ) : (
        <CardContent>No requests</CardContent>
      )}
    </Card>
  );
};

export default Requested;
