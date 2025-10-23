import { Stack } from "expo-router";

export default function AuthLayout() {
  return(
    <Stack initialRouteName="login" screenOptions={ { headerShown: false } }>
      <Stack.Screen name="login" options={{ gestureEnabled: true }} />
      <Stack.Screen name="signup"  options={{ gestureEnabled: true }} />
    </Stack>
  )
}