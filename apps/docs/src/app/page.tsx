"use client";
import { Card, Table, TableProvider } from "@cubics/quick-tables";

import dummy from "../shared/constants/dummyData.json";
import CardComponent from "../components/CardComponent";

export default function Page() {
  return (
    <TableProvider
      title="CSS"
      // cardHeaderSlot={<p>hello</p>}
      cardComponent={CardComponent}
      data={dummy}
    >
      <Table />
    </TableProvider>
  );
}
