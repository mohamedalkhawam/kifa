import {
  React,
  useSelector,
  useDispatch,
  useState,
  globalStyle,
  useEffect,
  primaryColor,
  Loader,
  secondaryColor,
  _objI,
} from "../utils/allImports";
import { useTranslation } from "react-i18next";
import { View, Text, ScrollView, Animated } from "react-native";
import Header from "../components/header";
import Autocomplete from "../components/autoComplete";
import { readCustomers } from "../redux/actions/customers";
import CustomersCard from "../components/cusomersCard";
export default function Customers({ navigation }) {
  const styles = globalStyle();
  const { t } = useTranslation();
  const customersReducer = useSelector((state) => state.customersReducer);
  const authReducer = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [searchObject, setSearchObject] = useState({});
  useEffect(() => {
    dispatch(readCustomers(authReducer.token));
  }, []);

  if (authReducer.loading || customersReducer.loading) {
    return <Loader bgc={secondaryColor} color={primaryColor} />;
  } else {
    return (
      <View styles={styles.container}>
        <Header
          headerText={"customers"}
          navigation={navigation}
          iconType={"person"}
        />
        <Autocomplete
          data={
            customersReducer.customers.length > 0
              ? customersReducer.customers
              : []
          }
          setQuery={setQuery}
          query={query}
          searchElement={"reference_id"}
          renderedData={""}
          placeholder={t("Search...")}
          name={"name"}
          pressHandler={setSearchObject}
        />
        <ScrollView
          style={[
            {
              paddingTop: -5,
              paddingHorizontal: 20,
              width: "100%",
            },
          ]}
        >
          {query && query.length > 0 ? (
            <CustomersCard
              id={searchObject.id}
              name={searchObject.name}
              phone={searchObject.phone}
              email={searchObject.email}
              // national_id={searchObject.national_id}
              // reference_id={searchObject.reference_id}
              notes={searchObject.notes_en || searchObject.notes_ar}
              // payment_method={searchObject.payment_method}
              navigation={navigation}
              customer={searchObject}
              index={0}
            />
          ) : (
            customersReducer.customers.map((item, index) => (
              <CustomersCard
                key={index}
                id={item.id}
                name={item.name}
                phone={item.phone}
                // email={item.email}
                // national_id={item.national_id}
                // reference_id={item.reference_id}
                notes={item.notes_en || item.notes_ar}
                // payment_method={item.payment_method}
                navigation={navigation}
                index={index}
                customer={item}
                pressHandler={setSearchObject}
              />
            ))
          )}
          <View style={{ padding: 150 }}></View>
        </ScrollView>
        <View style={{ padding: 20 }}></View>
      </View>
    );
  }
}
