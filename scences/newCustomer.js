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
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import Header from "../components/header";
export default function Customers({ navigation }) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  // useEffect(() => {
  //   console.log(), [];
  // });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    referenceId: "",
    remarks: "",
    nationalId: "",
    cashOrCredit: false,
  });
  const [validation, setValidation] = useState({
    firstName: {
      message: "",
    },
    lastName: {
      message: "",
    },
    phoneNumber: {
      message: "",
    },
    email: {
      message: "",
    },
    referenceId: {
      message: "",
    },
    remarks: {
      message: "",
    },
    nationalId: {
      message: "",
    },
    cashOrCredit: {
      message: "",
    },
  });
  const styles = globalStyle();
  const { t } = useTranslation();

  return (
    <View styles={styles.container}>
      <Header
        headerText={"addNewCustomer"}
        navigation={navigation}
        iconType={"newUser"}
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
              <nativeElement.Icon name="person" size={29} color="#4E7D9B" />
            }
            rightIcon={
              <nativeElement.Icon
                name="close"
                size={25}
                onPress={() => setFormData({ ...formData, firstName: "" })}
              />
            }
            // label="Email"
            inputStyle={styles.responsiveTextDirection}
            placeholder={t("firstName")}
            errorMessage={validation.firstName.message}
            inputContainerStyle={[
              styles.responsiveDirection,
              styles.AuthInputContainerStyle,
            ]}
            containerStyle={{
              width: windowWidth * 0.45,
              justifyContent: "center",
            }}
            value={formData.firstName}
            onChangeText={(text) => {
              setFormData({ ...formData, firstName: text });
              setValidation({
                ...validation,
                firstName: {
                  ...validation.firstName,
                  message:
                    text.lenth < 3 && text.length > 0
                      ? t("firstNameShouldNotBeLessThanThreeLetters")
                      : text.length === 0
                      ? t("firstNameRequired")
                      : "",
                },
              });
            }}
          />
          <nativeElement.Input
            leftIcon={
              <nativeElement.Icon name="person" size={29} color="#4E7D9B" />
            }
            rightIcon={
              <nativeElement.Icon
                name="close"
                size={25}
                onPress={() => setFormData({ ...formData, lastName: "" })}
              />
            }
            // label="Email"
            inputStyle={styles.responsiveTextDirection}
            placeholder={t("lastName")}
            errorMessage={validation.lastName.message}
            inputContainerStyle={[
              styles.responsiveDirection,
              styles.AuthInputContainerStyle,
            ]}
            containerStyle={{
              width: windowWidth * 0.45,
              justifyContent: "center",
            }}
            value={formData.lastName}
            onChangeText={(text) => {
              setFormData({ ...formData, lastName: text });
              setValidation({
                ...validation,
                lastName: {
                  ...validation.lastName,
                  message:
                    text.lenth < 3 && text.length > 0
                      ? t("lastNameShouldNotBeLessThanThreeLetters")
                      : text.length === 0
                      ? t("lastNameRequired")
                      : "",
                },
              });
            }}
          />
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
                onPress={() => setFormData({ ...formData, nationalId: "" })}
              />
            }
            // label="Email"
            inputStyle={styles.responsiveTextDirection}
            placeholder={t("nationalId")}
            errorMessage={validation.nationalId.message}
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
            value={formData.nationalId}
            onChangeText={(text) => {
              setFormData({ ...formData, nationalId: text });
              setValidation({
                ...validation,
                nationalId: {
                  ...validation.nationalId,
                  message:
                    !validator.isNumeric(text) && text.length > 0
                      ? t("nationalIdMustBeNumbers")
                      : text.lenth < 10 && text.length > 0
                      ? t("nationalIdShouldn'tBeLessThantenLetters")
                      : text.length === 0
                      ? t("nationalIdRequired")
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
                onPress={() => setFormData({ ...formData, referenceId: "" })}
              />
            }
            // label="Email"
            inputStyle={styles.responsiveTextDirection}
            placeholder={t("referenceId")}
            errorMessage={validation.referenceId.message}
            inputContainerStyle={[
              styles.responsiveDirection,
              styles.AuthInputContainerStyle,
            ]}
            containerStyle={{
              width: windowWidth * 0.45,
              justifyContent: "center",
            }}
            value={formData.referenceId}
            onChangeText={(text) => {
              setFormData({ ...formData, referenceId: text });
              setValidation({
                ...validation,
                referenceId: {
                  ...validation.referenceId,
                  message:
                    !validator.isNumeric(text) && text.length > 0
                      ? t("referenceNumberMustbeatlest")
                      : text.length === 0
                      ? t("referenceNumberRequired")
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
            errorMessage={validation.nationalId.message}
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
                      : text.lenth < 10 && text.length > 0
                      ? t("PhoneNumberShouldntBeLessThantenNumbers")
                      : text.length === 0
                      ? t("PhoneNumberRequired")
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
              {t("cash")}
            </Text>
            <nativeElement.Switch
              value={formData.cashOrCredit}
              color={primaryColor}
              onChange={() =>
                setFormData({
                  ...formData,
                  cashOrCredit: !formData.cashOrCredit,
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
              {t("credit")}
            </Text>
          </View>
          <nativeElement.Input
            leftIcon={
              <nativeElement.Icon
                name="description"
                size={25}
                color="#4E7D9B"
              />
            }
            rightIcon={
              <nativeElement.Icon
                name="close"
                size={25}
                onPress={() => setFormData({ ...formData, remarks: "" })}
              />
            }
            // label="Email"
            inputStyle={styles.responsiveTextDirection}
            placeholder={t("remarks")}
            // errorMessage={validation.email.message}
            inputContainerStyle={[
              styles.responsiveDirection,
              styles.AuthInputContainerStyle,
            ]}
            containerStyle={{
              width: windowWidth * 0.45,
              justifyContent: "center",
            }}
            value={formData.remarks}
            onChangeText={(text) => {
              setFormData({ ...formData, remarks: text });
              setValidation({
                ...validation,
                remarks: {
                  ...validation.remarks,
                  message: text.length === 0 ? t("nationalIdRequired") : "",
                },
              });
            }}
          />
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
                disabled={
                  validation.email.message.length > 0 ||
                  validation.firstName.message.length ||
                  validation.lastName.message.length ||
                  validation.nationalId.message.length ||
                  validation.referenceId.message.length ||
                  validation.remarks.message.length ||
                  formData.email.lenth === 0 ||
                  formData.firstName.length === 0 ||
                  formData.lastName.lenth === 0 ||
                  formData.nationalId.length === 0 ||
                  formData.referenceId.lenth === 0 ||
                  formData.remarks.length === 0
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
