import {
  React,
  useSelector,
  useDispatch,
  useState,
  useEffect,
  nativeElement,
  globalStyle,
  Loader,
  primaryColor,
  secondaryColor,
  _objI,
  _objO,
  addProduct,
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
import ProductCard from "./productCard";
import { readProducts } from "../redux/actions/products";
export default function HomePageLeftSide({ navigation }) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const authReducer = useSelector((state) => state.AuthReducer);
  const productsReducer = useSelector((state) => state.productsReducer);
  const [searchValue, setSearchValue] = useState("");
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [searchObject, setSearchObject] = useState({});
  const [suggestions, setSuggestions] = useState([]);

  const dispatch = useDispatch();
  const styles = globalStyle();
  useEffect(() => {
    dispatch(readProducts(authReducer.token))
      .then((res) => console.log(res.data))
      .catch((err) => alert(JSON.stringify("errrr")));
  }, []);
  ///////////////////////////////////////////////////////////////////////
  const onTextChanged = (value) => {
    let suggestions = [];
    setQuery(value);
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions =
        productsReducer.products.sort().filter((v) => regex.test(v["barcode"]))
          .length > 0
          ? productsReducer.products
              .sort()
              .filter((v) => regex.test(v["barcode"]))
          : [{ ["barcode"]: "Not found..." }];
    }
    setSuggestions(suggestions);
  };
  ///////////////////////////////////////////////////////////////////////
  const suggestionSelected = (value, searchQeury) => {
    setQuery(searchQeury);
    setSuggestions([]);
    setSearchObject(value);
    dispatch(
      addProduct({
        name: value.name || value.name_en,
        quantity: value.quantity,
        price: value.price * 1 || value.buying_price * 1,
        id: value.id,
      })
    );
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
        onPress={() => suggestionSelected(item, item["barcode"])}
      >
        <nativeElement.Divider
          orientation="horizontal"
          width={1}
          style={{ paddingVertical: 0, marginTop: 0 }}
        />
        <View style={{ padding: 15 }}>
          {item["barcode"] !== "Not found..." ? (
            <Text
              style={{
                fontSize: 16,
                paddingBottom: 5,
                color: "#555",
                fontWeight: "bold",
              }}
            >
              {item["name"] || item["name_en"]}
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
            {item["barcode"]}
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
  ///////////////////////////////////////////////////////////////////////////
  if (authReducer.loadingg || productsReducer.loading) {
    return <Loader bgc={primaryColor} color={secondaryColor} />;
  } else {
    return (
      <View style={[styles.container, { backgroundColor: "#4E7D9B" }]}>
        {/* Header Start */}
        <View style={styles.HomePageRightSizeHeader}>
          <View style={styles.flexCenter}>
            <Text
              style={[styles.HomePageLeftSideTitleStyle, { color: "#e5e5e5" }]}
            >
              {t("products")}
            </Text>
          </View>
          <View
            style={[styles.flexBetween, { height: 50, position: "relative" }]}
          >
            <nativeElement.Input
              onFocus={() => setSuggestions(productsReducer.products)}
              onPress={() => setSuggestions(productsReducer.products)}
              onBlur={() => {
                let timeout = setTimeout(() => setSuggestions([]), 1000);
                return () => clearTimeout(timeout);
              }}
              leftIcon={
                <nativeElement.Icon
                  name={"search"}
                  color="#e5e5e5"
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
                  color="#e5e5e5"
                />
              }
              placeholder={t("searchProduct")}
              containerStyle={{
                height: 43,
                width: "85%",
              }}
              placeholderTextColor="#e5e5e5"
              inputStyle={[
                styles.responsiveTextDirection,
                { color: "#e5e5e5" },
              ]}
              inputContainerStyle={[
                styles.responsiveDirection,
                styles.AuthInputContainerStyle,
                {
                  borderColor: "#e5e5e5",
                  height: 40,
                },
              ]}
              onChangeText={(text) => onTextChanged(text)}
              // onFocus={() => alert("dd")}
            />
            <nativeElement.Button
              onPress={() => navigation.navigate("scanner")}
              type="clear"
              icon={
                <nativeElement.Icon
                  name="camera-outline"
                  size={35}
                  type="ionicon"
                  color="#e5e5e5"
                />
              }
              containerStyle={[styles.flexStart, { width: "10%" }]}
            />
          </View>
          {suggestions.length > 0 || _objI(searchObject) ? (
            <View style={[styles.flexCenter]}>
              <View
                style={[
                  styles.flexStart,
                  {
                    width: "81%",
                    flexDirection: "column",
                    position: "relative",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                  },
                ]}
              >
                <ScrollView
                  style={{
                    width: "100%",
                    maxHeight: 213,
                    position: "absolute",
                    backgroundColor: "white",
                    top: _objI(searchObject) ? -15 : -25,
                    left: -39,
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
        <ScrollView style={{ paddingHorizontal: 20, zIndex: -10 }}>
          <View style={styles.productCardContainerStyle}>
            {productsReducer.products.map((item, index) => (
              <ProductCard
                key={index}
                name={item.name_en || item.name}
                price={item.buying_price}
                id={item.id}
                image={item.image}
              />
            ))}
          </View>
          <View style={{ marginVertical: 50 }}></View>
        </ScrollView>

        {/* end page body */}
      </View>
    );
  }
}
