import {
  React,
  useState,
  useSelector,
  useDispatch,
  useEffect,
  localize,
  nativeElement,
  primaryColor,
  secondaryColor,
  globalStyle,
  Loader,
  _objI,
  _objO,
} from "../utils/allImports";
import {
  Select,
  VStack,
  CheckIcon,
  Center,
  NativeBaseProvider,
} from "native-base";
import { QRCode } from "react-native-custom-qr-codes-expo";
import { useTranslation } from "react-i18next";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import Header from "../components/header";
import {
  readOneInvoice,
  changeInvoiceStatus,
  readInvoices,
} from "../redux/actions/invoice";
import * as Print from "expo-print";
import { readSettings, updateSettings } from "../redux/actions/settings";
export default function SingleInvoice({ navigation, route }) {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.AuthReducer);
  const invoicesReducer = useSelector((state) => state.invoicesReducer);
  const styles = globalStyle();
  const { t } = useTranslation();
  const [status, setStatus] = useState(invoicesReducer.invoice.is_paid);
  const [totals, setTotals] = useState({
    price: 0,
    quantity: 0,
    totalPriceWithDiscount: 0,
  });
  const settingsReducer = useSelector((state) => state.settingsReducer);

  useEffect(() => {
    dispatch(readSettings(authReducer.token));
  }, []);
  const print = async (uri) => {
    if (Platform.OS === "android") {
      Print.printAsync({
        uri: uri,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    } else {
      Print.selectPrinterAsync()
        .then((res) => {
          Print.printAsync({
            printerUrl: res.url,
            uri: uri,
          }).then((res) => {
            console.log(res);
          });
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    if (route.params.id) {
      dispatch(readOneInvoice({ id: route.params.id }, authReducer.token)).then(
        (invoice) => {
          setStatus(invoicesReducer.invoice.is_paid);
          let totalPriceWithDiscount =
            invoicesReducer.invoice?.order_details?.map(
              (el) => el.buying_price_after_discount * el.quantity
            );
          setTotals({
            ...totals,
            totalPriceWithDiscount: totalPriceWithDiscount.reduce(
              (a, b) => a + b,
              0
            ),
          });
        }
      );
    }
  }, [route.params.id]);

  if (
    authReducer.loading ||
    invoicesReducer.loading ||
    _objO(invoicesReducer.invoice)
  ) {
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
                  {invoicesReducer.invoice.invoice_number}
                </Text>
              </View>
              <View style={[styles.flexBetween, styles.responsiveDirection]}>
                <Text style={[styles.invoicesCardTitleStyle]}>
                  {t("merchantName")}:
                </Text>
                <Text style={[styles.invoicesCardInfoStyle]}>
                  {invoicesReducer.invoice.merchant_name}
                </Text>
              </View>
              <View style={[styles.flexBetween, styles.responsiveDirection]}>
                <Text style={[styles.invoicesCardTitleStyle]}>
                  {t("merchantAddress")}:
                </Text>
                <Text style={[styles.invoicesCardInfoStyle]}>
                  {invoicesReducer.invoice.merchant_address}
                </Text>
              </View>
              <View style={[styles.flexBetween, styles.responsiveDirection]}>
                <Text style={[styles.invoicesCardTitleStyle]}>
                  {t("cashierName")}:
                </Text>
                <Text style={[styles.invoicesCardInfoStyle]}>
                  {invoicesReducer.invoice.cashier_name}
                </Text>
              </View>
            </View>
            <View style={styles.invoicesHalfPart}>
              <View style={[styles.flexBetween, styles.responsiveDirection]}>
                <Text style={[styles.invoicesCardTitleStyle]}>
                  {t("date")}:
                </Text>
                <Text style={[styles.invoicesCardInfoStyle]}>
                  {new Date(invoicesReducer.invoice.date).toLocaleDateString()}
                </Text>
              </View>
              <View style={[styles.flexBetween, styles.responsiveDirection]}>
                <Text style={[styles.invoicesCardTitleStyle]}>
                  {t("time")}:
                </Text>
                <Text style={[styles.invoicesCardInfoStyle]}>
                  {new Date(invoicesReducer.invoice.date).toLocaleTimeString()}
                </Text>
              </View>
              <View style={[styles.flexBetween, styles.responsiveDirection]}>
                <Text style={[styles.invoicesCardTitleStyle]}>
                  {t("taxNumber")}:
                </Text>
                <Text style={[styles.invoicesCardInfoStyle]}>
                  {invoicesReducer.invoice.tax_number}
                </Text>
              </View>
              <View style={[styles.flexBetween, styles.responsiveDirection]}>
                <Text style={[styles.invoicesCardTitleStyle]}>
                  {t("status")}:
                </Text>

                <Text style={[styles.invoicesCardInfoStyle]}>
                  {status === 0 ? t("pending") : t("paid")}
                </Text>
                {/* <nativeElement.Icon name="edit" color="#4E7D9B" size={20} /> */}
                <View>
                  <NativeBaseProvider>
                    <VStack alignItems="center" space={10}>
                      <Select
                        selectedValue={
                          status || invoicesReducer.invoice.is_paid
                        }
                        minWidth={200}
                        accessibilityLabel="change invoice status"
                        placeholder={t("changeStatus")}
                        onValueChange={(itemValue) => {
                          setStatus(itemValue);
                          dispatch(
                            changeInvoiceStatus(
                              { id: route.params.id, is_paid: itemValue },
                              authReducer.token
                            )
                          ).then((res) => {
                            if (res.status === 200) {
                              dispatch(readInvoices(authReducer.token));
                              dispatch(
                                readOneInvoice(
                                  { id: route.params.id },
                                  authReducer.token
                                )
                              );
                            }
                          });
                        }}
                        _selectedItem={{
                          bg: "cyan.700",
                          endIcon: <CheckIcon size={4} />,
                        }}
                      >
                        <Select.Item label={t("pending")} value={0} />
                        <Select.Item label={t("paid")} value={1} />
                        <Select.Item label={t("returned")} value={2} />
                      </Select>
                    </VStack>
                  </NativeBaseProvider>
                </View>
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
                { width: "55%", paddingLeft: 5 },
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
            <View style={[styles.flexCenter, { width: "15%" }]}>
              <Text style={[styles.invoicesCardTitleStyle]}>{t("price")}</Text>
            </View>
          </View>
          {invoicesReducer.invoice?.order_details?.map?.((item, index) => (
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
                  { width: "55%" },
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
                      source={{ uri: item.image }}
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
                  {(item.price * 1).toFixed(2)}{" "}
                  <Text style={[styles.tableBodyTextStyle, { fontSize: 9 }]}>
                    SAR
                  </Text>
                </Text>
              </View>
              <View style={[styles.flexCenter, { width: "15%" }]}>
                <Text style={[styles.invoicesCardInfoStyle]}>
                  {(item.total_price * 1).toFixed(2)}{" "}
                  <Text style={[styles.tableBodyTextStyle, { fontSize: 9 }]}>
                    SAR
                  </Text>
                </Text>
              </View>
            </View>
          )) ?? <></>}
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
                  {(invoicesReducer.invoice.sub_total * 1).toFixed(2)}{" "}
                  <Text style={[styles.tableBodyTextStyle, { fontSize: 9 }]}>
                    SAR
                  </Text>
                </Text>
              </View>
              <View style={[styles.flexBetween, styles.responsiveDirection]}>
                <Text style={[styles.invoicesCardTitleStyle]}>
                  {t("discountAmount")}
                </Text>
                <Text style={[styles.invoicesCardInfoStyle]}>
                  {
                    (
                      invoicesReducer.invoice.sub_total * 1 -
                      totals.totalPriceWithDiscount
                    ).toFixed(2)
                  }
                  <Text style={[styles.tableBodyTextStyle, { fontSize: 9 }]}>
                    SAR
                  </Text>
                </Text>
              </View>

              <View style={[styles.flexBetween, styles.responsiveDirection]}>
                <Text style={[styles.invoicesCardTitleStyle]}>
                  {t("taxAmount")}
                </Text>
                <Text style={[styles.invoicesCardInfoStyle]}>
                  {(totals.totalPriceWithDiscount *
                    (Number(settingsReducer.settings.tax.value) / 100)).toFixed(2)}
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
                  {(invoicesReducer.invoice.total_price * 1).toFixed(2)}{" "}
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
                {invoicesReducer.invoice.customer_name}
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
                {t(`${invoicesReducer.invoice.paid_method}`)}
              </Text>
            </View>
            <View style={{ width: "20%" }}>
              <TouchableOpacity
                onPress={() => print(invoicesReducer.invoice.invoice_link)}
              >
                <nativeElement.Icon
                  name="print"
                  size={80}
                  type="ionicon"
                  color={primaryColor}
                />
              </TouchableOpacity>
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
                {invoicesReducer.invoice.customer_phone}
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
              <Text style={{ color: primaryColor }}>
                {invoicesReducer.invoice.tax_percentage}
                {t("taxIncluded")}
              </Text>
            </View>
            <View style={[styles.flexCenterm, { marginTop: 10 }]}>
              <View style={{ width: 150, height: 150 }}>
                <QRCode
                  content={
                    invoicesReducer.invoice.invoice_link ||
                    "https://reactnative.com"
                  }
                  size={150}
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
