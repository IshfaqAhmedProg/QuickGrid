"use client";
import { Card, CellTypeProps } from "@cubics/quick-grid";
import dummy from "../shared/constants/dummyData.json";

export type Dummy = (typeof dummy)[number];

export default function CardComponent({
  value,
  selected,
}: CellTypeProps<Dummy>) {
  return <Card sx={{ background: selected ? "gray" : "" }}>{value.email}</Card>;
}
