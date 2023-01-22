import "./style.scss";

import { useEffect, useState } from "react";
import { serversAPI } from "../../api/servers";
import { Loader } from "../../components/Loader";
import { ServersTable } from "../../components/ServersTable";
import { Server } from "../../types/types";

export function ServersPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [servers, setServers] = useState<Server[]>([]);

  useEffect(() => {
    setIsLoading(true);

    serversAPI
      .getAllServers()
      .then((data) => {
        if (data) {
          setServers(data);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="table__wrapper">
      {isLoading && <Loader />}
      <ServersTable items={servers} />
    </div>
  );
}
