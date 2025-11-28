import signupImage from "../../assets/images/signup_image.png";
import Container from "../component/container";
import { Button, Form, H1, H6, Image, Paragraph } from "tamagui";
import CInput from "../component/CInput";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../constants/colors";
import textSize from "../constants/textSize";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { SignupDTO } from "../services/auth";
import { useState } from "react";
import authApi from "../services/auth";

export default function LoginScreen() {
  const route = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordConf, setPasswordConf] = useState<string>();

  const handleGoToLoginScreen = () => {
    route.dismissTo("/(auth)/login");
  };

  function generateSignupDTO(): SignupDTO | null {
    if (!email || !password || !passwordConf) {
      alert("You need to pass e-mail and password in order to signup")
      return null;
    }
    if (password !== passwordConf) {
      alert("Password don't match")
      return null;
    }

    return { email, password }
  }

  const handleSubmit = async () => {
    try {
      const signupDTO = generateSignupDTO();
      if (!signupDTO) {
        return;
      }
      await authApi.signup(signupDTO);
      route.replace('/login');
    } catch (err: any) {
      console.log(err.response.data);
      alert("Error while trying to signup")
    }
  };

  return (
    <Container>
      <KeyboardAvoidingView behavior="position">
        <TouchableOpacity
          onPress={handleGoToLoginScreen}
          style={LoginStyles.backButton}
        >
          <AntDesign name="left" size={20} />
        </TouchableOpacity>

        <Image source={signupImage} width={300} marginTop={-80} height={400} />
        <H1 style={LoginStyles.loginText}>Signup</H1>

        <Form style={LoginStyles.form} onSubmit={handleSubmit}>
          <CInput autoCapitalize="none" onChangeText={setEmail} placeholder="Email" />
          <CInput autoCapitalize="none" onChangeText={setPassword} placeholder="Password" />
          <CInput autoCapitalize="none" onChangeText={setPasswordConf} placeholder="Password Confirmation" />

          <Form.Trigger asChild>
            <Button style={LoginStyles.formButton}>
              <H6 style={LoginStyles.formButtonText}>Submit</H6>
            </Button>
          </Form.Trigger>
        </Form>

        <Paragraph style={LoginStyles.paragraph}>
          Already has an account? Then{" "}
          <Paragraph
            onPress={handleGoToLoginScreen}
            style={LoginStyles.innerParagraph}
          >
            LOGIN here
          </Paragraph>
        </Paragraph>
      </KeyboardAvoidingView>
    </Container>
  );
}

const LoginStyles = StyleSheet.create({
  loginText: {
    marginTop: -90,
    marginBottom: 20,
    fontSize: textSize.superBig,
    fontFamily: "jomhuria-regular",
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
  },
  paragraph: {
    textAlign: "center",
    fontFamily: "jomhuria-regular",
    fontSize: textSize.small,
  },
  innerParagraph: {
    color: colors.mainBlue,
    fontFamily: "jomhuria-regular",
    fontSize: textSize.small,
  },
  backButton: {
    position: "absolute",
    top: 20,
    padding: 5,
    zIndex: 10,
  },
});
