"use client";
import { useState, useEffect } from "react";
import withAuth from "@/hoc/withAuth";
import { AutoComplete, type Option } from "@/components/Autocomplete";
import { getAllUsernames } from "@/services/friendsService";
import ReceivedRequests from "@/components/ReceivedRequests";
import FriendsList from "@/components/FriendsList";
import Requested from "@/components/Requested";
import { getReceivedRequests } from "@/services/friendsService";

const Friends = () => {
  const [isLoading, setLoading] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [value, setValue] = useState<Option>();
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await getAllUsernames();
    setData(data);
  };

  return (
    <main>
      <div className="flex flex-col m-auto h-1/6 w-3/5 gap-5 mt-5">
        <div>
          <h1 className="font-bold">Search users</h1>
          <AutoComplete
            options={data}
            emptyMessage="No results."
            placeholder="Find something"
            isLoading={isLoading}
            onValueChange={setValue}
            value={value}
            disabled={isDisabled}
          />
        </div>
        <div>
          <FriendsList />
        </div>
        <div>
          <ReceivedRequests />
        </div>
        <div>
          <Requested />
        </div>
      </div>
    </main>
  );
};

export default withAuth(Friends);
