import {
  React,
  nativeElement,
  globalStyle,
  renderHeaderIcons,
} from "../utils/allImports";
import { View, Text } from "react-native";
import BackButton from "../components/backButton";
import { useTranslation } from "react-i18next";

export default function Header({ headerText, iconType, navigation }) {
  const styles = globalStyle();
  const { t } = useTranslation();
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
