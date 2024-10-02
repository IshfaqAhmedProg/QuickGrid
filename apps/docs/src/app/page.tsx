"use client";

import { Cell, Grid, GridProvider } from "@cubics/quick-grid";
import CardComponent from "../components/CardComponent";
import dummy from "../shared/constants/dummyData.json";

export default function Page() {
  return (
    <GridProvider
      title="CSS"
      // cardHeaderSlot={<p>hello</p>}
      cardSlot={CardComponent}
      data={dummy}
      gridHeaderMap={[
        {
          header: "Provider Data Display Name",
          accessorKey: "providerData.0.displayName",
          cellSlot: (v) => <Cell sx={{ backgroundColor: "blue" }}>{v}</Cell>,
        },
        {
          header: "Last Refresh Time",
          accessorKey: "metadata.lastRefreshTime",
          cellSlot: (v) => <Cell>{v}</Cell>,
        },
      ]}
    >
      <Grid />
    </GridProvider>
  );
}
