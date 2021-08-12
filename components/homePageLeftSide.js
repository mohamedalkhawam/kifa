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
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
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
  const appReducer = useSelector((state) => state.appReducer);
  const authReducer = useSelector((state) => state.AuthReducer);
  const customersReducer = useSelector((state) => state.customersReducer);
  const [query, setQuery] = useState("");
  const [searchObject, setSearchObject] = useState({});
  // useEffect(() => {
  //   console.log(appReducer.list);
  // }, [appReducer.list]);
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

  ///////////////////////////////////////////////////////////////////////////////
  const onTextChanged = (value) => {
    let suggestions = [];
    setQuery(value);
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions =
        customersReducer.customers
          .sort()
          .filter((v) => regex.test(v["reference_id"])).length > 0
          ? customersReducer.customers
              .sort()
              .filter((v) => regex.test(v["reference_id"]))
          : [{ ["reference_id"]: "Not found..." }];
    }
    setSuggestions(suggestions);
  };

  //////////////////////////////////////////////////////////////////////
  const suggestionSelected = (value, searchQeury) => {
    setQuery(searchQeury);
    setSuggestions([]);
    setSearchObject(value);
  };
  ////////////////////////////////////////////////////////////////////////////
  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return suggestions.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={styles.searchListStyle}
        onPress={() => suggestionSelected(item, item["reference_id"])}
      >
        <nativeElement.Divider
          orientation="horizontal"
          width={1}
          style={{ paddingVertical: 0, marginTop: 0 }}
        />
        <View style={{ padding: 15 }}>
          {item["reference_id"] !== "Not found..." ? (
            <Text
              style={{
                fontSize: 16,
                paddingBottom: 5,
                color: "#555",
                fontWeight: "bold",
              }}
            >
              {item["name"]}
            </Text>
          ) : (
            <View></View>
          )}

          <Text
            style={{
              fontSize: 12,
              color: "#666",
            }}
          >
            {item["reference_id"]}
          </Text>
        </View>
        <nativeElement.Divider
          orientation="horizontal"
          width={1}
          style={{ paddingVertical: 0, marginBottom: 0 }}
        />
      </TouchableOpacity>
    ));
  };

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
            <Text style={styles.HomePageLeftSideTitleStyle}>Facility Name</Text>
          </View>
          <View
            style={[styles.flexBetween, { height: 50, position: "relative" }]}
          >
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

            <nativeElement.Input
              onFocus={() => setSuggestions(customersReducer.customers)}
              onPress={() => setSuggestions(customersReducer.customers)}
              onBlur={() => {
                let timeout = setTimeout(() => setSuggestions([]), 1000);
                return () => clearTimeout(timeout);
              }}
              leftIcon={
                <nativeElement.Icon
                  name={"search"}
                  color="#4E7D9B"
                  size={25}
                  type="ionicon"
                />
              }
              value={query}
              rightIcon={
                <nativeElement.Icon
                  onPress={() => {
                    setQuery("");
                    setSuggestions([]);
                    setSearchObject({});
                  }}
                  name="close"
                  size={25}
                  color="#4E7D9B"
                />
              }
              placeholder={t("searchCustomer")}
              containerStyle={{
                height: 43,
                width: "70%",
              }}
              inputStyle={[
                styles.responsiveTextDirection,
                { color: "#4E7D9B" },
              ]}
              inputContainerStyle={[
                styles.responsiveDirection,
                styles.AuthInputContainerStyle,
                {
                  height: 40,
                },
              ]}
              onChangeText={(text) => onTextChanged(text)}
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
                  <Text>
                    <Text style={styles.bold}>Customer:{"  "} </Text>
                    {searchObject.name}
                  </Text>
                ) : (
                  <View></View>
                )}
                {_objI(searchObject) && searchObject.name ? (
                  <Text>
                    <Text style={styles.bold}>Phone: </Text>{" "}
                    {searchObject.phone}
                  </Text>
                ) : (
                  <View></View>
                )}
                <ScrollView
                  style={{
                    width: "100%",
                    maxHeight: 213,
                    position: "absolute",
                    backgroundColor: "white",
                    top: _objI(searchObject) ? -15 : -25,
                  }}
                >
                  {renderSuggestions()}
                </ScrollView>
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
          <nativeElement.Button
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
          />
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
        </View>
        {/* end action Buttons*/}
      </View>
    );
  }
}
