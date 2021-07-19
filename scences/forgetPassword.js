import {
  React,
  useSelector,
  useDispatch,
  useState,
  useEffect,
  nativeElement,
  globalStyle,
  localize,
  AsyncStorage,
  validator,
} from "../utils/allImports";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { forgetPassword } from "../redux/actions/Auth";

export default function ForgetPassword({ navigation }) {
  const [showSnake, setShowSnake] = useState("");
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [validation, setValidation] = useState({
    email: {
      message: "",
    },
  });
  const authReducer = useSelector((state) => state.AuthReducer);

  const [classType, setClassType] = useState("green");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    let timeout;
    if (showSnake !== "") {
      timeout = setTimeout(() => {
        setShowSnake("");
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [showSnake]);
  const styles = globalStyle();
  return (
    <View style={styles.splitContainer}>
      <View style={[styles.partContainer, styles.loginView]}>
        <TouchableOpacity
          style={[styles.flexStart]}
          onPress={() => navigation.goBack()}
        >
          <nativeElement.Icon
            name="arrow-back"
            color="#4E7D9B"
            type="ionicon"
            size={35}
            containerStyle={styles.shadow}
          />
        </TouchableOpacity>
        <View style={{ marginVertical: "6%" }}></View>
        <nativeElement.Icon
          name="person"
          color="#4E7D9B"
          type="ionicon"
          size={windowHeight * 0.2}
          containerStyle={styles.shadow}
        />
        <View style={{ marginVertical: 5 }}></View>
        <View style={[styles.flexCenter]}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#4E7D9B" }}>
            {t("forgetPassowrd")}
          </Text>
        </View>
        <View style={{ marginVertical: "7%" }}></View>
        <nativeElement.Input
          leftIcon={
            <nativeElement.Icon name="email" size={25} color="#4E7D9B" />
          }
          rightIcon={
            <nativeElement.Icon
              name="close"
              size={25}
              onPress={() => setFormData({ ...formData, email: "" })}
            />
          }
          // label="Email"
          inputStyle={styles.responsiveTextDirection}
          placeholder={t("email")}
          errorMessage={validation.email.message}
          inputContainerStyle={[
            styles.responsiveDirection,
            styles.AuthInputContainerStyle,
          ]}
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
        {/* ////////////////////////////////////////////////////////////////////////// */}
        <View
          style={[
            styles.flexStart,
            { marginHorizontal: 10 },
            styles.responsiveDirection,
          ]}
        >
          <Text style={{ color: classType }}>{showSnake}</Text>
        </View>
        <View style={{ flex: 1 }}></View>
        <KeyboardAvoidingView style={[styles.flexBetween]}>
          <nativeElement.Button
            loading={authReducer.loading}
            disabled={
              validation.email.message.length > 0 || formData.email.length === 0
            }
            title={t("getNewPassword")}
            buttonStyle={[styles.loginButton]}
            titleStyle={{ color: "#F8F8F8", fontWeight: "bold" }}
            onPress={() => {
              dispatch(
                forgetPassword({ email: formData.email.toLowerCase() })
              ).then((res) => {
                if (res.status === 200) {
                  setShowSnake(t("emailWasSent"));
                  setClassType("green");
                } else {
                  setShowSnake(t("somethingWrongHappen"));
                  setClassType("red");
                }
              });
            }}
            containerStyle={{
              paddingHorizontal: 10,
              paddingVertical: 7,
              flexGrow: 1,
              width: "100%",
            }}
          />
        </KeyboardAvoidingView>
      </View>
      <View style={[styles.partContainer, styles.logoView]}>
        <View style={[styles.logoCard]}>
          <Text>Logo</Text>
        </View>
      </View>
    </View>
  );
}
