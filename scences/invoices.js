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
  invoicesCard,
} from "../utils/allImports";
import { useTranslation } from "react-i18next";
import {
  View,
  useWindowDimensions,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Animated,
} from "react-native";
import { invoices } from "../fakeData/invoices";
import { pendingInvoices } from "../fakeData/pendingInvoices";
import InvoicesCard from "../components/invoicesCard";
import Header from "../components/header";
export default function Invoices({ navigation }) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const tab1 = useState(new Animated.Value(1))[0];
  const tab2 = useState(new Animated.Value(1))[0];
  const [currentTab, setCurrentTab] = useState(0);
  const pushIn = (value) => {
    return Animated.timing(value, {
      toValue: 0.7,
      duration: 100,
      useNativeDriver: true,
    });
  };
  const triggerAnimation = (value) => {
    Animated.sequence([pushIn(value), pushOut(value)]).start();
  };
  const pushOut = (value) => {
    return Animated.timing(value, {
      toValue: 1.4,
      duration: 100,
      useNativeDriver: true,
    });
  };
  const animationStyle = (value) => {
    return {
      // opacity: value,
      transform: [
        {
          scale: value.interpolate({
            inputRange: [0, 1.1],
            outputRange: [0.7, 1.1],
          }),
        },
      ],
    };
  };
  const styles = globalStyle();
  const { t } = useTranslation();

  return (
    <View styles={styles.container}>
      <Header
        headerText={"invoices"}
        navigation={navigation}
        iconType={"invoices"}
      />
      {/* <View></View> */}
      <View style={styles.invoicesTabsContainerStyle}>
        <View
          style={[styles.invoicesTabsStyle, styles.invoicesTabsSeperator]}
          onTouchStart={() => {
            setCurrentTab(0);
            triggerAnimation(tab1);
          }}
        >
          <Animated.Text
            style={[
              styles.invoicesTabsText,
              animationStyle(tab1),
              { fontWeight: currentTab === 0 ? "bold" : "400" },
            ]}
          >
            {t("invoices")}
          </Animated.Text>
        </View>
        <View
          style={styles.invoicesTabsStyle}
          onTouchStart={() => {
            triggerAnimation(tab2);
            setCurrentTab(1);
          }}
        >
          <Animated.Text
            style={[
              styles.invoicesTabsText,
              animationStyle(tab2),
              { fontWeight: currentTab === 1 ? "bold" : "400" },
            ]}
          >
            {t("pendingInvoices")}
          </Animated.Text>
        </View>
      </View>
      <ScrollView
        style={[
          {
            paddingTop: 15,
            paddingHorizontal: 20,
            width: "100%",
          },
        ]}
      >
        {currentTab === 0
          ? invoices.map((item, index) => (
              <InvoicesCard
                key={index}
                id={item.id}
                invoiceNumber={item.invoiceNumber}
                merchantName={item.merchantName}
                merchantAddress={item.merchantAddress}
                paymentMethod={item.paymentMethod}
                clientName={item.clientName}
                clientMobile={item.clientMobile}
                totalPrice={item.totalPrice}
                date={item.date}
                status={item.status}
                navigation={navigation}
              />
            ))
          : pendingInvoices.map((item, index) => (
              <InvoicesCard
                key={index}
                id={item.id}
                invoiceNumber={item.invoiceNumber}
                merchantName={item.merchantName}
                merchantAddress={item.merchantAddress}
                paymentMethod={item.paymentMethod}
                clientName={item.clientName}
                clientMobile={item.clientMobile}
                totalPrice={item.totalPrice}
                date={item.date}
                status={item.status}
                navigation={navigation}
              />
            ))}
        <View style={{ padding: 150 }}></View>
      </ScrollView>
      <View style={{ padding: 20 }}></View>
    </View>
  );
}
