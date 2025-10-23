import { Image, ScrollView, Square, Text, View, XStack, YStack } from "tamagui";
import Container from "../component/container";
import { useEffect, useState } from "react";
import LoadingScreen from "../common/screen/LoadingScreen.";
import { useNavigation } from "expo-router";
import dayjs from "dayjs";
import {
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import textSize from "../constants/textSize";
import Slider from "../component/CSlider";
import runningMan from "../../assets/images/running_man_transparent_bg.png";
import bicepsWithDumbell from "../../assets/images/biceps_with_dumbell.png";
import winnerMan from "../../assets/images/happy_winner_man.png";
import chestIcon from "../../assets/images/chest_icon.png";
import CCard from "../component/CCard";
import colors from "../constants/colors";
import mainTabBarStyle from "../constants/mainTabBarStyle";
import { Shadow } from "react-native-shadow-2";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [thisWeekDates, setThisWeekDates] = useState<string[]>([]);
  const [isMainScrollEnabled, setIsMainScrollEnabled] = useState<boolean>(true);
  const [isSlidedUntilEnd, setIsSlidedUntilEnd] = useState<boolean>(false);
  const [wentToTraining, setWentToTraining] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>();
  const [dayExercises, setDayExercise] = useState<{
    current: number;
    exercise: { name: string; image: ImageSourcePropType }[];
  }>({
    current: 0,
    exercise: [
      {
        image: bicepsWithDumbell,
        name: "Bíceps",
      },
      {
        image: chestIcon,
        name: "Peito",
      },
    ],
  });

  const translateY = useSharedValue(0);
  const navigation = useNavigation();
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const fadeInStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-20, { duration: 2000 }), // move up
      -1,
      true
    );

    opacity.value = withTiming(1, {
      duration: 1500,
      easing: Easing.out(Easing.ease),
    });
  }, []);

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(dayjs().format('HH:mm'))
    }, 1000);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    getThisWeekDates();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: isLoading ? { display: "none" } : { ...mainTabBarStyle },
    });
  }, [isLoading]);

  useEffect(() => {
    if (isSlidedUntilEnd) {
      setIsMainScrollEnabled(true);
      setWentToTraining(true);
    }
  }, [isSlidedUntilEnd]);

  useEffect(() => {
    if (wentToTraining) {
      setTimeout(() => {
        setWentToTraining(false);
      }, 4500);
    }
  }, [wentToTraining]);

  function getThisWeekDates() {
    const todaysWeekDay = dayjs().day();
    const daysBehind = [];
    const daysAfter = [];

    for (let i = 0; i < todaysWeekDay; i++) {
      daysBehind.push(
        dayjs()
          .subtract(i + 1, "days")
          .format("DD/MM")
      );
    }
    for (let ib = 0; ib < 6 - todaysWeekDay; ib++) {
      daysAfter.push(
        dayjs()
          .add(ib + 1, "days")
          .format("DD/MM")
      );
    }
    const allDaysArray = [
      dayjs().format("DD/MM"),
      ...daysBehind,
      ...daysAfter,
    ].sort((a, b) => a.localeCompare(b));
    setThisWeekDates(allDaysArray);
  }

  const showFirstWeekDaysLine = () => {
    return (
      <>
        <YStack>
          <XStack gap={10} justifyContent="center">
            {thisWeekDates.map((element, index) => {
              if (index < 4) {
                return (
                  <YStack key={index} alignItems="center">
                    <Square
                      radiused={true}
                      size={40}
                      backgroundColor={colors.mainBlue}
                    />
                    <Text
                      fontFamily={"jomhuria-regular"}
                      fontSize={textSize.small}
                      marginTop={-10}
                    >
                      {element}
                    </Text>
                  </YStack>
                );
              }
            })}
          </XStack>

          <XStack gap={10} justifyContent="center">
            {thisWeekDates.map((element, index) => {
              if (index > 4) {
                return (
                  <YStack key={index} alignItems="center">
                    <Square
                      radiused={true}
                      size={40}
                      backgroundColor={colors.darkerGray}
                    />
                    <Text
                      fontFamily={"jomhuria-regular"}
                      fontSize={textSize.small}
                      marginTop={-10}
                    >
                      {element}
                    </Text>
                  </YStack>
                );
              }
            })}
          </XStack>
        </YStack>
      </>
    );
  };

  const handlePassExercise = (direction: "backward" | "forward"): void => {
    setDayExercise((prev) => {
      const howManyExercises = prev.exercise.length;
      const currentExerciseNumber = prev.current;
      let newCurrentExercise: number = 0;
      if (direction === "backward" && currentExerciseNumber === 0) {
        newCurrentExercise = howManyExercises - 1;
      } else if (direction === "backward") {
        newCurrentExercise = currentExerciseNumber - 1;
      } else if (
        direction === "forward" &&
        currentExerciseNumber === howManyExercises - 1
      ) {
        newCurrentExercise = 0;
      } else {
        newCurrentExercise = currentExerciseNumber + 1;
      }

      return {
        current: newCurrentExercise,
        exercise: prev.exercise,
      };
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (wentToTraining === true) {
    return (
      <Animated.View
        style={[
          {
            flex: 1,
            alignItems: "center",
          },
          fadeInStyle,
        ]}
      >
        <View>
          <Animated.Image
            source={winnerMan}
            style={[
              {
                width: 400,
                height: 400,
                marginTop: 80,
              },
              animatedStyle,
            ]}
            resizeMode="contain"
          />

          <Text
            style={{
              zIndex: 100,
              color: colors.mainBlack,
              marginTop: -90,
              fontSize: textSize.big,
              fontFamily: "jomhuria-regular",
              textAlign: "center",
            }}
          >
            CONGRATULATIONS!
          </Text>
        </View>
      </Animated.View>
    );
  }

  return (
    <ScrollView scrollEnabled={isMainScrollEnabled}>
        <Animated.View style={fadeInStyle}>
      <Container>
        <YStack style={homeScreenStyle.dateTime}>
          <Text style={homeScreenStyle.date}>
            {dayjs().format("DD/MM/YYYY")}
          </Text>
          <Text style={homeScreenStyle.time}>{currentTime}</Text>
          <View style={homeScreenStyle.sliderView}>
            {!isSlidedUntilEnd ? (
              <Slider
                setIsSlidedUntilEnd={setIsSlidedUntilEnd}
                onSlideStart={() => setIsMainScrollEnabled(false)}
                onSlideEnd={() => setIsMainScrollEnabled(true)}
              />
            ) : (
              <View style={homeScreenStyle.startedExerciseView}>
                <Text style={homeScreenStyle.startedExerciseText}>
                  WENT TRAINING!
                </Text>
              </View>
            )}
          </View>

          <CCard style={homeScreenStyle.weekDaysCard}>
            <YStack>{showFirstWeekDaysLine()}</YStack>
          </CCard>
        </YStack>

        <Image style={homeScreenStyle.runningManImage} source={runningMan} />

        <Shadow
          distance={5}
          startColor={
            dayExercises.current % 2 === 0 ? colors.mainBlue : colors.mainYellow
          }
          endColor={
            dayExercises.current % 2 === 0 ? colors.mainBlue : colors.mainYellow
          }
          offset={[-10, 6]}
        >
          <CCard
            style={{
              ...homeScreenStyle.exercisesCard,
              backgroundColor:
                dayExercises.current % 2 === 0
                  ? colors.mainYellow
                  : colors.mainBlue,
            }}
          >
            <View style={homeScreenStyle.exercisesCardArrows}>
              <TouchableOpacity onPress={() => handlePassExercise("backward")}>
                <AntDesign
                  color={
                    dayExercises.current % 2 === 0
                      ? colors.mainBlue
                      : colors.mainYellow
                  }
                  name="left"
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePassExercise("forward")}>
                <AntDesign
                  color={
                    dayExercises.current % 2 === 0
                      ? colors.mainBlue
                      : colors.mainYellow
                  }
                  name="right"
                  size={20}
                />
              </TouchableOpacity>
            </View>

            <Text
              style={{
                ...homeScreenStyle.exerciseCardText,
                color:
                  dayExercises.current % 2 === 0
                    ? colors.mainBlack
                    : colors.mainWhite,
              }}
            >
              Daily Workout
            </Text>

            <Image
              source={dayExercises.exercise[dayExercises.current]?.image}
              width={250}
              height={250}
              marginBlock={-40}
            />

            <Text
              style={{
                ...homeScreenStyle.exerciseCardText,
                color:
                  dayExercises.current % 2 === 0
                    ? colors.mainBlack
                    : colors.mainWhite,
              }}
            >
              {dayExercises.exercise[dayExercises.current]?.name ?? "--"}
            </Text>
          </CCard>
        </Shadow>

        <TouchableOpacity style={{
          backgroundColor: colors.mainWhite,
          borderRadius: 10,
          width: '90%',
          height: 50,
          marginTop: 20
        }}>
          <Text style={{
            color: colors.mainBlack,
            textAlign: 'center',
            margin: 'auto',
            fontFamily: 'jomhuria-regular',
            fontSize: textSize.small
          }}>Exercises</Text>
        </TouchableOpacity>
      </Container>
        </Animated.View>
    </ScrollView>
  );
}

const homeScreenStyle = StyleSheet.create({
  date: {
    fontSize: textSize.regular,
    fontFamily: "jomhuria-regular",
  },
  time: {
    fontSize: textSize.regular,
    fontFamily: "jomhuria-regular",
    marginTop: -40,
  },
  dateTime: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  sliderView: {
    marginTop: 20,
  },
  startedExerciseView: {
    backgroundColor: colors.mainBlue,
    borderRadius: 10,
    height: 50,
    width: 250,
  },
  startedExerciseText: {
    textAlign: "center",
    color: colors.mainWhite,
    margin: "auto",
    fontFamily: "jomhuria-regular",
    fontSize: textSize.small,
  },
  runningManImage: {
    width: 400,
    height: 400,
    zIndex: 1,
    marginTop: -50,
  },
  weekDaysCard: {
    zIndex: 10,
    marginTop: 40,
    padding: 10,
    paddingBottom: 1,
    borderRadius: 10,
    backgroundColor: colors.mainGray,
    width: "90%",
  },
  exercisesCard: {
    position: "relative",
    backgroundColor: colors.mainYellow,
    zIndex: 10,
    marginTop: -30,
    padding: 10,
    paddingBottom: 1,
    borderRadius: 10,
    minHeight: 300,
    maxHeight: "100%",
  },
  exercisesCardArrows: {
    zIndex: 10,
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 9,
    right: 0,
    margin: "auto",
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  exerciseCardText: {
    textAlign: "center",
    fontFamily: "jomhuria-regular",
    fontSize: textSize.regular,
  },
});
