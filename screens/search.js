import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import isValidABN from "is-valid-abn";
import axios from "axios";
import { useNavigate } from "react-router-native";
import {
  Provider as PaperProvider,
  Colors,
  Searchbar,
  Title,
  Modal,
  Portal,
  Button,
} from "react-native-paper";
import { ABN_LOOKUP_URL, API_GUID } from "@env";

export function Search({
  setResultsList,
  searchString,
  setSearchString,
  setEntityName,
}) {
  const [isValid, setIsValid] = useState(undefined);
  const [is11Chars, setIs11Chars] = useState(false);
  const [searchNumber, setSearchNumber] = useState(searchString);
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const handleOnChange = async (e) => {
    setIs11Chars(e.nativeEvent.text.replace(/\s/g, "").length == 11);
    if (isValidABN(e.nativeEvent.text)) {
      setSearchNumber(e.nativeEvent.text);
      setIsValid(true);
      setSearchString(e.nativeEvent.text);
    } else {
      setIsValid(false);
      setResultsList([""]);
      setEntityName("");
    }
    if (!e.nativeEvent.text) {
      setIsValid(undefined);
      setIs11Chars(undefined);
    }
  };

  const handleSearch = () => {
    if (isValid) {
      setEntityName("");
      setResultsList([]);
      ABNLookup(searchNumber);
      navigate("/Results");
    } else {
      showModal();
    }
  };

  useEffect(() => {
    if (searchString) {
      setIsValid(isValidABN(searchString));
      setIs11Chars(searchString.replace(/\s/g, "").length == 11);
    } else {
      setIsValid(undefined);
      setIs11Chars(undefined);
    }
  }, [searchString, setIsValid, isValidABN, setIs11Chars]);

  const ABNLookup = async (ABN) => {
    const response = await axios.get(
      `${ABN_LOOKUP_URL}?guid=${API_GUID}&abn=${ABN}`
    );
    const parsedSlicedData = JSON.parse(
      response.data.slice(9, response.data.length - 1)
    );
    const uniqueBusinessNames = [...new Set(parsedSlicedData.BusinessName)];
    setEntityName(parsedSlicedData.EntityName);
    setResultsList(uniqueBusinessNames);
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#348",
      width: "100%",
      borderWidth: 1,
      height: "100%",
    },
    ScrollView: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 15,
      borderColor: "black",
      borderWidth: 1,
      minHeight: "100%",
    },
    horizontalBox: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
    },
    validMessage: {
      color: !is11Chars
        ? Colors.amber500
        : isValid
        ? Colors.green400
        : Colors.red400,
      fontSize: 20,
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: 50,
      backgroundColor: "white",
    },
    buttonText: {
      color: "black",
    },
    modalButtonText: {
      color: "white",
    },
    Title: {
      marginTop: 40,
      marginBottom: 20,
      color: "white",
      fontSize: 30,
      fontWeight: "bold",
    },
    textInput: {
      borderColor: "gray",
      width: "90%",
      marginVertical: 10,
      height: 50,
    },
    businessNames: {
      display: "flex",
      alignItems: "flex-start",
      width: "90%",
      marginTop: 20,
      marginBottom: 50,
    },
    h2: {
      color: "white",
      fontSize: 20,
      marginTop: 10,
    },
    listText: {
      color: Colors.amber500,
    },
    ActivityIndicator: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginLeft: -30,
      marginTop: -30,
      width: 60,
      height: 60,
    },
    modal: {
      backgroundColor: "white",
      width: 300,
      marginTop: -80,
      height: 160,
      marginLeft: -150,
      padding: 30,
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      top: "50%",
      left: "50%",
      alignItems: "center",
      borderRadius: 15,
    },
    modalButton: {
      backgroundColor: "#348",
    },
  });

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <ScrollView
          contentContainerStyle={styles.ScrollView}
          keyboardShouldPersistTaps="handled"
        >
          <Title style={styles.Title}>ABN Lookup</Title>
          <Searchbar
            onSubmitEditing={handleSearch}
            style={styles.textInput}
            placeholder="Type an ABN here"
            onChange={handleOnChange}
            defaultValue={searchString}
          />
          <Text style={styles.validMessage}>
            {!is11Chars
              ? is11Chars != undefined && "ABN must be 11 characters"
              : isValid
              ? "ABN is valid"
              : isValid !== undefined && "ABN is not valid"}
          </Text>
          <View style={styles.businessNames}>
            <Button
              onPress={handleSearch}
              title="Search"
              style={styles.button}
              mode="outlined"
            >
              <Text style={styles.buttonText}>Search</Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Portal style={styles.portal}>
        <Modal style={styles.modal} visible={visible}>
          <Text style={{ marginBottom: 20 }}>Please enter a valid ABN</Text>
          <Button
            mode="outlined"
            style={styles.modalButton}
            onPress={hideModal}
          >
            <Text style={styles.modalButtonText}>OK</Text>
          </Button>
        </Modal>
      </Portal>
    </PaperProvider>
  );
}
