import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { YStack } from "tamagui";

export default function Container({ children }: React.PropsWithChildren) {
  return(
    <YStack
      style={containerStyle.container}
    >
      { children }
    </YStack>
  )
}

const containerStyle = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
})