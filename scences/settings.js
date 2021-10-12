import {
  React,
  useSelector,
  useDispatch,
  useState,
  useEffect,
  localize,
  nativeElement,
  primaryColor,
  secondaryColor,
  globalStyle,
  validator,
  Loader,
  AsyncStorage,
} from "../utils/allImports";
import { useTranslation } from "react-i18next";
import {
  View,
  useWindowDimensions,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import SnakeAlert from "../utils/alertClass";
import Header from "../components/header";
import { readSettings, updateSettings } from "../redux/actions/settings";
export default function Customers({ navigation }) {
  const authReducer = useSelector((state) => state.AuthReducer);
  const settingsReducer = useSelector((state) => state.settingsReducer);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const dispatch = useDispatch();
  const [showSnake, setShowSnake] = useState("");
  const [classType, setClassType] = useState("green");
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    branch: "",
    // copies_number: null,
    language: localize.language,
    isArabic: false,
  });
  useEffect(() => {
    let timeout;
    if (showSnake !== "") {
      timeout = setTimeout(() => {
        setShowSnake("");
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [showSnake]);
  const [validation, setValidation] = useState({
    phone: {
      message: "",
    },
    email: {
      message: "",
    },
    // copies_number: {
    //   message: "",
    // },
  });
  useEffect(() => {
    dispatch(readSettings(authReducer.token))
      .then((res) => {
        if (res.status === 200) {
          setFormData({
            ...formData,
            phone: res.data.data.phone,
            email: res.data.data.email,
            // copies_number: res.data.data.copies_number.toString(),
            branch: res.data.data.branch,
            language: res.data.data.language,
            isArabic: res.data.data.language === "en" ? false : true,
          });
        }
      })
      .catch((err) => console.error(err));
  }, []);
  const styles = globalStyle();
  const { t } = useTranslation();
  if (authReducer.loading || settingsReducer.loading) {
    return <Loader bgc={secondaryColor} color={primaryColor} />;
  } else {
    return (
      <View styles={styles.container}>
        <Header
          headerText={"settings"}
          navigation={navigation}
          iconType={"settings"}
        />
        {/* <View></View> */}
        <View
          style={[
            styles.flexCenter,
            { margin: 25 },
            styles.responsiveDirection,
          ]}
        >
          <Text style={{ color: classType }}>{showSnake}</Text>
        </View>
        <ScrollView
          style={[
            {
              paddingTop: windowHeight * 0.01,
              paddingHorizontal: 20,
              width: "100%",
            },
          ]}
        >
          <View
            style={[
              styles.flexBetween,
              styles.responsiveDirection,
              { flexWrap: "wrap", alignItems: "center" },
            ]}
          >
            <nativeElement.Input
              disabled
              leftIcon={
                <nativeElement.Icon name="email" size={25} color="#4E7D9B" />
              }
              // rightIcon={
              //   <nativeElement.Icon
              //     name="close"
              //     size={25}
              //     onPress={() => setFormData({ ...formData, email: "" })}
              //   />
              // }
              // label="Email"
              inputStyle={styles.responsiveTextDirection}
              placeholder={t("email")}
              errorMessage={validation.email.message}
              inputContainerStyle={[
                styles.responsiveDirection,
                styles.AuthInputContainerStyle,
              ]}
              containerStyle={{
                width: windowWidth * 0.45,
                justifyContent: "center",
              }}
              value={formData.email}
              onChangeText={(text) => {
                setFormData({ ...formData, email: text });
                setValidation({
                  ...validation,
                  email: {
                    ...validation.email,
                    message:
                      !validator.isEmail(text) && text.length > 0
                        ? t("emailShouldBeValid")
                        : text.length === 0
                        ? t("emailRequired")
                        : "",
                  },
                });
              }}
            />

            <nativeElement.Input
              leftIcon={
                <nativeElement.Icon name="dialpad" size={25} color="#4E7D9B" />
              }
              rightIcon={
                <nativeElement.Icon
                  name="close"
                  size={25}
                  onPress={() => setFormData({ ...formData, phone: "" })}
                />
              }
              // label="Email"
              inputStyle={styles.responsiveTextDirection}
              placeholder={t("phoneNumber")}
              errorMessage={validation.phone.message}
              inputContainerStyle={[
                styles.responsiveDirection,
                styles.AuthInputContainerStyle,
              ]}
              keyboardType="number-pad"
              returnKeyType="done"
              containerStyle={{
                width: windowWidth * 0.45,
                justifyContent: "center",
              }}
              value={formData.phone}
              onChangeText={(text) => {
                setFormData({ ...formData, phone: text });
                setValidation({
                  ...validation,
                  phone: {
                    ...validation.phone,
                    message:
                      !validator.isNumeric(text) && text.length > 0
                        ? t("PhoneNumberMustBeNumbers")
                        : text.length < 10 && text.length > 0
                        ? t("PhoneNumberShouldntBeLessThantenNumbers")
                        : text.length === 0
                        ? t("PhoneNumberRequired")
                        : "",
                  },
                });
              }}
            />
            {/* <nativeElement.Input
              disabled
              inputStyle={[
                styles.responsiveTextDirection,
                { paddingVertical: 11 },
              ]}
              placeholder={t("branchAssignedTo")}
              inputContainerStyle={[
                styles.responsiveDirection,
                styles.AuthInputContainerStyle,
              ]}
              containerStyle={{
                width: windowWidth * 0.45,
                justifyContent: "center",
              }}
              value={formData.branch}
            /> */}
            {/* <nativeElement.Input
              leftIcon={
                <nativeElement.Icon name="dialpad" size={25} color="#4E7D9B" />
              }
              rightIcon={
                <nativeElement.Icon
                  name="close"
                  size={25}
                  onPress={() =>
                    setFormData({ ...formData, copies_number: "" })
                  }
                />
              }
              // label="Email"
              inputStyle={styles.responsiveTextDirection}
              placeholder={t("numberOfCopiesToPrint")}
              errorMessage={validation.copies_number.message}
              inputContainerStyle={[
                styles.responsiveDirection,
                styles.AuthInputContainerStyle,
              ]}
              maxLength={2}
              keyboardType="number-pad"
              returnKeyType="done"
              containerStyle={{
                width: windowWidth * 0.45,
                justifyContent: "center",
              }}
              value={formData.copies_number}
              onChangeText={(text) => {
                setFormData({ ...formData, copies_number: text });
                setValidation({
                  ...validation,
                  copies_number: {
                    ...validation.copies_number,
                    message:
                      !validator.isNumeric(text) && text.length > 0
                        ? t("numberOfCopiesToPrintMustBeNumbers")
                        : text.length === 0
                        ? t("numberOfCopiesToPrintRequired")
                        : "",
                  },
                });
              }}
            /> */}
            <View
              style={[
                styles.flexStart,
                { width: "45%", paddingHorizontal: 10 },
              ]}
            >
              <Text
                style={[
                  styles.responsiveTextDirection,
                  { color: primaryColor, fontSize: 17 },
                ]}
              >
                English
              </Text>
              <nativeElement.Switch
                value={formData.isArabic}
                color={primaryColor}
                onChange={() =>
                  setFormData({
                    ...formData,
                    isArabic: !formData.isArabic,
                    language: formData.isArabic ? "ar" : "en",
                  })
                }
                style={{ marginHorizontal: 20 }}
              />
              <Text
                style={[
                  styles.responsiveTextDirection,
                  { color: primaryColor, fontSize: 17 },
                ]}
              >
                العربية
              </Text>
            </View>

            <View
              style={{
                width: "47%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <KeyboardAvoidingView
                style={[
                  styles.flexCenter,
                  { width: "100%", marginVertical: 35 },
                ]}
              >
                <nativeElement.Button
                  title={t("save")}
                  onPress={() => {
                    dispatch(
                      updateSettings(authReducer.token, {
                        phone: formData.phone,
                        // copies_number: formData.copies_number,
                        language: formData.isArabic === false ? "en" : "ar",
                      })
                    )
                      .then((res) => {
                        console.log(res);
                        if (res.status === 200) {
                          setShowSnake(t("dataUpdatedSuc"));
                          setClassType("green");
                          if (formData.isArabic === false) {
                            localize.changeLanguage("en");
                            AsyncStorage.setItem("lang", "en");
                          } else {
                            localize.changeLanguage("ar");
                            AsyncStorage.setItem("lang", "ar");
                          }
                        } else {
                          setShowSnake(t("somethingWrongHappen"));
                          setClassType("red");
                        }
                      })
                      .catch((err) => {});
                  }}
                  disabled={
                    validation.phone.message.length > 0 ||
                    // validation.copies_number.message.length > 0 ||
                    // formData.copies_number === null ||
                    formData.phone.length === 0
                  }
                  loading={settingsReducer.loading}
                  buttonStyle={[styles.loginButton, { width: "100%" }]}
                  titleStyle={{ color: "#F8F8F8", fontWeight: "bold" }}
                  containerStyle={{
                    paddingHorizontal: 10,
                    paddingVertical: 7,
                    flexGrow: 1,
                    width: "100%",
                  }}
                />
              </KeyboardAvoidingView>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
