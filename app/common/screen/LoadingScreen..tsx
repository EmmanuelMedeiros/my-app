import Container from "@/app/component/container";
import Lottie from 'lottie-react-native';
import blueLoading from '../../../assets/lottie/blue_loading.json';
import { StyleSheet } from "react-native";
import { Text } from "tamagui";
import textSize from "@/app/constants/textSize";

export default function LoadingScreen() {
  return(
    <Container>
      <Lottie
        source={blueLoading}
        autoPlay={true}
        style={LoadingScreenStyle.loading}
        loop={true}
        speed={.3}
      />
      <Text style={LoadingScreenStyle.loadingText}>Carregando...</Text>
    </Container>
  )
}

const LoadingScreenStyle = StyleSheet.create({
  loading: {
    width: 500,
    height: 500,
    marginTop: 40,
  },
  loadingText: {
    fontSize: textSize.big,
    fontFamily: "jomhuria-regular",
    marginTop: -130
  }
})