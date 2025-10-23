import React, { useEffect, useState } from "react";
import {
  Stack,
  XStack,
  YStack,
  Text,
  Button,
  Checkbox,
  ScrollView,
  Sheet,
  Adapt,
} from "tamagui";
import textSize from "../constants/textSize";
import { FlatList } from "react-native";

interface SelectProps {
  options: { id: number; label: string }[];
  setSelected: any;
  selected: any;
}

const CSelect = ({ options, setSelected, selected }: SelectProps) => {
  const toggleOption = (id: any) => {
    setSelected((prev: any) =>
      prev.includes(id)
        ? prev.filter((item: any) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <YStack
      style={{
        padding: 20,
      }}
    >
      <YStack
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$4"
        width={250}
        maxHeight={300}
        overflow="hidden"
      >
        <FlatList
          data={options}
          keyExtractor={(item) => (item.id.toString())}
          renderItem={({ item }) => {
            return (
              <XStack
                padding="$3"
                gap="$3"
                borderBottomWidth={1}
                justifyContent="center"
                alignItems="center"
                borderBottomColor="$borderColor"
                onPress={() => toggleOption(item.id)}
                hoverStyle={{ backgroundColor: "$color2" }}
                backgroundColor={
                  selected.includes(item.id as never)
                    ? "$color2"
                    : "transparent"
                }
              >
                <Checkbox
                  size="$5"
                  checked={selected.includes(item.id as never)}
                  onCheckedChange={() => toggleOption(item.id)}
                  pointerEvents="none"
                />
                <Text
                  style={{
                    fontFamily: "jomhuria-regular",
                    fontSize: textSize.small,
                  }}
                  flex={1}
                >
                  {item.label}
                </Text>
              </XStack>
            );
          }}
        />
      </YStack>

      {selected.length > 0 && (
        <Button size="$3" onPress={() => setSelected([])} variant="outlined">
          Clear Selection
        </Button>
      )}
    </YStack>
  );
};

export default CSelect;
