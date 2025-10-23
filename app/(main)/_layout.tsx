import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import colors from "../constants/colors";
import mainTabBarStyle from "../constants/mainTabBarStyle";
import { FontAwesome } from "@expo/vector-icons";

export default function TabLayout() {

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: colors.mainBlue,
        tabBarButton: HapticTab,
        headerShown: false,
        tabBarStyle: { ...mainTabBarStyle },
      }}
    >
      <Tabs.Screen options={{
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          return(
            <FontAwesome size={25} color={focused ? colors.mainBlack : colors.darkerGray} name="gear" />
          )
        }
      }} name="config" />
      
      <Tabs.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return <FontAwesome size={25} color={focused ? colors.mainBlack : colors.darkerGray} name="home" />;
          },
        }}
        name="home"
      />
    </Tabs>
  );
}
