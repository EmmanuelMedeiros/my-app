import loginImage from "../../assets/images/login_image.png";
import Container from "../component/container";
import { Button, Form, H1, H6, Image, Paragraph, Text } from "tamagui";
import CInput from "../component/CInput";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import colors from "../constants/colors";
import textSize from "../constants/textSize";

import * as Network from "expo-network";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [yRotation, setYRotation] = useState<boolean>(false);
  const [showNotConnectedError, setShowNotConnectedError] =
    useState<boolean>(false);

  const route = useRouter();

  useEffect(() => {
    if (showNotConnectedError) {
      setTimeout(() => {
        setShowNotConnectedError(false);
      }, 4000);
    }
  }, [showNotConnectedError])

  const handleGoToSignupScreen = () => {
    route.push("/(auth)/signup");
  };

  const handleLogin = async () => {
    const isConnected = await getNetworkConnectionState();
    if (!isConnected) {
      setShowNotConnectedError(true);
      return;
    }
    setIsLoading(true);
    if (email && password) {
      setTimeout(() => {
        route.replace("/(main)/home");
      }, 2000);
      return;
    }
  };

  async function getNetworkConnectionState() {
    const state = await Network.getNetworkStateAsync();
    return state.isConnected;
  }

  if (showNotConnectedError) {
    return (
      <Container>
        <Feather name="wifi-off" size={30} />
        <Text
          style={{
            fontFamily: "jomhuria-regular",
            fontSize: textSize.small,
            textAlign: "center",
          }}
        >
          WI-FI Connection is a must to continue from here!
        </Text>
      </Container>
    );
  }

  return (
    <Container>
      <KeyboardAvoidingView behavior="position">
        <Image
          source={loginImage}
          width={300}
          height={400}
          marginTop={-40}
          rotateY={yRotation ? "0deg" : "180deg"}
        />
        <H1
          onPress={() => setYRotation((prev) => !prev)}
          style={LoginStyles.loginText}
        >
          Login
        </H1>

        <Form style={LoginStyles.form} onSubmit={handleLogin}>
          <CInput onChangeText={setEmail} placeholder="Email" />
          <CInput onChangeText={setPassword} placeholder="Password" />

          <Form.Trigger asChild>
            <Button
              style={LoginStyles.formButton}
              icon={
                isLoading ? (
                  <ActivityIndicator color={colors.mainWhite} />
                ) : null
              }
            >
              <H6 style={LoginStyles.formButtonText}>Submit</H6>
            </Button>
          </Form.Trigger>
        </Form>

        <Paragraph style={LoginStyles.paragraph}>
          Do not have an account yet?{" "}
          <Paragraph
            onPress={handleGoToSignupScreen}
            style={LoginStyles.innerParagraph}
          >
            SIGN UP here
          </Paragraph>
        </Paragraph>
      </KeyboardAvoidingView>
    </Container>
  );
}

const LoginStyles = StyleSheet.create({
  loginText: {
    marginTop: -80,
    marginBottom: 20,
    fontSize: textSize.superBig,
    fontFamily: "jomhuria-regular",
    userSelect: "none",
  },
  form: {
    gap: 10,
  },
  formButton: {
    backgroundColor: colors.mainBlack,
    marginTop: 10,
    height: 60,
  },
  formButtonText: {
    color: colors.mainWhite,
    fontFamily: "jomhuria-regular",
    fontSize: textSize.regular,
    userSelect: "none",
  },
  paragraph: {
    textAlign: "center",
    fontFamily: "jomhuria-regular",
    fontSize: textSize.small,
    userSelect: "none",
  },
  innerParagraph: {
    color: colors.mainBlue,
    fontFamily: "jomhuria-regular",
    fontSize: textSize.small,
    userSelect: "none",
  },
});
