import React from "react";
import { Typograph } from "../../Components/Commom";
import { PropsTransaction } from "../../Home";

import { Card as CardStyled, Header } from "../styles";
import { ContentCard } from "./ContentCard";

interface PropsCard {
  item?: (PropsTransaction | undefined)[];
  total?: number;
  positive?: number;
  negative?: number;
  scaleY: any;
  opacity: any;
  opacityCard: any;
}

const monthNames = [
  "JANEIRO",
  "FEVEREIRO",
  "MARÇO",
  "ABRIL",
  "MAIO",
  "JUNHO",
  "JULHO",
  "AGOSTO",
  "SETEMBRO",
  "OUTUBRO",
  "NOVEMBRO",
  "DEZEMBRO",
];

export const Card: React.FC<PropsCard> = ({
  item,
  total,
  positive,
  negative,
  scaleY,
  opacity,
  opacityCard,
}) => {
  const DATE =
    (item &&
      item[0] &&
      item[0]?.createdAt.seconds * 1000 +
        item[0]?.createdAt.nanoseconds / 1000000) ||
    new Date();
  const monthNumber = new Date(DATE).getMonth();
  return (
    <CardStyled
      style={{
        transform: [{ scaleY }],
        opacity: opacityCard,
      }}
    >
      <Header>
        <Typograph weight="800">
          {monthNames[monthNumber] + " - " + new Date(DATE).getFullYear()}
        </Typograph>
      </Header>
      <ContentCard
        opacity={opacity}
        total={total}
        positive={positive}
        negative={negative}
      />
    </CardStyled>
  );
};
