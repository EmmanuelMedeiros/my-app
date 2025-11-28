import { Form, FormTrigger, Image, ScrollView, Text, View } from "tamagui";
import Container from "../component/container";
import womanWating from "../../assets/images/woman_waiting.png";
import CSelect from "../component/CSelect";
import CButton from "../component/CButton";
import colors from "../constants/colors";
import textSize from "../constants/textSize";
import { ActivityIndicator, BackHandler, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import CDialog from "../component/CDialog";
import { useCallback, useEffect, useState } from "react";
import {
  WeekDay,
  englishWeekDayList,
} from "../utils/weekDaysList";
import { useFocusEffect, useRouter } from "expo-router";
import { showTimePicker } from "../utils/showTimePicker";
import userNotificationApi, {
  CreateUserNotificationFrequencyDTO,
} from "../services/userNotification";
import dayjs from "dayjs";
import { UserNotificationFrequency } from "../domain/userNotificationFrequency";

export default function ConfigScreen() {
  const [openNotificationDialog, setOpenNotificationDialog] =
    useState<boolean>(false);
  const [openWorkoutFrequencyDialog, setOpenWorkoutFrequencyDialog] =
    useState<boolean>(false);
  const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);
  const [choosenWeekDays, setChoosenWeekDays] = useState<WeekDay[]>([]);
  const [selectedTime, setSelectedTime] = useState<Date>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userFrequency, setUserFrequency] =
    useState<UserNotificationFrequency>();

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

    getUserFrequency();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getUserFrequency();
    }, [])
  );

  async function getUserFrequency() {
    try {
      setIsLoading(true);
      const response = await userNotificationApi.getByUser();
      setUserFrequency(response.data);
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  const translateUserFrequencyWeekdays = () => {
    const weekDaysToArray = userFrequency?.weekDays.split(',');
    return weekDaysToArray?.reduce((acc, current) => {
      const week = englishWeekDayList.find(w => w.id === Number(current));
      acc.length === 0 ? acc += `${week?.label.substring(0, 3)}.` : acc += `, ${week?.label.substring(0, 3)}`

      return acc;
    }, '')
  };

  const onHandleConfirmWeekDays = () => {
    const choosenWeekDays = selectedWeekDays.map((element) => {
      return englishWeekDayList.find((x) => x.id === element);
    });
    setChoosenWeekDays(choosenWeekDays as any);
  };

  function generateCreateUserNotificationFrequencyDTO(): CreateUserNotificationFrequencyDTO | null {
    if (!choosenWeekDays || !selectedTime) {
      return null;
    }
    const weekDays = choosenWeekDays.map((w) => w.id.toString());
    return {
      hour: dayjs(selectedTime).format("HH:mm"),
      weekDays: weekDays.join(","),
    };
  }

  const onHandleSubmit = async () => {
    try {
      setIsLoading(true);
      const createUserNotificationFrequencyDTO =
        generateCreateUserNotificationFrequencyDTO();
      if (!createUserNotificationFrequencyDTO) {
        return;
      }
      await userNotificationApi.create(createUserNotificationFrequencyDTO);
      router.replace("/(main)/home");
    } catch (err: any) {
      console.log(err.response);
    } finally {
      setIsLoading(false);
    }
  };

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
                .join(", ") ?? translateUserFrequencyWeekdays()}
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
            <Text style={configStyles.buttonsText}>Notification Time</Text>
            <CButton
              title={
                selectedTime
                  ? dayjs(selectedTime).format("HH:mm").concat("h")
                  : "Choose your time"
              }
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
