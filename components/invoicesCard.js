import { React, globalStyle, localize, useEffect } from "../utils/allImports";
import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

export default function InvoicesCard({
  id,
  invoiceNumber,
  merchantName,
  merchantAddress,
  paymentMethod,
  clientName,
  clientMobile,
  totalPrice,
  date,
  navigation,
}) {
  const styles = globalStyle();
  const { t } = useTranslation();
  useEffect(() => {
    localize.changeLanguage("en");
  }, []);
  return (
    <TouchableOpacity
      style={[styles.invoiceCardContainerStyle]}
      onPress={() =>
        navigation.navigate("singleInvoice", {
          id,
        })
      }
    >
      <View style={[styles.invoicesHalfPart]}>
        <View style={[styles.flexBetween, styles.responsiveDirection]}>
          <Text style={[styles.invoicesCardTitleStyle]}>
            {t("invoiceNumber")}
          </Text>
          <Text style={[styles.invoicesCardInfoStyle]}>{invoiceNumber}</Text>
        </View>
        <View style={[styles.flexBetween, styles.responsiveDirection]}>
          <Text style={[styles.invoicesCardTitleStyle]}>
            {t("merchantName")}
          </Text>
          <Text style={[styles.invoicesCardInfoStyle]}>{merchantName}</Text>
        </View>
        <View style={[styles.flexBetween, styles.responsiveDirection]}>
          <Text style={[styles.invoicesCardTitleStyle]}>
            {t("merchantAddress")}
          </Text>
          <Text style={[styles.invoicesCardInfoStyle]}>{merchantAddress}</Text>
        </View>
        <View style={[styles.flexBetween, styles.responsiveDirection]}>
          <Text style={[styles.invoicesCardTitleStyle]}>
            {t("paymentMethod")}
          </Text>
          <Text style={[styles.invoicesCardInfoStyle]}>{paymentMethod}</Text>
        </View>
      </View>
      <View style={[styles.invoicesHalfPart]}>
        <View style={[styles.flexBetween, styles.responsiveDirection]}>
          <Text style={[styles.invoicesCardTitleStyle]}>{t("clientName")}</Text>
          <Text style={[styles.invoicesCardInfoStyle]}>{clientName}</Text>
        </View>
        <View style={[styles.flexBetween, styles.responsiveDirection]}>
          <Text style={[styles.invoicesCardTitleStyle]}>
            {t("clientMobile")}
          </Text>
          <Text style={[styles.invoicesCardInfoStyle]}>{clientMobile}</Text>
        </View>
        <View style={[styles.flexBetween, styles.responsiveDirection]}>
          <Text style={[styles.invoicesCardTitleStyle]}>{t("totalPrice")}</Text>
          <Text style={[styles.invoicesCardInfoStyle]}>{totalPrice}</Text>
        </View>
        <View style={[styles.flexBetween, styles.responsiveDirection]}>
          <Text style={[styles.invoicesCardTitleStyle]}>{t("date")}</Text>
          <Text style={[styles.invoicesCardInfoStyle]}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
