import {
  React,
  globalStyle,
  localize,
  useEffect,
  useDispatch,
} from "../utils/allImports";
import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { clearInvoice } from "../redux/actions/invoice";
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
  num,
  item,
  status,
}) {
  const styles = globalStyle();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={[styles.invoiceCardContainerStyle]}
      onPress={() => {
        dispatch(clearInvoice());
        navigation.navigate("singleInvoice", {
          id: id || item.id,
          status,
        });
      }}
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
          <Text style={[styles.invoicesCardInfoStyle]}>
            {new Date(date).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
