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
} from "../utils/allImports";
import { useTranslation } from "react-i18next";
import {
  View,
  useWindowDimensions,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Header from "../components/header";
export default function Customers({ navigation }) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    branchAssignedTo: "",
    numberOfCopiesToPrint: "",
    language: localize.language,
    isArabic: false,
  });
  const [validation, setValidation] = useState({
    phoneNumber: {
      message: "",
    },
    email: {
      message: "",
    },
    numberOfCopiesToPrint: {
      message: "",
    },
  });
  const styles = globalStyle();
  const { t } = useTranslation();

  return (
    <View styles={styles.container}>
      <Header
        headerText={"settings"}
        navigation={navigation}
        iconType={"settings"}
      />
      {/* <View></View> */}
      <ScrollView
        style={[
          {
            paddingTop: windowHeight * 0.1,
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
                onPress={() => setFormData({ ...formData, phoneNumber: "" })}
              />
            }
            // label="Email"
            inputStyle={styles.responsiveTextDirection}
            placeholder={t("phoneNumber")}
            errorMessage={validation.phoneNumber.message}
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
            value={formData.phoneNumber}
            onChangeText={(text) => {
              setFormData({ ...formData, phoneNumber: text });
              setValidation({
                ...validation,
                phoneNumber: {
                  ...validation.phoneNumber,
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
          <nativeElement.Input
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
          />
          <nativeElement.Input
            leftIcon={
              <nativeElement.Icon name="dialpad" size={25} color="#4E7D9B" />
            }
            rightIcon={
              <nativeElement.Icon
                name="close"
                size={25}
                onPress={() =>
                  setFormData({ ...formData, numberOfCopiesToPrint: "" })
                }
              />
            }
            // label="Email"
            inputStyle={styles.responsiveTextDirection}
            placeholder={t("numberOfCopiesToPrint")}
            errorMessage={validation.numberOfCopiesToPrint.message}
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
            value={formData.numberOfCopiesToPrint}
            onChangeText={(text) => {
              setFormData({ ...formData, numberOfCopiesToPrint: text });
              setValidation({
                ...validation,
                numberOfCopiesToPrint: {
                  ...validation.numberOfCopiesToPrint,
                  message:
                    !validator.isNumeric(text) && text.length > 0
                      ? t("numberOfCopiesToPrintMustBeNumbers")
                      : text.length === 0
                      ? t("numberOfCopiesToPrintRequired")
                      : "",
                },
              });
            }}
          />
          <View
            style={[styles.flexStart, { width: "45%", paddingHorizontal: 10 }]}
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
              style={[styles.flexCenter, { width: "100%", marginVertical: 35 }]}
            >
              <nativeElement.Button
                title={t("save")}
                onPress={() => {
                  localize.changeLanguage(formData.isArabic ? "ar" : "en");
                  alert(isArabic);
                  alert(language);
                }}
                disabled={
                  validation.email.message.length > 0 ||
                  validation.phoneNumber.message.length > 0 ||
                  validation.numberOfCopiesToPrint.message.length > 0 ||
                  formData.numberOfCopiesToPrint.length === 0 ||
                  formData.phoneNumber.length === 0 ||
                  formData.email.length === 0
                }
                buttonStyle={[styles.loginButton, { width: "100%" }]}
                titleStyle={{ color: "#F8F8F8", fontWeight: "bold" }}
                onPress={() => alert(JSON.stringify(formData))}
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
