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
  nativeElement,
  _objI,
  localize,
} from "../utils/allImports";
import BackButton from "../components/backButton";
import { useTranslation } from "react-i18next";

export default function Scanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { t } = useTranslation();
  const [scannerState, setScannerState] = useState({
    type: "red",
    message: t("productNotFound"),
  });
  const productsReducer = useSelector((state) => state.productsReducer);
  const styles = globalStyle();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  useEffect(() => {
    localize.changeLanguage("en");
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
      s;
      setScannerState({ type: "green", message: t("scanned") });
    } else {
      setScannerState({ type: "red", message: t("productNotFound") });
    }
  };
  useEffect(() => {
    let timeout = setTimeout(() => {
      setScanned(false);
      setScannerState({
        type: "",
        message: "",
      });
    }, 1500);
    return () => clearTimeout(timeout);
  }, [scanned]);
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BackButton Icon={nativeElement.Icon} navigation={navigation} top={35} />
      {scanned && (
        <nativeElement.Overlay isVisible={true}>
          <View
            style={[
              styles.flexStart,
              styles.responsiveDirection,
              { padding: 15, width: 320 },
            ]}
          >
            {scannerState.type === "green" ? (
              <nativeElement.Icon
                name="checkmark-circle-outline"
                size={35}
                type="ionicon"
                color="green"
                style={{
                  paddingLeft: localize.language === "en" ? 0 : 10,
                  paddingRight: localize.language === "en" ? 10 : 0,
                }}
              />
            ) : scannerState.type === "red" ? (
              <nativeElement.Icon
                name="alert-circle-outline"
                size={35}
                type="ionicon"
                color="red"
                style={{
                  paddingLeft: localize.language === "en" ? 0 : 10,
                  paddingRight: localize.language === "en" ? 10 : 0,
                }}
              />
            ) : (
              <></>
            )}

            <Text>{scannerState.message}</Text>
          </View>
        </nativeElement.Overlay>
      )}
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
// task_alt;
// alert - circle - outline;
