 "use client";

import React, { useRef, useState } from "react";
import ServiceComponent from "./_components/ServiceComponent";
import ShowService from "./_components/ShowService";

const Page = () => {
  const [editingService, setEditingService] = useState(null);
  const refreshServicesRef = useRef(null);

  return (
    <>
      <ServiceComponent
        editingService={editingService}
        clearEditing={() => setEditingService(null)}
        onUpdateSuccess={() => {
          if (refreshServicesRef.current) {
            refreshServicesRef.current();
          }
        }}
      />
      <ShowService
        onEdit={(service) => setEditingService(service)}
        onRefreshReady={(refreshFn) => {
          refreshServicesRef.current = refreshFn;
        }}
      />
    </>
  );
};

export default Page;