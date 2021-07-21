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
  Loader,
} from "../utils/allImports";
import { useTranslation } from "react-i18next";
import { View, Text, ScrollView, Image } from "react-native";
import axios from "axios";

import { orderSummary } from "../fakeData/orderSummary";
import Header from "../components/header";
import { readOneInvoice } from "../redux/actions/invoice";
export default function SingleInvoice({ navigation, route }) {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.AuthReducer);
  const invoicesReducer = useSelector((state) => state.invoicesReducer);
  const styles = globalStyle();
  const { t } = useTranslation();
  const invoice = {
    id: 125121215,
    invoice_number: 121215,
    merchant_name: "Othain",
    merchant_address: "33 Abas Al Akkad st. Cairo, Egypt ",
    paid_method: "Cash",
    customer_name: "MOHAMED ALKHAWAM",
    customer_phone: 1552263515,
    total_price: 1254,
    date: "2021/7/21",
    is_paid: 1,
    tax_number: "54545454",
  };
  useEffect(() => {
    if (route.params.id) {
      dispatch(readOneInvoice({ id: route.params.id }, authReducer.token)).then(
        (res) => console.log(res)
      );
    }
  }, []);
  if (authReducer.loading || invoicesReducer.loading) {
    return <Loader bgc={secondaryColor} color={primaryColor} />;
  } else {
    return (
      <View styles={styles.container}>
        <Header
          headerText={"invoices"}
          navigation={navigation}
          iconType={"invoices"}
        />
        <ScrollView
          style={[
            {
              marginVertical: 15,
              paddingHorizontal: 20,
              width: "100%",
            },
          ]}
        >
          {/* start row 1 */}
          <View style={(styles.flexStart, styles.responsiveDirection)}>
            <Text style={[styles.singleInvoiceTitleStyle]}>
              {t("invoice")}:
            </Text>
          </View>
          <View style={styles.singleInvoiceRowStyle}>
            <View style={styles.invoicesHalfPart}>
              <View style={[styles.flexBetween, styles.responsiveDirection]}>
                <Text style={[styles.invoicesCardTitleStyle]}>
                  {t("invoiceNumber")}:
                </Text>
                <Text style={[styles.invoicesCardInfoStyle]}>
                  {invoice.invoice_number}
                </Text>
              </View>
              <View style={[styles.flexBetween, styles.responsiveDirection]}>
                <Text style={[styles.invoicesCardTitleStyle]}>
                  {t("merchantName")}:
                </Text>
                <Text style={[styles.invoicesCardInfoStyle]}>
                  {invoice.merchant_name}
                </Text>
              </View>
              <View style={[styles.flexBetween, styles.responsiveDirection]}>
                <Text style={[styles.invoicesCardTitleStyle]}>
                  {t("merchantAddress")}:
                </Text>
                <Text style={[styles.invoicesCardInfoStyle]}>
                  {invoice.merchant_address}
                </Text>
              </View>
            </View>
            <View style={styles.invoicesHalfPart}>
              <View style={[styles.flexBetween, styles.responsiveDirection]}>
                <Text style={[styles.invoicesCardTitleStyle]}>
                  {t("date")}:
                </Text>
                <Text style={[styles.invoicesCardInfoStyle]}>
                  {invoice.date}
                </Text>
              </View>
              <View style={[styles.flexBetween, styles.responsiveDirection]}>
                <Text style={[styles.invoicesCardTitleStyle]}>
                  {t("time")}:
                </Text>
                <Text style={[styles.invoicesCardInfoStyle]}>
                  {"3:30"} {localize.language === "en" ? "PM" : "مساءً"}
                </Text>
              </View>
              <View style={[styles.flexBetween, styles.responsiveDirection]}>
                <Text style={[styles.invoicesCardTitleStyle]}>
                  {t("taxNumber")}:
                </Text>
                <Text style={[styles.invoicesCardInfoStyle]}>
                  {545415455545454}
                </Text>
              </View>
            </View>
          </View>
          {/* end row 1 */}
          <nativeElement.Divider
            orientation="horizontal"
            width={4}
            color={primaryColor}
            style={{ paddingVertical: 15, marginBottom: 10, opacity: 0.8 }}
          />
          {/* start row 2 */}
          <View style={(styles.flexStart, styles.responsiveDirection)}>
            <Text style={[styles.singleInvoiceTitleStyle]}>
              {t("orderSummary")}:
            </Text>
          </View>
          <View
            style={[
              styles.singleInvoiceRowStyle,
              { paddingHorizontal: 25 },
              styles.responsiveDirection,
            ]}
          >
            <View style={[styles.flexCenter, { width: "5%" }]}>
              <Text style={[styles.invoicesCardTitleStyle]}>#</Text>
            </View>
            <View
              style={[
                styles.flexStart,
                { width: "70%", paddingLeft: 5 },
                styles.responsiveDirection,
              ]}
            >
              <Text style={[styles.invoicesCardTitleStyle]}>{t("item")}</Text>
            </View>
            <View style={[styles.flexCenter, { width: "10%" }]}>
              <Text style={[styles.invoicesCardTitleStyle]}>
                {t("quantity")}
              </Text>
            </View>
            <View style={[styles.flexCenter, { width: "15%" }]}>
              <Text style={[styles.invoicesCardTitleStyle]}>{t("price")}</Text>
            </View>
          </View>
          {orderSummary.map((item, index) => (
            <View
              key={index}
              style={[
                styles.singleInvoiceRowStyle,
                { paddingHorizontal: 25 },
                styles.responsiveDirection,
              ]}
            >
              <View style={[styles.flexCenter, { width: "5%" }]}>
                <Text style={[styles.invoicesCardInfoStyle]}>{index + 1}</Text>
              </View>
              <View
                style={[
                  styles.flexStart,
                  { width: "70%" },
                  styles.responsiveDirection,
                ]}
              >
                <View style={[styles.flexStart, styles.responsiveDirection]}>
                  <View
                    style={{
                      width: 100,
                      height: 75,
                      paddingLeft: localize.language === "ar" ? 20 : 0,
                      paddingRight: localize.language === "en" ? 20 : 0,
                    }}
                  >
                    <Image
                      source={require("../assets/product.png")}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                  <Text style={[styles.invoicesCardInfoStyle]}>
                    {item.name}
                  </Text>
                </View>
              </View>
              <View style={[styles.flexCenter, { width: "10%" }]}>
                <Text style={[styles.invoicesCardInfoStyle]}>
                  {item.quantity}
                </Text>
              </View>
              <View style={[styles.flexCenter, { width: "15%" }]}>
                <Text style={[styles.invoicesCardInfoStyle]}>
                  {item.price.toFixed(2)}{" "}
                  <Text style={[styles.tableBodyTextStyle, { fontSize: 9 }]}>
                    SAR
                  </Text>
                </Text>
              </View>
            </View>
          ))}
          <nativeElement.Divider
            orientation="horizontal"
            width={4}
            color={primaryColor}
            style={{ paddingVertical: 15, marginBottom: 10, opacity: 0.8 }}
          />
          {/* end row 2 */}
          {/* start row 3 */}
          <View style={(styles.flexStart, styles.responsiveDirection)}>
            <Text style={[styles.singleInvoiceTitleStyle]}>
              {t("paymentSummary")}:
            </Text>
          </View>
          <View
            style={[styles.singleInvoiceRowStyle, styles.responsiveDirection]}
          >
            <View style={(styles.invoicesHalfPart, { width: "70%" })}></View>
            <View style={(styles.invoicesHalfPart, { width: "30%" })}>
              <View style={[styles.flexBetween, styles.responsiveDirection]}>
                <Text style={[styles.invoicesCardTitleStyle]}>
                  {t("subTotal")}
                </Text>
                <Text style={[styles.invoicesCardInfoStyle]}>
                  {invoice.total_price.toFixed(2)}{" "}
                  <Text style={[styles.tableBodyTextStyle, { fontSize: 9 }]}>
                    SAR
                  </Text>
                </Text>
              </View>
              {/* <View style={[styles.flexBetween, styles.responsiveDirection]}>
              <Text style={[styles.invoicesCardTitleStyle]}>
                {t("shipping")}
              </Text>
              <Text style={[styles.invoicesCardInfoStyle]}>
                {invoice.total_price.toFixed(2)}{" "}
                <Text style={[styles.tableBodyTextStyle, { fontSize: 9 }]}>
                  SAR
                </Text>
              </Text>
            </View> */}
              <View style={[styles.flexBetween, styles.responsiveDirection]}>
                <Text style={[styles.invoicesCardTitleStyle]}>{t("tax")}</Text>
                <Text style={[styles.invoicesCardInfoStyle]}>
                  {invoice.total_price.toFixed(2)}{" "}
                  <Text style={[styles.tableBodyTextStyle, { fontSize: 9 }]}>
                    SAR
                  </Text>
                </Text>
              </View>
              <nativeElement.Divider
                orientation="horizontal"
                width={1}
                color={primaryColor}
                style={{ paddingVertical: 10, marginBottom: 15, opacity: 0.8 }}
              />
              <View style={[styles.flexBetween, styles.responsiveDirection]}>
                <Text style={[styles.invoicesCardTitleStyle, { fontSize: 17 }]}>
                  {t("totals")}
                </Text>
                <Text style={[styles.invoicesCardInfoStyle]}>
                  {invoice.total_price.toFixed(2) * 3}{" "}
                  <Text style={[styles.tableBodyTextStyle, { fontSize: 9 }]}>
                    SAR
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <nativeElement.Divider
            orientation="horizontal"
            width={4}
            color={primaryColor}
            style={{ paddingVertical: 15, marginBottom: 10, opacity: 0.8 }}
          />
          {/* end row 3 */}
          {/* start row 4 */}
          <View style={[styles.flexStart, styles.responsiveDirection]}>
            <Text style={[styles.singleInvoiceTitleStyle]}>
              {t("customerInfo")}:
            </Text>
          </View>
          <View
            style={[
              styles.flexBetween,
              styles.responsiveDirection,
              { paddingHorizontal: 25 },
            ]}
          >
            <View style={{ width: "40%" }}>
              <Text
                style={[
                  styles.invoicesCardTitleStyle,
                  styles.responsiveTextDirection,
                ]}
              >
                {t("name")}
              </Text>
              <Text
                style={[
                  styles.invoicesCardInfoStyle,
                  styles.responsiveTextDirection,
                ]}
              >
                MOHAMED AL-KHAWAM
              </Text>
            </View>

            <View style={{ width: "40%" }}>
              <Text
                style={[
                  styles.invoicesCardTitleStyle,
                  styles.responsiveTextDirection,
                ]}
              >
                {t("paymentMethod")}
              </Text>
              <Text
                style={[
                  styles.invoicesCardInfoStyle,
                  styles.responsiveTextDirection,
                ]}
              >
                {t("cash")}
              </Text>
            </View>
            <View style={{ width: "20%" }}>
              <nativeElement.Icon
                name="print"
                size={80}
                type="ionicon"
                color={primaryColor}
              />
            </View>
          </View>
          <View
            style={[
              styles.flexBetween,
              styles.responsiveDirection,
              { paddingHorizontal: 25 },
            ]}
          >
            <View style={{ width: "40%" }}>
              <Text
                style={[
                  styles.invoicesCardTitleStyle,
                  styles.responsiveTextDirection,
                ]}
              >
                {t("mobile")}
              </Text>
              <Text
                style={[
                  styles.invoicesCardInfoStyle,
                  styles.responsiveTextDirection,
                ]}
              >
                0365656565
              </Text>
            </View>
          </View>
          <nativeElement.Divider
            orientation="horizontal"
            width={4}
            color={primaryColor}
            style={{ paddingVertical: 15, marginBottom: 10, opacity: 0.8 }}
          />
          {/* end row 4 */}
          {/* start row 5 */}
          <View
            style={[
              styles.flexCenter,
              { flexDirection: "column", marginBottom: 50, marginTop: 15 },
            ]}
          >
            <View style={styles.flexCenter}>
              <Text style={{ color: primaryColor }}>{t("taxIncluded")}</Text>
            </View>
            <View style={[styles.flexCenterm, { marginTop: 10 }]}>
              <View style={{ width: 150, height: 150 }}>
                <Image
                  resizeMode="contain"
                  source={require("../assets/parcode.png")}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            </View>
          </View>
          {/* end row 5 */}
          <View style={{ padding: 50 }}></View>
        </ScrollView>
      </View>
    );
  }
}
