import {
  Button,
  Form,
  FormTrigger,
  Image,
  ScrollView,
  Text,
  View,
  YStack,
} from "tamagui";
import Container from "../component/container";
import womanWating from "../../assets/images/woman_waiting.png";
import CSelect from "../component/CSelect";
import CButton from "../component/CButton";
import colors from "../constants/colors";
import textSize from "../constants/textSize";
import { ActivityIndicator, BackHandler, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import CDialog from "../component/CDialog";
import { useEffect, useState } from "react";
import { WeekDay, englishWeekDayList } from "../utils/weekDaysList";
import { useRouter } from "expo-router";
import { showTimePicker } from "../utils/showTimePicker";
import dayjs from "dayjs";

export default function ConfigScreen() {
  const [openNotificationDialog, setOpenNotificationDialog] =
    useState<boolean>(false);
  const [openWorkoutFrequencyDialog, setOpenWorkoutFrequencyDialog] =
    useState<boolean>(false);
  const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);
  const [choosenWeekDays, setChoosenWeekDays] = useState<WeekDay[]>([]);
  const [selectedTime, setSelectedTime] = useState<Date>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (openNotificationDialog || openWorkoutFrequencyDialog) {
        setOpenNotificationDialog(false);
        setOpenWorkoutFrequencyDialog(false);
        return true;
      }
      setOpenNotificationDialog(false);
      setOpenWorkoutFrequencyDialog(false);
      router.replace("/(main)/home");
      return true;
    });
  }, []);

  const onHandleConfirmWeekDays = () => {
    const choosenWeekDays = selectedWeekDays.map((element) => {
      return englishWeekDayList.find((x) => x.id === element);
    });
    setChoosenWeekDays(choosenWeekDays as any);
  };

  const onHandleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(main)/home');
    }, 2000);
  }

  return (
    <ScrollView>
      <Container>
        <Image src={womanWating} width={300} height={300} />

        <Form
          style={{
            width: "100%",
            gap: 5,
          }}
          onSubmit={onHandleSubmit}
        >
          <View>
            <Text style={configStyles.buttonsText}>
              Weekly workout frequency
            </Text>
            <CButton
              title={choosenWeekDays
                .map((element) => `${element.label.substring(0, 3)}.`)
                .join(", ")}
              textAlign="left"
              borderColor={colors.mainBlack}
              hasBackground={false}
              onPress={() => setOpenWorkoutFrequencyDialog(true)}
              icon={
                <FontAwesome
                  name="sort-down"
                  style={{ position: "absolute", right: 20 }}
                />
              }
            />
          </View>

          <View style={{ marginTop: -12 }}>
            <Text style={configStyles.buttonsText}>
              Notification Time
            </Text>
            <CButton
              title={ selectedTime ? dayjs(selectedTime).format('HH:mm').concat('h') : 'Choose your time'}
              textAlign="left"
              borderColor={colors.mainBlack}
              hasBackground={false}
              onPress={() => showTimePicker(setSelectedTime)}
              icon={
                <FontAwesome
                  name="sort-down"
                  style={{ position: "absolute", right: 20 }}
                />
              }
            />
          </View>
          <FormTrigger asChild>
            <CButton
              textAlign="center"
              title={isLoading ? "" : "Salvar"}
              marginTop={20}
              textColor={colors.mainWhite}
              hasBackground={true}
              backgroundColor={colors.mainBlack}
              icon={isLoading ? <ActivityIndicator color={"white"} /> : null}
            />
          </FormTrigger>
        </Form>

        <CDialog
          setOpen={setOpenWorkoutFrequencyDialog}
          open={openWorkoutFrequencyDialog}
          onOk={onHandleConfirmWeekDays}
          component={
            <View>
              <Text
                style={{
                  fontFamily: "jomhuria-regular",
                  fontSize: textSize.regular,
                  textAlign: "center",
                }}
              >
                Select your workout weekly frequency
              </Text>
              <CSelect
                selected={selectedWeekDays}
                setSelected={setSelectedWeekDays}
                options={englishWeekDayList}
              />
            </View>
          }
        />
      </Container>
    </ScrollView>
  );
}

const configStyles = StyleSheet.create({
  buttonsText: {
    fontFamily: "jomhuria-regular",
    fontSize: textSize.small,
    marginBottom: -9,
  },
});
