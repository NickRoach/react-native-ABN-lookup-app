import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  View,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useNavigate } from "react-router-native";
import {
  Provider as PaperProvider,
  Colors,
  Title,
  Button,
} from "react-native-paper";

export function Results({ resultsList, entityName }) {
  const styles = StyleSheet.create({
    view: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    container: {
      backgroundColor: "#348",
      width: "100%",
      height: "100%",
      alignItems: "center",
    },
    ScrollView: {
      width: "100%",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      paddingBottom: 15,
      paddingHorizontal: 5,
    },
    horizontalBox: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      width: Dimensions.get("window").width * 0.9,
      height: 50,
      marginTop: 30,
      backgroundColor: "white",
    },
    buttonText: {
      color: "black",
      width: "100%",
    },
    Title: {
      marginTop: 40,
      marginBottom: 20,
      color: "white",
      fontSize: 30,
      fontWeight: "bold",
    },
    businessNames: {
      display: "flex",
      alignItems: "flex-start",
      width: "90%",
      marginTop: 20,
    },
    h2: {
      color: "white",
      fontSize: 20,
      marginTop: 10,
    },
    listText: {
      color: Colors.amber500,
      textAlign: "center",
    },
    ActivityIndicator: {
      width: 60,
      height: 60,
    },
  });

  const navigate = useNavigate();

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <Title style={styles.Title}>Results</Title>
        <ScrollView
          contentContainerStyle={styles.ScrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.view}>
            <Text style={styles.h2}>Entity name:</Text>
            {entityName ? (
              <Text style={styles.listText}>{entityName}</Text>
            ) : (
              <ActivityIndicator
                style={styles.ActivityIndicator}
                color="white"
                size="large"
              />
            )}
            <Text style={styles.h2}>Registered business names:</Text>
            {entityName ? (
              resultsList[0] ? (
                resultsList.map((result) => {
                  return (
                    <Text style={styles.listText} key={result}>
                      {result}
                    </Text>
                  );
                })
              ) : (
                <Text style={styles.listText}>
                  No business names registered to this ABN
                </Text>
              )
            ) : (
              <ActivityIndicator
                style={styles.ActivityIndicator}
                color="white"
                size="large"
              />
            )}
            <Button
              title="Back to search"
              style={styles.button}
              mode="outlined"
              onPress={() => navigate("/")}
            >
              <Text style={styles.buttonText}>Back to Search</Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}
