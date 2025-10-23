import { StyleSheet } from "react-native"
import { Input, InputProps } from "tamagui"
import colors from "../constants/colors"

interface InputWrapperProps extends InputProps {}

export default function CInput(props: InputWrapperProps) {
  return(
    <Input
      style={InputWrapperStyles.input}
      {...props}
    />
  )
}

const InputWrapperStyles = StyleSheet.create({
  input: {
    borderColor: colors.mainBlack
  }
})