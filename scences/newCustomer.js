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
import { createCustomer } from "../redux/actions/customers";
export default function Customers({ navigation }) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [cashOrCredit, setCashOrCredit] = useState(false);
  const authReducer = useSelector((state) => state.AuthReducer);
  const customersReducer = useSelector((state) => state.customersReducer);
  const [showSnake, setShowSnake] = useState("");
  const [classType, setClassType] = useState("green");
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
  const [formData, setFormData] = useState({
    name: "sdfsdf",
    phone: "3243242342324",
    email: "ssdssfdf@dfgdfdfd.com",
    reference_id: "32423423",
    notes: "fsdf",
    national_id: "32423423",
    payment_method: cashOrCredit ? "credit" : "cash",
  });
  const [validation, setValidation] = useState({
    name: {
      message: "",
    },

    phone: {
      message: "",
    },
    email: {
      message: "",
    },
    reference_id: {
      message: "",
    },
    notes: {
      message: "",
    },
    national_id: {
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
      <View
        style={[styles.flexCenter, { margin: 25 }, styles.responsiveDirection]}
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
            leftIcon={
              <nativeElement.Icon name="person" size={29} color="#4E7D9B" />
            }
            rightIcon={
              <nativeElement.Icon
                name="close"
                size={25}
                onPress={() => setFormData({ ...formData, name: "" })}
              />
            }
            // label="Email"
            inputStyle={styles.responsiveTextDirection}
            placeholder={t("name")}
            errorMessage={validation.name.message}
            inputContainerStyle={[
              styles.responsiveDirection,
              styles.AuthInputContainerStyle,
            ]}
            containerStyle={{
              width: windowWidth * 0.45,
              justifyContent: "center",
            }}
            value={formData.name}
            onChangeText={(text) => {
              setFormData({ ...formData, name: text });
              setValidation({
                ...validation,
                name: {
                  ...validation.name,
                  message:
                    text.length < 3 && text.length > 0
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
                onPress={() => setFormData({ ...formData, national_id: "" })}
              />
            }
            // label="Email"
            inputStyle={styles.responsiveTextDirection}
            placeholder={t("nationalId")}
            errorMessage={validation.national_id.message}
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
            value={formData.national_id}
            onChangeText={(text) => {
              setFormData({ ...formData, national_id: text });
              setValidation({
                ...validation,
                national_id: {
                  ...validation.national_id,
                  message:
                    !validator.isNumeric(text) && text.length > 0
                      ? t("nationalIdMustBeNumbers")
                      : text.length < 10 && text.length > 0
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
                onPress={() => setFormData({ ...formData, reference_id: "" })}
              />
            }
            // label="Email"
            inputStyle={styles.responsiveTextDirection}
            placeholder={t("referenceId")}
            errorMessage={validation.reference_id.message}
            inputContainerStyle={[
              styles.responsiveDirection,
              styles.AuthInputContainerStyle,
            ]}
            containerStyle={{
              width: windowWidth * 0.45,
              justifyContent: "center",
            }}
            value={formData.reference_id}
            onChangeText={(text) => {
              setFormData({ ...formData, reference_id: text });
              setValidation({
                ...validation,
                reference_id: {
                  ...validation.reference_id,
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
                onPress={() => setFormData({ ...formData, phone: "" })}
              />
            }
            // label="Email"
            inputStyle={styles.responsiveTextDirection}
            placeholder={t("phoneNumber")}
            errorMessage={validation.national_id.message}
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
              value={cashOrCredit}
              color={primaryColor}
              onChange={() => setCashOrCredit(!cashOrCredit)}
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
                onPress={() => setFormData({ ...formData, notes: "" })}
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
            value={formData.notes}
            onChangeText={(text) => {
              setFormData({ ...formData, notes: text });
              setValidation({
                ...validation,
                notes: {
                  ...validation.notes,
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
                  validation.name.message.length > 0 ||
                  validation.national_id.message.length > 0 ||
                  validation.reference_id.message.length > 0 ||
                  validation.notes.message.length > 0 ||
                  validation.phone.message.length > 0 ||
                  formData.email.length === 0 ||
                  formData.name.length === 0 ||
                  formData.national_id.length === 0 ||
                  formData.phone.length === 0 ||
                  formData.reference_id.length === 0 ||
                  formData.notes.length === 0
                }
                buttonStyle={[styles.loginButton, { width: "100%" }]}
                titleStyle={{ color: "#F8F8F8", fontWeight: "bold" }}
                onPress={() => {
                  dispatch(
                    createCustomer(
                      {
                        name: formData.name,
                        phone: formData.phone,
                        email: formData.email,
                        national_id: formData.national_id,
                        reference_id: formData.reference_id,
                        notes_en: formData.notes,
                        payment_method: formData.payment_method,
                        username: "dsfd",
                        copies_number: 0,
                      },
                      authReducer.token
                    )
                  )
                    .then((res) => {
                      if (res.status === 200) {
                        setShowSnake(t("customerCreated"));
                        setClassType("green");
                      } else {
                        setShowSnake(t("somethingWrongHappen"));
                        setClassType("red");
                      }
                    })
                    .catch((err) => alert(err));
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
        </View>
      </ScrollView>
    </View>
  );
}
