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
  Loader,
  primaryColor,
  secondaryColor,
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

  const dispatch = useDispatch();
  useEffect(() => {
    localize.changeLanguage("en");
  }, []);
  useEffect(() => {
    dispatch(readProducts(authReducer.token))
      .then((res) => console.log(res.data))
      .catch((err) => alert(JSON.stringify("errrr")));
  }, []);
  const styles = globalStyle();
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
            <nativeElement.Input
              leftIcon={
                <nativeElement.Icon
                  name={"search"}
                  color="#e5e5e5"
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
              onChangeText={(text) => setSearchValue(text)}
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
        </View>
        {/* Header end */}
        {/* start page body */}
        <ScrollView style={{ paddingHorizontal: 20 }}>
          <View style={styles.productCardContainerStyle}>
            {productsReducer.products.map((item, index) => (
              <ProductCard
                key={index}
                name={item.name_en || item.name_ar}
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
