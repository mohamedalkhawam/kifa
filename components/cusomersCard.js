import {
  React,
  nativeElement,
  secondaryColor,
  globalStyle,
  localize,
  useEffect,
} from "../utils/allImports";
import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

export default function InvoicesCard({
  id,
  name,
  phone,
  email,
  national_id,
  reference_id,
  notes,
  payment_method,
  navigation,
  index,
  customer,
}) {
  const styles = globalStyle();
  const { t } = useTranslation();

  return (
    <View style={styles.customerCardWrapper}>
      <View style={[styles.flexBetween, styles.customerCardHeaderStyle]}>
        <Text
          style={[
            {
              color: secondaryColor,
              fontSize: 18,
              paddingHorizontal: 5,
              fontWeight: "bold",
            },
          ]}
        >
          #{index + 1}
        </Text>
        <nativeElement.Button
          onPress={() =>
            navigation.navigate("updateCustomer", {
              id,
              customer,
            })
          }
          type="clear"
          icon={
            <nativeElement.Icon
              name="edit"
              size={25}
              color={secondaryColor}
              type="material"
            />
          }
        />
      </View>
      <TouchableOpacity
        style={[styles.invoiceCardContainerStyle, { marginTop: 0 }]}
      >
        <View style={[styles.invoicesHalfPart]}>
          <View style={[styles.flexBetween, styles.responsiveDirection]}>
            <Text style={[styles.invoicesCardTitleStyle]}>{t("ID")}</Text>
            <Text style={[styles.invoicesCardInfoStyle]}>{id ? id : ""}</Text>
          </View>

          {/* <View style={[styles.flexBetween, styles.responsiveDirection]}>
            <Text style={[styles.invoicesCardTitleStyle]}>{t("email")}</Text>
            <Text style={[styles.invoicesCardInfoStyle]}>
              {email ? email : ""}
            </Text>
          </View> */}
          <View style={[styles.flexBetween, styles.responsiveDirection]}>
            <Text style={[styles.invoicesCardTitleStyle]}>
              {t("phoneNumber")}
            </Text>
            <Text style={[styles.invoicesCardInfoStyle]}>
              {phone ? phone : ""}
            </Text>
          </View>
        </View>
        <View style={[styles.invoicesHalfPart]}>
          {/* <View style={[styles.flexBetween, styles.responsiveDirection]}>
            <Text style={[styles.invoicesCardTitleStyle]}>
              {t("nationalId")}
            </Text>
            <Text style={[styles.invoicesCardInfoStyle]}>
              {national_id ? national_id : ""}
            </Text>
          </View> */}
          {/* <View style={[styles.flexBetween, styles.responsiveDirection]}>
            <Text style={[styles.invoicesCardTitleStyle]}>
              {t("referenceId")}
            </Text>
            <Text style={[styles.invoicesCardInfoStyle]}>
              {reference_id ? reference_id : ""}
            </Text>
          </View> */}
          <View style={[styles.flexBetween, styles.responsiveDirection]}>
            <Text style={[styles.invoicesCardTitleStyle]}>{t("name")}</Text>
            <Text style={[styles.invoicesCardInfoStyle]}>
              {name ? name : ""}
            </Text>
          </View>
          <View style={[styles.flexBetween, styles.responsiveDirection]}>
            <Text style={[styles.invoicesCardTitleStyle]}>{t("remarks")}</Text>
            <Text style={[styles.invoicesCardInfoStyle]}>
              {notes ? notes : notes}
            </Text>
          </View>
          {/* <View style={[styles.flexBetween, styles.responsiveDirection]}>
            <Text style={[styles.invoicesCardTitleStyle]}>
              {t("paymentMethod")}
            </Text>
            <Text style={[styles.invoicesCardInfoStyle]}>
              {payment_method ? payment_method : ""}
            </Text>
          </View> */}
        </View>
      </TouchableOpacity>
    </View>
  );
}
