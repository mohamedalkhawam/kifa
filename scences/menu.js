import { View, Text, Pressable } from "react-native";
import {
  React,
  useSelector,
  useDispatch,
  useState,
  useEffect,
  globalStyle,
  nativeElement,
  secondaryColor,
  primaryColor,
} from "../utils/allImports";
import { useTranslation } from "react-i18next";

import BackButton from "../components/backButton";
export default function Settings({ navigation }) {
  const { t } = useTranslation();
  const styles = globalStyle();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: primaryColor,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          width: "100%",
          height: "100%",
        },
      ]}
    >
      <BackButton
        navigation={navigation}
        Icon={nativeElement.Icon}
        color={secondaryColor}
      />
      <View style={styles.menuGridStyle}>
        <nativeElement.Button
          onPress={() => navigation.navigate("home")}
          buttonStyle={{ flexDirection: "column" }}
          titleStyle={{ color: secondaryColor, fontSize: 20 }}
          title={t("home")}
          type="clear"
          icon={
            <nativeElement.Icon
              name="home-outline"
              size={100}
              type="ionicon"
              color={secondaryColor}
            />
          }
        />
      </View>
      <View style={styles.menuGridStyle}>
        <nativeElement.Button
          onPress={() => navigation.navigate("invoices")}
          buttonStyle={{ flexDirection: "column" }}
          titleStyle={{ color: secondaryColor, fontSize: 20 }}
          type="clear"
          title={t("invoices")}
          icon={
            <nativeElement.Icon
              name="receipt-outline"
              size={100}
              type="ionicon"
              color={secondaryColor}
            />
          }
        />
      </View>
      <View style={styles.menuGridStyle}>
        <nativeElement.Button
          onPress={() => navigation.navigate("customers")}
          buttonStyle={{ flexDirection: "column" }}
          titleStyle={{ color: secondaryColor, fontSize: 20 }}
          type="clear"
          title={t("customers")}
          icon={
            <nativeElement.Icon
              name="person-outline"
              size={100}
              color={secondaryColor}
              type="ionicon"
            />
          }
        />
      </View>
      <View style={styles.menuGridStyle}>
        <nativeElement.Button
          onPress={() => navigation.navigate("settings")}
          title={t("settings")}
          type="clear"
          buttonStyle={{ flexDirection: "column" }}
          titleStyle={{ color: secondaryColor, fontSize: 20 }}
          icon={
            <nativeElement.Icon
              name="settings-outline"
              size={100}
              type="ionicon"
              color={secondaryColor}
            />
          }
        />
      </View>
    </View>
  );
}
