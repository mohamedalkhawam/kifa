import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  React,
  useState,
  useEffect,
  globalStyle,
  useDispatch,
  addProduct,
  useSelector,
  _objI,
} from "../utils/allImports";
import { useTranslation } from "react-i18next";
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const productsReducer = useSelector((state) => state.productsReducer);
  const styles = globalStyle();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (
      productsReducer.products.length > 0 &&
      productsReducer.products.find((product) => product.barcode === data) &&
      productsReducer.products.find((product) => product.barcode === data)
        .barcode === data
    ) {
      dispatch(
        addProduct(
          productsReducer.products.find((product) => product.barcode === data)
        )
      );
      alert(t("scanned"));
    } else {
      alert(t("productNotFound"));
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setScanned(false);
    }, 1000);
  }, [scanned]);
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ position: "absolute", width: "100%", height: "100%" }}
        barCodeTypes={["org.gs1.EAN-13", "org.gs1.EAN-8"]}
      />
      {/* {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )} */}
    </View>
  );
}
