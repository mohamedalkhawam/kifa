import {
  React,
  useSelector,
  useDispatch,
  useState,
  useEffect,
  nativeElement,
  globalStyle,
  addOne,
  removeOne,
  Loader,
  secondaryColor,
  primaryColor,
  _objI,
  _objO,
  clearList,
} from "../utils/allImports";
import PrintButton from "../components/printButton";
import { useTranslation } from "react-i18next";
import AutoComplete from "./newAutoComplete";
import { View, Text, ScrollView, Platform } from "react-native";
import { logout } from "../redux/actions/Auth";
import { readCustomers } from "../redux/actions/customers";
import { createOrder } from "../redux/actions/order";
export default function HomePageLeftSide({ navigation }) {
  const [totals, setTotals] = useState({
    price: 0,
    quantity: 0,
  });
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [suggestions, setSuggestions] = useState([]);
  const [searchBy, setSearchBy] = useState(["name", "phone", "reference_id"]);
  const appReducer = useSelector((state) => state.appReducer);
  const authReducer = useSelector((state) => state.AuthReducer);
  const customersReducer = useSelector((state) => state.customersReducer);
  const [query, setQuery] = useState("");
  const [searchObject, setSearchObject] = useState({});
  useEffect(() => {
    let totalPrice = appReducer.list.map((el) => el.price * el.quantity);
    let totalquantity = appReducer.list.map((el) => el.quantity);
    setTotals({
      ...totals,
      quantity: totalquantity.reduce((a, b) => a + b, 0),
      price: totalPrice.reduce((a, b) => a + b, 0),
    });
  }, [appReducer.list]);
  const styles = globalStyle();
  useEffect(() => {
    dispatch(readCustomers(authReducer.token));
  }, []);
  useEffect(() => {}, []);
  if (authReducer.loading || customersReducer.loading) {
    return <Loader bgc={secondaryColor} color={primaryColor} />;
  } else {
    return (
      <View style={styles.container}>
        {/* Header Start */}
        <View style={styles.HomePageLeftSizeHeader}>
          <View
            style={{
              position: "absolute",
              left: 10,
              top: 10,
              flexDirection: "row",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <nativeElement.Button
              onPress={() => dispatch(logout())}
              type="clear"
              icon={
                <nativeElement.Icon name="logout" size={30} color="#4E7D9B" />
              }
            />
            <Text style={{ color: primaryColor }}>Logout</Text>
          </View>
          <View style={styles.flexCenter}>
            <Text style={styles.HomePageLeftSideTitleStyle}>Kifa pos</Text>
          </View>
          <View style={[styles.flexBetween, { height: 50 }]}>
            <nativeElement.Button
              onPress={() => navigation.navigate("menu")}
              type="clear"
              icon={
                <nativeElement.Icon
                  name="grid-outline"
                  size={30}
                  type="ionicon"
                  color="#4E7D9B"
                />
              }
            />

            <AutoComplete
              data={customersReducer.customers}
              btnWidth="70%"
              setQuery={setQuery}
              query={query}
              searchElement={"reference_id"}
              renderedData={""}
              placeholder={t("searchCustomer")}
              name={"name"}
              pressHandler={setSearchObject}
              overlayWidth="50%"
              overLayHeight="100%"
              left="-25%"
              btnBorderColor={primaryColor}
              btnTextColor={primaryColor}
              btnBorderWidth={1}
              btnBorderRad={15}
              containerMarginTop={0}
              searchBy={searchBy}
            />
            <nativeElement.Button
              onPress={() => navigation.navigate("newCustomer")}
              type="clear"
              icon={
                <nativeElement.Icon
                  name="add-circle-outline"
                  size={35}
                  type="ionicon"
                  color="#4E7D9B"
                />
              }
            />
          </View>
          {suggestions.length > 0 || _objI(searchObject) ? (
            <View style={[styles.flexCenter]}>
              <View
                style={[
                  styles.flexStart,
                  {
                    width: "66%",
                    flexDirection: "column",
                    position: "relative",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                  },
                ]}
              >
                {_objI(searchObject) && searchObject.name ? (
                  <View style={[styles.flexBetween]}>
                    <Text style={styles.bold}>
                      Customer:{"  "}{" "}
                      <Text style={{ fontWeight: "400" }}>
                        {searchObject.name}
                      </Text>
                    </Text>
                    <nativeElement.Button
                      style={{ margin: 0, padding: 0 }}
                      containerStyle={{ margin: 0, padding: 0 }}
                      onPress={() => setSearchObject({})}
                      type="clear"
                      icon={
                        <nativeElement.Icon
                          name="close"
                          size={25}
                          type="ionicon"
                          color="#4E7D9B"
                        />
                      }
                    />
                  </View>
                ) : (
                  <></>
                )}
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
        {/* Header end */}
        {/* start page body */}
        <ScrollView
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
            position: "relative",
            zIndex: -10,
          }}
        >
          <View
            style={[
              styles.flexBetween,
              styles.responsiveDirection,
              { marginBottom: 10 },
            ]}
          >
            <View
              style={{ width: "12%", borderWidth: 1, alignItems: "center" }}
            >
              <Text style={[styles.tableHeaderTextStyle]}>#</Text>
            </View>
            <View
              style={{ width: "45%", borderWidth: 1, alignItems: "center" }}
            >
              <Text style={[styles.tableHeaderTextStyle]}>
                {t("productName")}
              </Text>
            </View>

            <View
              style={{ width: "25%", borderWidth: 1, alignItems: "center" }}
            >
              <Text style={[styles.tableHeaderTextStyle]}>{t("quantity")}</Text>
            </View>
            <View
              style={{ width: "20%", borderWidth: 1, alignItems: "center" }}
            >
              <Text style={[styles.tableHeaderTextStyle]}>{t("price")}</Text>
            </View>
          </View>
          {appReducer.list.map((item, index) => (
            <View
              key={index}
              style={[styles.flexBetween, styles.responsiveDirection]}
            >
              <View style={{ width: "12%", alignItems: "center" }}>
                <Text style={[styles.tableBodyTextStyle, { flexShrink: 1 }]}>
                  {index + 1}
                </Text>
              </View>
              <View style={{ width: "45%", alignItems: "center" }}>
                <Text style={[styles.tableBodyTextStyle]}>{item.name}</Text>
              </View>

              <View
                style={{
                  width: "25%",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <nativeElement.Button
                  onPress={() => dispatch(removeOne(item.id))}
                  type="clear"
                  icon={
                    <nativeElement.Icon
                      name="remove"
                      size={25}
                      color="#4E7D9B"
                      type="material"
                    />
                  }
                />
                <Text style={[styles.tableBodyTextStyle]}>{item.quantity}</Text>
                <nativeElement.Button
                  onPress={() => dispatch(addOne(item.id))}
                  type="clear"
                  icon={
                    <nativeElement.Icon
                      name="add"
                      size={25}
                      color="#4E7D9B"
                      type="material"
                    />
                  }
                />
              </View>
              <View style={{ width: "20%", alignItems: "center" }}>
                <Text style={[styles.tableBodyTextStyle, { flexShrink: 1 }]}>
                  {item.price.toFixed(2)}{" "}
                  <Text style={[styles.tableBodyTextStyle, { fontSize: 9 }]}>
                    SAR
                  </Text>
                </Text>
              </View>
            </View>
          ))}
          {appReducer.list.length > 0 ? (
            <>
              <nativeElement.Divider
                orientation="horizontal"
                width={5}
                style={{ paddingVertical: 5, marginBottom: 5 }}
              />
              <View style={[styles.flexBetween, styles.responsiveDirection]}>
                <View style={{ width: "12%", alignItems: "center" }}>
                  <Text
                    style={[styles.tableBodyTextStyle, { fontWeight: "bold" }]}
                  >
                    {t("totals")}
                  </Text>
                </View>
                <View style={{ width: "45%", alignItems: "center" }}>
                  <Text style={[styles.tableBodyTextStyle]}></Text>
                </View>

                <View
                  style={{
                    width: "25%",

                    alignItems: "center",
                  }}
                >
                  <Text style={[styles.tableBodyTextStyle]}>
                    {totals.quantity}
                  </Text>
                </View>
                <View style={{ width: "20%", alignItems: "center" }}>
                  <Text style={[styles.tableBodyTextStyle, { flexShrink: 1 }]}>
                    {totals.price}{" "}
                    <Text style={[styles.tableBodyTextStyle, { fontSize: 9 }]}>
                      SAR
                    </Text>
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <View style={[styles.flexCenter]}>
              <Text>{t("noProductsInsertedYet")}</Text>
            </View>
          )}
          <View style={{ marginVertical: 75 }}></View>
        </ScrollView>
        {/* end page body */}

        {/* start action Buttons */}
        <View style={styles.floatingActionButtonsContainer}>
          {/* <nativeElement.Button
            title={t("print")}
            onPress={() => dispatch(logout())}
            type="solid"
            buttonStyle={styles.floatingActionButtonsStyle}
            icon={
              <nativeElement.Icon
                name="print"
                size={20}
                type="ionicon"
                color="#F8F8F8"
                style={{ paddingRight: 7 }}
              />
            }
          /> */}
          <PrintButton />
          <nativeElement.Button
            title={t("save")}
            onPress={() => {
              dispatch(
                createOrder(
                  {
                    cashier_id: authReducer.user.id,
                    customer_id: searchObject.id,
                    cost_with_tax: totals.price + totals.price * 0.15,
                    cost_without_tax: totals.price,
                    tax: totals.price * 0.15,
                    is_paid: 1,
                    order_details: [...appReducer.list],
                  },
                  authReducer.token
                )
              )
                .then((res) => {
                  if (res.status === 200) {
                    setSearchObject({});
                    setQuery("");
                    dispatch(clearList());
                    alert(t("dataSentSuc"));
                    setTotals({
                      price: 0,
                      quantity: 0,
                    });
                  } else {
                    alert(t("somethingWrongHappen"));
                  }
                })
                .catch((err) => {});
            }}
            type="solid"
            buttonStyle={styles.floatingActionButtonsStyle}
            icon={
              <nativeElement.Icon
                name="save"
                size={20}
                type="ionicon"
                color="#F8F8F8"
                style={{ paddingRight: 7 }}
              />
            }
          />
          <nativeElement.Button
            title={t("pending")}
            onPress={() => {
              dispatch(
                createOrder(
                  {
                    cashier_id: authReducer.user.id,
                    customer_id: searchObject.id,
                    cost_with_tax: totals.price + totals.price * 0.15,
                    cost_without_tax: totals.price,
                    tax: totals.price * 0.15,
                    is_paid: 0,
                    order_details: [...appReducer.list],
                  },
                  authReducer.token
                )
              )
                .then((res) => {
                  if (res.status === 200) {
                    setSearchObject({});
                    setQuery("");
                    dispatch(clearList());
                    alert(t("dataSentSuc"));
                    setTotals({
                      price: 0,
                      quantity: 0,
                    });
                  } else {
                    alert(t("somethingWrongHappen"));
                  }
                })
                .catch((err) => {});
            }}
            buttonStyle={styles.floatingActionButtonsStyle}
            type="solid"
            icon={
              <nativeElement.Icon
                name="pending"
                size={21}
                color="#F8F8F8"
                style={{ paddingRight: 7 }}
              />
            }
          />
          <nativeElement.Button
            title={t("clear")}
            onPress={() => dispatch(clearList())}
            type="solid"
            buttonStyle={styles.floatingActionButtonsStyle}
            icon={
              <nativeElement.Icon
                name="clear"
                size={20}
                color="#F8F8F8"
                style={{ paddingRight: 4 }}
              />
            }
          />
        </View>
        {/* end action Buttons*/}
      </View>
    );
  }
}
