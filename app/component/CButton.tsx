import { Button, ButtonProps, Text, View } from "tamagui";
import colors from "../constants/colors";
import { FontAwesome } from "@expo/vector-icons";

interface CButtonProps extends ButtonProps {
  textColor?: string;
  title?: string;
  hasBackground?: boolean;
}

export default function CButton(props: CButtonProps) {
  return (
    <View>
      <Button
        position="relative"
        {...props}
        backgroundColor={
          !props.hasBackground
            ? "rgba(0, 0, 0, 0.0)"
            : props.backgroundColor ?? colors.mainBlack
        }
      >
        <Text
          style={[{
            textAlign: props.textAlign,
            color: props.textColor ?? colors.mainBlack,
            position: "absolute",
            //left: 10,
            //right: 40
          }, (props.textAlign === 'left' ? { left: 10 } : props.textAlign === 'right' ? { right: 10 } : {})]}
        >
          {props.title}
        </Text>
      </Button>
    </View>
  );
}
