import {
  React,
  useSelector,
  useDispatch,
  useState,
  useEffect,
  nativeElement,
  globalStyle,
  localize,
  AsyncStorage,
  validator,
  addOne,
  removeOne,
} from "../utils/allImports";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
export default function HomePageLeftSide({ navigation }) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [formData, setFormData] = useState({});
  const [totals, setTotals] = useState({
    price: 0,
    quantity: 0,
  });
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const { t } = useTranslation();
  const appReducer = useSelector((state) => state.appReducer);
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
  return (
    <View style={styles.container}>
      {/* Header Start */}
      <View style={styles.HomePageLeftSizeHeader}>
        <View style={styles.flexCenter}>
          <Text style={styles.HomePageLeftSideTitleStyle}>Facility Name</Text>
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
          <nativeElement.Input
            leftIcon={
              <nativeElement.Icon
                name={"search"}
                color="#4E7D9B"
                size={25}
                type="ionicon"
              />
            }
            value={searchValue}
            rightIcon={
              <nativeElement.Icon
                onPress={(text) => setSearchValue(text)}
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
            inputStyle={[styles.responsiveTextDirection, { color: "#4E7D9B" }]}
            inputContainerStyle={[
              styles.responsiveDirection,
              styles.AuthInputContainerStyle,
              {
                height: 40,
              },
            ]}
            onChangeText={(text) => setSearchValue(text)}
            // onFocus={() => alert("dd")}
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
      </View>
      {/* Header end */}
      {/* start page body */}
      <ScrollView style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <View
          style={[
            styles.flexBetween,
            styles.responsiveDirection,
            { marginBottom: 10 },
          ]}
        >
          <View style={{ width: "12%", borderWidth: 1, alignItems: "center" }}>
            <Text style={[styles.tableHeaderTextStyle]}>#</Text>
          </View>
          <View style={{ width: "45%", borderWidth: 1, alignItems: "center" }}>
            <Text style={[styles.tableHeaderTextStyle]}>
              {t("productName")}
            </Text>
          </View>

          <View style={{ width: "25%", borderWidth: 1, alignItems: "center" }}>
            <Text style={[styles.tableHeaderTextStyle]}>{t("quantity")}</Text>
          </View>
          <View style={{ width: "20%", borderWidth: 1, alignItems: "center" }}>
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
          onPress={() => navigation.navigate("menu")}
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
          onPress={() => navigation.navigate("menu")}
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
          onPress={() => navigation.navigate("menu")}
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
