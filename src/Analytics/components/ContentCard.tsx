import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Typograph } from "../../Components/Commom";
import { Circle } from "../../NewTransaction/styles";

import { Border, CardType, Content } from "../styles";

interface PorpsContentCard {
  positive?: number;
  negative?: number;
  total?: number;
  opacity: any;
}

export const ContentCard: React.FC<PorpsContentCard> = ({
  positive,
  negative,
  total,
  opacity,
}) => {
  return (
    <Content style={{ opacity }}>
      <Typograph
        size={20}
        weight="700"
        color="#999"
        style={{ alignSelf: "center" }}
      >
        R$ {total},00
      </Typograph>
      <Border borderB />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CardType>
          <Circle>
            <Icon size={25} name="add" color="#3cb371" />
          </Circle>
          <Typograph weight="700" color="#999" top={10}>
            R$ {positive},00
          </Typograph>
        </CardType>
        <Border borderL />
        <CardType>
          <Circle>
            <Icon size={25} name="remove" color="#B22222" />
          </Circle>
          <Typograph weight="700" color="#999" top={10}>
            R$ {negative},00
          </Typograph>
        </CardType>
      </View>
    </Content>
  );
};
