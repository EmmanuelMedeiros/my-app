import loginImage from "../../assets/images/login_image.png";
import Container from "../component/container";
import { Button, Form, H1, H6, Image, Paragraph, Text } from "tamagui";
import CInput from "../component/CInput";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import colors from "../constants/colors";
import textSize from "../constants/textSize";

import * as Network from "expo-network";
import { useFocusEffect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import authApi, { LoginDTO } from '../services/auth';
import { getStoreData, storeData } from "../utils/asyncStorage";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [yRotation, setYRotation] = useState<boolean>(false);
  const [showNotConnectedError, setShowNotConnectedError] =
    useState<boolean>(false);

  const route = useRouter();

  useFocusEffect(() => {
     checkUserToken()
  });

  useEffect(() => {
    if (showNotConnectedError) {
      setTimeout(() => {
        setShowNotConnectedError(false);
      }, 4000);
    }
  }, [showNotConnectedError]);

  async function checkUserToken() {
    const jwtToken = await getStoreData<string>("userJWT");
    if (!jwtToken) {
      return;
    }
    route.replace('/(main)/config')
  }

  const handleGoToSignupScreen = () => {
    route.push("/(auth)/signup");
  };

  function createLoginDTO(): LoginDTO | null {
    if (!email || !password) {
      alert("You need to pass e-mail and password in order to login")
      return null;
    }
    return { email, password};
  }

  const handleLogin = async () => {
    const isConnected = await getNetworkConnectionState();
    if (!isConnected) {
      setShowNotConnectedError(true);
      return;
    }
    try {
      setIsLoading(true);
      const loginDTO = createLoginDTO();
      if (!loginDTO) {
        return;
      }
      const loginResponse = await authApi.login(loginDTO);
      storeData("userJWT", loginResponse.data.jwt);
      route.replace("/(main)/config");
    } catch (err) {
      alert("Error while trying to login")
      console.log(err);
    } finally {
      setIsLoading(false);
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
          <CInput autoCapitalize="none" onChangeText={setEmail} placeholder="Email" />
          <CInput autoCapitalize="none" onChangeText={setPassword} placeholder="Password" />

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
