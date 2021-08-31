import {
  React,
  useSelector,
  useDispatch,
  useState,
  nativeElement,
  globalStyle,
  localize,
  AsyncStorage,
} from "../utils/allImports";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  useWindowDimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from "react-native";
import { loginUser, loadUser, setToken } from "../redux/actions/Auth";
export default function SingIn({ navigation }) {
  const authReducer = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [formData, setFormData] = useState({
    username: "cashier",
    password: "123456",
  });

  const [validation, setValidation] = useState({
    username: {
      message: "",
    },
    password: {
      message: "",
    },
  });
  const [toggleEye, setToggleEye] = useState(false);
  const { t } = useTranslation();
  const setLocale = (locale) => {
    localize.changeLanguage(locale);
    AsyncStorage.setItem("lang", locale);
  };

  const styles = globalStyle();
  return (
    <View style={styles.splitContainer}>
      <View style={[styles.partContainer, styles.loginView]}>
        <View style={{ marginVertical: "6%" }}></View>
        <nativeElement.Icon
          name="person"
          color="#4E7D9B"
          type="ionicon"
          size={windowHeight * 0.2}
        />
        <View style={{ marginVertical: "5%" }}></View>
        <nativeElement.Input
          leftIcon={
            <nativeElement.Icon name="email" size={25} color="#4E7D9B" />
          }
          rightIcon={
            <nativeElement.Icon
              name="close"
              size={25}
              onPress={() => setFormData({ ...formData, username: "" })}
            />
          }
          inputStyle={styles.responsiveTextDirection}
          placeholder={t("userName")}
          errorMessage={validation.username.message}
          inputContainerStyle={[
            styles.responsiveDirection,
            styles.AuthInputContainerStyle,
          ]}
          value={formData.username}
          onChangeText={(text) => {
            setFormData({ ...formData, username: text });
            setValidation({
              ...validation,
              username: {
                ...validation.username,
                message: text.length === 0 ? t("userNameRequired") : "",
              },
            });
          }}
        />
        {/* ////////////////////////////////////////////////////////////////////////// */}
        <View style={{ marginVertical: 10 }}></View>
        <nativeElement.Input
          leftIcon={
            <nativeElement.Icon
              name="key"
              type="ionicon"
              size={25}
              color="#4E7D9B"
            />
          }
          rightIcon={
            <nativeElement.Icon
              name={toggleEye ? "eye" : "eye-off"}
              size={25}
              type="ionicon"
              onPress={() => setToggleEye(!toggleEye)}
            />
          }
          // label="username"
          inputStyle={styles.responsiveTextDirection}
          placeholder={t("password")}
          errorMessage={validation.password.message}
          inputContainerStyle={[
            styles.responsiveDirection,
            styles.AuthInputContainerStyle,
          ]}
          value={formData.password}
          secureTextEntry={!toggleEye}
          onChangeText={(text) => {
            setFormData({ ...formData, password: text });
            setValidation({
              ...validation,
              password: {
                ...validation.password,
                message:
                  text.length < 6 && text.length > 0
                    ? t("passwordShouldBeMin8")
                    : text.length === 0
                    ? t("passwordRequired")
                    : "",
              },
            });
          }}
        />
        <View style={{ flex: 1 }}></View>
        <View
          style={[
            styles.flexBetween,
            { direction: localize.language === "en" ? "ltr" : "rtl" },
          ]}
        >
          <KeyboardAvoidingView style={[styles.flexStart, { width: "70%" }]}>
            <nativeElement.Button
              title={t("login")}
              loading={authReducer.loading}
              disabled={
                validation.username.message.length > 0 ||
                validation.password.message.length ||
                formData.username.length === 0 ||
                formData.password.length === 0
              }
              buttonStyle={[styles.loginButton]}
              titleStyle={{ color: "#F8F8F8", fontWeight: "bold" }}
              onPress={() => {
                dispatch(loginUser(formData)).then((res) => {
                  if (res.status === 200) {
                    dispatch(setToken(res.data.data.token));
                    dispatch(loadUser(res.data.data.token));
                  } else {
                    alert(res);
                  }
                });
              }}
              containerStyle={{
                paddingHorizontal: 10,
                paddingVertical: 7,
                flexGrow: 1,
                width: "40%",
              }}
            />
          </KeyboardAvoidingView>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("forgetPassword", {
                email: formData.username,
              })
            }
          >
            <Text
              style={{
                color: "#4E7D9B",
                textDecorationLine: "underline",
                fontSize: 16,
              }}
            >
              {t("forgetPassowrd")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.partContainer, styles.logoView]}>
        <View style={[styles.languageButtonsContainer]}>
          <nativeElement.Button
            title={"English"}
            buttonStyle={[styles.englishButton]}
            titleStyle={{ color: "#4E7D9B", fontWeight: "bold" }}
            onPress={() => setLocale("en")}
          />
          <nativeElement.Button
            type="outline"
            title={"العربية"}
            buttonStyle={[styles.arabicButton]}
            titleStyle={{ color: "#F8F8F8", fontWeight: "bold" }}
            onPress={() => setLocale("ar")}
          />
        </View>
        <View style={[styles.logoCard]}>
          <Image
            source={require("../assets/logo2.png")}
            style={{ width: 135, height: 135 }}
          />
          <Image
            source={require("../assets/logo3.png")}
            style={{ width: 115, height: 37, marginTop: 20 }}
          />
        </View>
      </View>
    </View>
  );
}
