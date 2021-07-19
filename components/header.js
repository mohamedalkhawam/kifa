import {
  React,
  nativeElement,
  secondaryColor,
  globalStyle,
  renderHeaderIcons,
} from "../utils/allImports";
import { View, Text, useWindowDimensions } from "react-native";
import BackButton from "../components/backButton";
import { useTranslation } from "react-i18next";

export default function Header({ headerText, iconType, navigation }) {
  const styles = globalStyle();
  const { t } = useTranslation();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  return (
    <View style={[styles.header]}>
      <BackButton Icon={nativeElement.Icon} navigation={navigation} top={35} />
      <View style={[styles.responsiveDirection, { marginHorizontal: 15 }]}>
        {renderHeaderIcons(iconType)}
      </View>
      <Text style={styles.headerText}>{t(headerText)}</Text>
    </View>
  );
}
