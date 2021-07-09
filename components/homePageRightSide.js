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
export default function HomePageLeftSide({ navigation }) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [searchValue, setSearchValue] = useState("");
  const { t } = useTranslation();
  const arr = [
    { name: "Abalo", quantity: 84, price: 15.0, id: 1 },
    { name: "T-shirt", quantity: 45, price: 15.0, id: 2 },
    { name: "Pants", quantity: 13, price: 15.0, id: 3 },
    { name: "Pants", quantity: 13, price: 15.0, id: 4 },
    { name: "Pants", quantity: 13, price: 15.0, id: 5 },
    { name: "Pants", quantity: 13, price: 15.0, id: 6 },
    { name: "Abalo", quantity: 84, price: 15.0, id: 7 },
    { name: "Pants", quantity: 13, price: 15.0, id: 9 },
    { name: "Pants", quantity: 13, price: 15.0, id: 10 },
    { name: "Pants", quantity: 13, price: 15.0, id: 11 },
    { name: "Pants", quantity: 13, price: 15.0, id: 12 },
    { name: "Abalo", quantity: 84, price: 15.0, id: 13 },
    { name: "Pants", quantity: 13, price: 15.0, id: 14 },
    { name: "Pants", quantity: 13, price: 15.0, id: 15 },
    { name: "Pants", quantity: 13, price: 15.0, id: 16 },
    { name: "Pants", quantity: 13, price: 15.0, id: 17 },
    { name: "Pants", quantity: 13, price: 15.0, id: 18 },
    { name: "Pants", quantity: 13, price: 15.0, id: 19 },
  ];
  useEffect(() => {
    localize.changeLanguage("en");
  }, []);
  const styles = globalStyle();
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
            inputStyle={[styles.responsiveTextDirection, { color: "#e5e5e5" }]}
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
          {arr.map((item, index) => (
            <ProductCard
              key={index}
              name={item.name}
              price={item.price}
              id={item.id}
            />
          ))}
        </View>
        <View style={{ marginVertical: 50 }}></View>
      </ScrollView>

      {/* end page body */}
    </View>
  );
}
