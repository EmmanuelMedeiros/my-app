import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { Slider, Text, XStack, SliderProps } from "tamagui";
import { AntDesign } from "@expo/vector-icons";
import colors from "../constants/colors";
import textSize from "../constants/textSize";

interface CSliderProps extends SliderProps {
  setIsSlidedUntilEnd: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CSlider(props: CSliderProps) {
  const [value, setValue] = useState([0]);
  const animatedValue = useRef(new Animated.Value(50)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (val: number[]) => {
    setValue(val);
    animatedValue.setValue(val[0]);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (val[0] < 100) {
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 700,
          useNativeDriver: false,
        }).start(() => {
          setValue([0]);
        });
      }
    }, 300) as any;
  };

  useEffect(() => {
    const listenerId = animatedValue.addListener(({ value }) => {
      setValue([Math.round(value)]);
    });
    return () => animatedValue.removeListener(listenerId);
  }, []);

  useEffect(() => {
    if (value[0] === 100) {
      props.setIsSlidedUntilEnd(true);
    }
  }, [value]);

  return (
    <XStack alignItems="center">
      <Slider
        size={10}
        width={250}
        max={100}
        step={1}
        value={value}
        onValueChange={handleChange}
        onSlideEnd={props.onSlideEnd}
        onSlideStart={props.onSlideStart}
      >
        <Slider.Track backgroundColor="#e0e0e0" height={50} borderRadius={9999}>
          <Slider.TrackActive backgroundColor="#1e35caff" borderRadius={9999} />
        </Slider.Track>

        <Slider.Thumb
          circular
          index={0}
          backgroundColor="#1e35caff"
          size={50}
          elevation={3}
          flex={1}
          alignItems="center"
          justifyContent="center"
        >
          <AntDesign name="right" size={25} color={"white"} />
        </Slider.Thumb>
      </Slider>

      <Text
        color={colors.mainBlack}
        opacity={0.2}
        fontSize="$5"
        position="absolute"
        right={76}
        style={{
          fontFamily: "jomhuria-regular",
          fontSize: textSize.small,
        }}
      >
        Goin' to train today?
      </Text>

      <Text
        color={colors.mainGreen}
        fontSize="$5"
        position="absolute"
        right={30}
        style={{
          fontFamily: "jomhuria-regular",
          fontSize: textSize.small,
        }}
      >
        YES!
      </Text>
    </XStack>
  );
}
