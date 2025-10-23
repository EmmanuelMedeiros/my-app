import React from "react";
import { CardProps, YStack } from "tamagui";

interface CCardProps extends CardProps {}

export default function CCard({ children, ...props }: CCardProps) {
  return (
    <YStack
      {...props}
    >
      { children }
    </YStack>
  )
}