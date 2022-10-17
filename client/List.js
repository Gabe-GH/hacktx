import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, details }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.details}>SUS SCORE: {details}</Text>
  </View>
);

// the filter
const List = ({ searchPhrase, setClicked, data }) => {
  const renderItem = ({ item }) => {
    // for (const prop in item){
    //     return <Item name={item.appName} details={item.maxSimilarityRatio} />;
    // }
    // when no input, show all
    // if (searchPhrase === "") {
    //   return <Item name={item.appName} details={item.maxSimilarityRatio} />;
    // }
    // filter of the name
      return <Item name={item.appName} details={item.maxSimilarityRatio} />;

  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.appName}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});
