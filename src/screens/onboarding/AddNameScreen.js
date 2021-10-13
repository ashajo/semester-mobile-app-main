import React, { useState, useContext, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { UserContext } from "../../context";
import { buttonPrimary, buttonTextPrimary, errorText, fineprint, pageHeading, pageLeft, textInput, textInputError } from "../../styles";
import { defaultSpacing } from "../../styles/spacing";

export const AddNameScreen = ({ navigation }) => {
  const { updateUserCtx } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [errorFirstName, setErrorFirstName] = useState(false);

  const [lastName, setLastName] = useState("");
  const [errorLastName, setErrorLastName] = useState(false);
  const lastNameRef = useRef();

  const inputHandler = (setter, newValue) => {
    if (setter === "firstName") {
      setFirstName(newValue);
      errorFirstName && setErrorFirstName(null);
    } else {
      setLastName(newValue);
      errorLastName && setErrorLastName(null);
    }
  };

  const validateInput = () => {
    const firstNameInvalidLength = firstName.length < 2 || firstName.length > 30;
    const lastNameInvalidLength = lastName.length < 2 || lastName.length > 30;

    if (!firstName || !lastName) {
      !firstName && setErrorFirstName("Du måste fylla i förnamn");
      !lastName && setErrorLastName("Du måste fylla i efternamn");
    } else if (firstNameInvalidLength || lastNameInvalidLength) {
      firstNameInvalidLength &&
        setErrorFirstName("Förnamn måste vara mellan 2 och 30 bokstäver.");
      lastNameInvalidLength &&
        setErrorLastName("Efternamn måste vara mellan 2 och 30 bokstäver.");
    } else {
      updateUserCtx("firstName", firstName);
      updateUserCtx("lastName", lastName);
      
      navigation.navigate("AddEmail");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.page}>
        <Text style={styles.heading}>Vad heter du?</Text>
        <Text style={styles.fineprint}>Fyll i ditt namn i rutorna nedan</Text>

        <TextInput
          style={[styles.input, errorFirstName && styles.error]}
          placeholder="Förnamn"
          autoCorrect={false}
          value={firstName}
          onChangeText={(newValue) => inputHandler("firstName", newValue)}
          returnKeyType="next"
          onSubmitEditing={() => lastNameRef.current.focus()}
        />
        {errorFirstName && (
          <Text style={styles.errorText}>{errorFirstName}</Text>
        )}

        <TextInput
          style={[styles.input, errorLastName && styles.error]}
          ref={lastNameRef}
          placeholder="Efternamn"
          autoCorrect={false}
          value={lastName}
          onChangeText={(newValue) => inputHandler("lastName", newValue)}
          onSubmitEditing={validateInput}
        />
        {errorLastName && <Text style={styles.errorText}>{errorLastName}</Text>}

        <TouchableOpacity style={styles.button} onPress={validateInput}>
          <Text style={styles.buttonText}>Fortsätt</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  page: {
    ...pageLeft,
  },
  heading: {
    ...pageHeading,
  },
  fineprint: {
    ...fineprint,
    marginVertical: defaultSpacing,
  },
  input: {
    ...textInput,
    marginVertical: defaultSpacing,
  },
  error: {
    ...textInputError,
  },
  errorText: {
    ...errorText,
  },
  button: {
    ...buttonPrimary,
    marginVertical: defaultSpacing,
  },
  buttonText: {
    ...buttonTextPrimary,
  },
});
