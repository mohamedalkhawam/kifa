import {
  React,
  useSelector,
  useDispatch,
  useState,
  useEffect,
  globalStyle,
  nativeElement,
  _objI,
  _objO,
} from "../utils/allImports";
import { Platform } from "react-native";
import * as Print from "expo-print";
import { useTranslation } from "react-i18next";
export default function PrintButton() {
  const { t } = useTranslation();
  const print = async () => {
    if (Platform.OS === "android") {
      Print.printAsync({})
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    } else {
      Print.selectPrinterAsync()
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };
  const styles = globalStyle();
  return (
    <nativeElement.Button
      title={t("print")}
      onPress={() => print()}
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
  );
}
