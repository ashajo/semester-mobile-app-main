import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { StackActions } from "@react-navigation/native";

import { isEmailAvailable, registerUser } from "../../api/actions";
// import axios to create cancel token to pass to api/actions
import axios from "axios";
let source = axios.CancelToken.source();
let cancelToken = source.token;

import { UserContext } from "../../context";
import { Overlay } from "../../components/";
import { LoadingScreen } from "../../components/Popups/";
import { buttonPrimary, buttonTextPrimary, errorText, fineprint, pageHeading, pageLeft, textInput, textInputError } from "../../styles";
import { defaultSpacing } from "../../styles/spacing";

export const AddEmailScreen = ({ navigation }) => {
  const { state: user, updateUserCtx } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputHandler = (newValue) => {
    setEmail(newValue);
    errorMessage && setErrorMessage(null);
  };

  const validateInput = () => {
    errorMessage && setErrorMessage(null);

    const reg = /^\S+@\S+\.\S+$/;

    if (!email) {
      setErrorMessage("Du måste fylla i din e-postadress.");
    } else if (!reg.test(email)) {
      setErrorMessage("Ange en giltig e-postadress.");
    } else {
      checkEmail();
    }
  };

  const checkEmail = async () => {
    setLoading(true);
    const [isAvailable, message] = await isEmailAvailable(email, cancelToken);

    if (isAvailable) {
      updateUserCtx("email", email);
    } else {
      setErrorMessage(message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email) {
      registerNewUser();
    }
  }, [user.email]);

  const registerNewUser = async () => {
    const [userIsRegistered, payload] = await registerUser(user);

    if (userIsRegistered) {
      updateUserCtx("init", payload);

      navigation.dispatch(StackActions.replace("UserHome"));
    } else {
      setErrorMessage(payload);
      setLoading(false);
    }
  };

  const cancelRequest = () => {
    source.cancel();
    source = axios.CancelToken.source();
    cancelToken = source.token;
    setLoading(false);
    setErrorMessage(null);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.page}>
        {loading && (
          <Overlay close={cancelRequest}>
            <LoadingScreen
              loadingMessage="Skapa konto..."
              cancelMessage="Avbryta hämtning"
              cancelRequest={cancelRequest}
            />
          </Overlay>
        )}

        <Text style={styles.heading}>E-postadress</Text>
        <Text style={styles.fineprint}>Fyll i din e-post i rutan nedan</Text>

        <TextInput
          style={[styles.input, errorMessage && styles.error]}
          placeholder="E-postadress"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={inputHandler}
          onSubmitEditing={validateInput}
        />
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

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
