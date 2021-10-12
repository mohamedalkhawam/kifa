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
  addProduct,
} from "../utils/allImports";
import { useTranslation } from "react-i18next";
import { View, Text, ScrollView } from "react-native";
import ProductCard from "./productCard";
import { readProducts } from "../redux/actions/products";
import AutoComplete from "./newAutoComplete";
export default function HomePageLeftSide({ navigation }) {
  const authReducer = useSelector((state) => state.AuthReducer);
  const productsReducer = useSelector((state) => state.productsReducer);
  const [searchBy, setSearchBy] = useState(["name", "barcode"]);
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const styles = globalStyle();
  useEffect(() => {
    dispatch(readProducts(authReducer.token));
  }, []);
  const pressHandler = (value) => {
    dispatch(
      addProduct({
        name: value.name || value.name_en,
        quantity: value.quantity,
        price: value.price * 1 || value.buying_price * 1,
        id: value.id,
        discount: value.discount,
        buying_price_after_discount: value.buying_price_after_discount,
      })
    );
  };
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
          <View style={[styles.flexBetween, { height: 50 }]}>
            <AutoComplete
              data={productsReducer.products}
              btnWidth="85%"
              setQuery={setQuery}
              query={query}
              renderedData={""}
              placeholder={t("searchProduct")}
              name={"name"}
              pressHandler={pressHandler}
              overlayWidth="50%"
              overLayHeight="100%"
              left="25%"
              btnBorderColor={primaryColor}
              btnTextColor={primaryColor}
              btnBorderWidth={1}
              btnBorderRad={15}
              containerMarginTop={0}
              searchBy={searchBy}
              searchElement={"barcode"}
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
                discount={item.discount}
                buying_price_after_discount={item.buying_price_after_discount}
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
