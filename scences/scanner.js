import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  React,
  useState,
  useEffect,
  globalStyle,
  useDispatch,
  addProduct,
} from "../utils/allImports";
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const styles = globalStyle();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    dispatch(
      addProduct({
        name: "Pants",
        quantity: 13,
        price: 15.0,
        id: Math.floor(Math.random() * 10000) + 1,
      })
    );
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
        barCodeTypes={["org.gs1.EAN-13"]}
      />
      {/* {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )} */}
    </View>
  );
}
