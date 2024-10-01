"use client";
import { Card, CardComponentProps } from "@cubics/quick-tables";
import dummy from "../shared/constants/dummyData.json";

type Dummy = (typeof dummy)[number];

export default function CardComponent({
  value,
  selected,
}: CardComponentProps<Dummy>) {
  return <Card sx={{ background: selected ? "gray" : "" }}>{value.email}</Card>;
}
