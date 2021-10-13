import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_USER } from "../../utils/constants";
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

import { UserContext } from "../../context";
import {
  basePage,
  buttonPrimary,
  buttonSecondary,
  buttonTextPrimary,
  buttonTextSecondary,
  centerAll,
  fineprint,
  pageHeading,
  textInput,
  textLink,
  textInputError,
  errorText,
} from "../../styles";
import { primary } from "../../styles/colors";
import {
  defaultSpacing,
  largeSpacing,
  narrowSpacing,
} from "../../styles/spacing";
import { DEFAULT_WORKSPACE } from "../../utils/constants";
import { checkIfFirstLaunch } from "../../api/validate";

const IMAGE_DIMENSION = 500 / 2;
const IMAGE_DIMENSION_SMALL = 500 / 4;
const IMAGE_MARGIN_TOP = 100;
const IMAGE_MARGIN_TOP_SMALL = 25;

export default function LoginScreen({ navigation }) {
  const { state: user, updateUserCtx } = useContext(UserContext);
  const [newUser, setNewUser] = useState(false);
  const [imageStyle, setImageStyle] = useState(styles.img);

  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(null);
  const [workspace, setWorkspace] = useState("");
  const [errorWorkspace, setErrorWorkspace] = useState(null);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setImageStyle(styles.imgSmall);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setImageStyle(styles.img);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    const check = async () => {
      try {
        await AsyncStorage.setItem(APP_USER, JSON.stringify(user));
        navigation.navigate("UserHome");
      } catch {
        return [false, "Could not save user to local storage."];
      }
    };

    if (user.signedIn) {
      check();
    }
  }, [user.signedIn]);

  const reloadScreen = () => {
    setEmail(null);
    setWorkspace(null);
    setNewUser(true);
  };

  const onEmailFocus = () => {
    errorEmail && setErrorEmail(null);

    if (!newUser && !email) {
      setEmail(user.email);
    }
  };

  const onWorkspaceFocus = () => {
    errorWorkspace && setErrorWorkspace(null);

    if (!newUser && !workspace) {
      setWorkspace(user.workspace);
    }
  };

  const inputHandler = (setter, newValue) => {
    if (setter === "email") {
      setEmail(newValue);
      errorEmail && setEmail(null);
    } else {
      setWorkspace(newValue);
      errorWorkspace && setWorkspace(null);
    }
  };

  const onSubmit = async () => {
    validateEmail();
    validateWorkspace();

    // allow logins from same user whose details are stored on the phone
    if (email === user.email && workspace === user.workspace) {
      updateUserCtx("signedIn", true);
    } else {
      setErrorWorkspace("Du har angett fel epost eller arbetsplats.");
      // todo:
      // check if the user exists and log in with those user details.
      // Updating the user details stored on the phone.
    }
  };

  const validateEmail = () => {
    errorEmail && setErrorEmail(null);

    const reg = /^\S+@\S+\.\S+$/;

    if (!email) {
      setErrorEmail("Du måste fylla i din e-postadress.");
    } else if (!reg.test(email)) {
      setErrorEmail("Ange en giltig e-postadress.");
    }
  };

  const validateWorkspace = () => {
    if (workspace !== user.workspace) {
      setErrorWorkspace("Vill du byta arbetsplats? Tryck på knappen nedan.");
    }
  };

  const switchWorkspace = () => {
    // todo:
    // should reset everything and return user to onboarding screens
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.page}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image
            source={{
              uri: "https://terisandstedt.com/sa-images/login-img.png",
            }}
            style={imageStyle}
          />

          <Text style={styles.heading}>
            {newUser ? "Välkommen!" : "Välkommen tillbacka!"}
          </Text>
          <Text style={styles.fineprint}>Logga in på ditt konto</Text>

          <TextInput
            style={[styles.input, errorEmail && styles.error]}
            placeholder={newUser ? "Epostadress" : `${user.email}`}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={(newValue) => inputHandler("email", newValue)}
            onFocus={onEmailFocus}
            onSubmitEditing={validateEmail}
          />
          {errorEmail && <Text style={styles.errorText}>{errorEmail}</Text>}

          <TextInput
            style={[styles.input, errorWorkspace && styles.error]}
            placeholder={newUser ? DEFAULT_WORKSPACE : `${user.workspace}`}
            keyboardType="email-address"
            autoCompleteType="off"
            autoCapitalize="none"
            autoCorrect={false}
            value={workspace}
            onChangeText={(newValue) => inputHandler("workspace", newValue)}
            onFocus={onWorkspaceFocus}
            onSubmitEditing={validateWorkspace}
          />
          {errorWorkspace && (
            <Text style={styles.errorText}>{errorWorkspace}</Text>
          )}

          {newUser ? null : (
            <TouchableOpacity style={styles.textLink} onPress={reloadScreen}>
              <Text>Inte {user.firstName}?</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>Anslut</Text>
          </TouchableOpacity>

          {newUser ? null : (
            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={switchWorkspace}
            >
              <Text style={styles.buttonTextSecondary}>Byt arbetsplats</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: {
    ...basePage,
  },
  inner: {
    ...centerAll,
  },
  img: {
    marginTop: IMAGE_MARGIN_TOP,
    height: IMAGE_DIMENSION,
    width: IMAGE_DIMENSION,
  },
  imgSmall: {
    marginTop: IMAGE_MARGIN_TOP_SMALL,
    height: IMAGE_DIMENSION_SMALL,
    width: IMAGE_DIMENSION_SMALL,
  },
  heading: {
    ...pageHeading,
    color: primary,
  },
  fineprint: {
    ...fineprint,
    marginVertical: defaultSpacing,
  },
  input: {
    ...textInput,
    marginVertical: narrowSpacing,
  },
  error: {
    ...textInputError,
  },
  errorText: {
    ...errorText,
    alignSelf: "flex-start",
  },
  textLink: {
    ...textLink,
    marginBottom: largeSpacing,
  },
  button: {
    ...buttonPrimary,
    marginVertical: narrowSpacing,
  },
  buttonText: {
    ...buttonTextPrimary,
  },
  buttonSecondary: {
    ...buttonSecondary,
    marginVertical: narrowSpacing,
  },
  buttonTextSecondary: {
    ...buttonTextSecondary,
  },
});
