import { Icon } from "react-native-elements";
import React from "react";
const secondaryColor = "#e5e5e5";
export const renderHeaderIcons = (iconName) => {
  switch (iconName) {
    case "newUser":
      return (
        <Icon
          name="person-add-outline"
          size={35}
          type="ionicon"
          color={secondaryColor}
        />
      );
    case "settings":
      return (
        <Icon
          name="settings-outline"
          size={35}
          type="ionicon"
          color={secondaryColor}
        />
      );
    case "invoices":
      return (
        <Icon
          name="receipt-outline"
          size={35}
          type="ionicon"
          color={secondaryColor}
        />
      );
    default:
      return (
        <Icon
          name="receipt-outline"
          size={35}
          type="ionicon"
          color={secondaryColor}
        />
      );
  }
};
