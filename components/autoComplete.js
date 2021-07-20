import {
  React,
  useSelector,
  useDispatch,
  useState,
  globalStyle,
  nativeElement,
} from "../utils/allImports";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  useWindowDimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
export default function AutocompleteSearch({
  data,
  query,
  setQuery,
  placeholder,
  searchElement,
  name,
  pressHandler,
}) {
  const [closeSearchList, setCloseSearchList] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const onTextChanged = (value) => {
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions =
        data.sort().filter((v) => regex.test(v[searchElement])).length > 0
          ? data.sort().filter((v) => regex.test(v[searchElement]))
          : [{ [searchElement]: "Not found..." }];
    }
    setSuggestions(suggestions);
  };
  const suggestionSelected = (value, searchQeury) => {
    setQuery(searchQeury);
    setSuggestions([]);
    if (pressHandler) {
      pressHandler(value);
    }
  };
  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return suggestions.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={styles.searchListStyle}
        onPress={() => suggestionSelected(item, item[searchElement])}
      >
        <nativeElement.Divider
          orientation="horizontal"
          width={1}
          style={{ paddingVertical: 0, marginTop: 0 }}
        />
        <View style={{ padding: 15 }}>
          {name && item[searchElement] !== "Not found..." ? (
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
            {item[searchElement]}
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
  const { t } = useTranslation();
  return (
    <View style={[styles.autocompleteWrapper, { zIndex: 10000 }]}>
      <View style={styles.autocompleteContainerView}>
        <View
          style={[
            styles.autocompleteContainer,
            { position: "relative", backgroundColor: "white" },
          ]}
        >
          <TextInput
            onFocus={() => setSuggestions(data)}
            onPress={() => setSuggestions(data)}
            onBlur={() => {
              let timeout = setTimeout(() => setSuggestions([]), 1000);
              return () => clearTimeout(timeout);
            }}
            style={styles.autoCompleteInput}
            onChangeText={(text) => {
              onTextChanged(text);
              setQuery(text);
            }}
            value={query}
            placeholder={placeholder}
          />
          <ScrollView
            style={{
              width: "100%",
              maxHeight: name ? 213 : 150,
              position: "absolute",
              backgroundColor: "white",
              top: 55,
            }}
          >
            {renderSuggestions()}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
