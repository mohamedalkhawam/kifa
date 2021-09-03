import {
  React,
  useState,
  globalStyle,
  nativeElement,
  primaryColor,
  secondaryColor,
} from "../utils/allImports";
import { useTranslation } from "react-i18next";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
export default function AutocompleteSearch({
  data,
  query,
  setQuery,
  placeholder,
  searchElement,
  name,
  pressHandler,
  btnWidth,
  overlayWidth,
  overLayHeight,
  top,
  left,
  right,
  bottom,
  btnBorderColor,
  btnBgColor,
  btnTextColor,
  btnBorderWidth,
  btnBorderRad,
  containerMarginTop,
  searchBy,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [visible, setVisible] = useState(false);
  const [filterBy, setFilterBy] = useState(searchElement ?? "");
  const onTextChanged = (value) => {
    setQuery(value);
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions =
        data.sort().filter((v) => regex.test(v[filterBy])).length > 0
          ? data.sort().filter((v) => regex.test(v[filterBy]))
          : [{ [filterBy]: "Not found..." }];
    }
    setSuggestions(suggestions);
  };
  const suggestionSelected = (value, searchQeury) => {
    let timeout;
    setQuery(searchQeury);
    setSuggestions([]);
    if (pressHandler) {
      pressHandler(value);
    }
    timeout = setTimeout(() => {
      setVisible(!visible);
    }, 100);
    return () => clearTimeout(timeout);
  };
  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return suggestions.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.searchListStyle]}
        onPress={() => suggestionSelected(item, item[filterBy])}
      >
        <nativeElement.Divider
          orientation="horizontal"
          width={1}
          style={{
            paddingVertical: 0,
            marginTop: containerMarginTop ? containerMarginTop : 0,
          }}
        />
        <View style={[{ padding: 15 }]}>
          {name && item[filterBy] !== "Not found..." ? (
            <Text
              style={{
                fontSize: 16,
                paddingBottom: 5,
                color: "#555",
                fontWeight: "bold",
              }}
            >
              {item[name]}
            </Text>
          ) : (
            <View></View>
          )}

          <Text
            style={{ fontSize: name ? 12 : 15, color: name ? "#666" : "#444" }}
          >
            {item[filterBy]}
          </Text>
        </View>
        <nativeElement.Divider
          orientation="horizontal"
          width={1}
          style={{ paddingVertical: 0, marginBottom: 0 }}
        />
      </TouchableOpacity>
    ));
  };

  const styles = globalStyle();
  const { t, i18n } = useTranslation();
  return (
    <View
      style={[
        styles.autocompleteWrapper,
        { width: btnWidth ? btnWidth : "100%", marginTop: 10 },
      ]}
    >
      <View style={styles.autocompleteContainerView}>
        <View
          style={[
            {
              position: "relative",
              width: "100%",
              borderWidth: btnBorderWidth ? btnBorderWidth : 0,
              borderColor: btnBorderColor ? btnBorderColor : "#eee",
              backgroundColor: btnBgColor ? btnBgColor : "white",
              borderRadius: btnBorderRad ? btnBorderRad : 15,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.autoCompleteInput,
              {
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
              },
              styles.responsiveDirection,
            ]}
            onPress={() => {
              setSuggestions(data);
              setVisible(!visible);
              setQuery("");
            }}
          >
            <Text style={{ color: btnTextColor ? btnTextColor : "#555" }}>
              {placeholder}
            </Text>
          </TouchableOpacity>
          <nativeElement.Overlay
            overlayStyle={{
              width: overlayWidth ? overlayWidth : "100%",
              height: overLayHeight ? overLayHeight : "100%",
              left: left ? left : "0%",
              top: top ? top : "0%",
              right: right ? right : "0%",
              bottom: bottom ? bottom : "0%",
              paddingVertical: 0,
              backgroundColor: "#eee",
            }}
            isVisible={visible}
            onBackdropPress={() => setVisible(!visible)}
          >
            <View
              style={[
                styles.flexBetween,
                { padding: 10 },
                styles.responsiveDirection,
              ]}
            >
              <View
                style={[
                  styles.flexBetween,
                  { width: "60%" },
                  styles.responsiveDirection,
                ]}
              >
                {searchBy?.length > 0 && <Text> {t("searchBy")}: </Text>}

                {searchBy?.length > 0 ? (
                  searchBy.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setFilterBy(item)}
                    >
                      <Text
                        style={[
                          {
                            color: filterBy === item ? primaryColor : "#444",
                            fontWeight: filterBy === item ? "bold" : "400",
                          },
                        ]}
                      >
                        {t(item)}
                      </Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <></>
                )}
              </View>
              <View>
                <nativeElement.Button
                  style={{}}
                  onPress={() => setVisible(!visible)}
                  type="clear"
                  icon={
                    <nativeElement.Icon
                      name="close"
                      size={35}
                      type="ionicon"
                      color="#4E7D9B"
                    />
                  }
                />
              </View>
            </View>
            <View style={[styles.flexBetween]}>
              <nativeElement.Input
                onFocus={() => setSuggestions(data)}
                onPress={() => {
                  setSuggestions(data);
                }}
                leftIcon={
                  <nativeElement.Icon
                    name={"search"}
                    color="#4E7D9B"
                    size={25}
                    type="ionicon"
                  />
                }
                value={query}
                rightIcon={
                  <nativeElement.Icon
                    onPress={() => {
                      setQuery("");
                      setSuggestions([]);
                      pressHandler({});
                    }}
                    name="close"
                    size={25}
                    color="#4E7D9B"
                  />
                }
                placeholder={t(placeholder)}
                containerStyle={{
                  height: 43,
                  width: "100%",
                }}
                inputStyle={[
                  styles.responsiveTextDirection,
                  { color: "#4E7D9B" },
                ]}
                inputContainerStyle={[
                  styles.responsiveDirection,
                  styles.AuthInputContainerStyle,
                  {
                    height: 40,
                  },
                ]}
                onChangeText={(text) => onTextChanged(text)}
              />
            </View>
            <ScrollView
              style={[
                styles.responsiveTextDirection,
                {
                  width: "100%",
                  paddingVertical: 30,
                },
              ]}
            >
              {renderSuggestions()}
            </ScrollView>
          </nativeElement.Overlay>
        </View>
      </View>
    </View>
  );
}
