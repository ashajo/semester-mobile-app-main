import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { validateWorkspace } from "../../api/actions";
// import axios to create cancel token to pass to api/actions
import axios from "axios";
let source = axios.CancelToken.source();
let cancelToken = source.token;

import { UserContext } from "../../context";
import { DEFAULT_WORKSPACE, WORKSPACE_DOMAIN } from "../../utils/constants";
import { getCursorPosition } from "../../utils/getCursorPosition";

import { Overlay } from "../../components/";
import { LoadingScreen } from "../../components/Popups/";
import { buttonPrimary, buttonTextPrimary, errorText, fineprint, pageHeading, pageLeft, textInput, textInputError } from "../../styles";
import { defaultSpacing } from "../../styles/spacing";

export const FindWorkspaceScreen = ({ navigation }) => {
  const { updateUserCtx } = useContext(UserContext);

  const [workspace, setWorkspace] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [selection, setSelection] = useState();
  const [loading, setLoading] = useState(false);

  const onBlur = () => {
    if (workspace === DEFAULT_WORKSPACE || workspace === WORKSPACE_DOMAIN) {
      setWorkspace("");
    }
  };

  const inputHandler = (newValue) => {
    errorMessage && setErrorMessage(null);
    setWorkspace(newValue);
  };

  const cursorPosition = ({
    nativeEvent: {
      selection: { start },
    },
  }) => {
    setSelection(getCursorPosition(workspace, start));
  };

  const validateInput = () => {
    errorMessage && setErrorMessage(null);

    if (
      !workspace ||
      workspace === DEFAULT_WORKSPACE ||
      workspace === WORKSPACE_DOMAIN
    ) {
      setErrorMessage("Du måste ange din arbetsplats.");
    } else {
      checkWorkspace();
    }
  };

  const checkWorkspace = async () => {
    setLoading(true);

    try {
      const [isValid, payload] = await validateWorkspace(
        workspace,
        cancelToken
      );

      if (!isValid) {
        setErrorMessage(payload);
      } else {
        updateUserCtx("companyId", payload.id);
        updateUserCtx("workspace", payload.workspace);

        navigation.navigate("AddName");
      }
    } catch (error) {
      // handle error
    } finally {
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
              loadingMessage="Hämta arbetsplatsen..."
              cancelMessage="Avbryta hämtning"
              cancelRequest={cancelRequest}
            />
          </Overlay>
        )}

        <Text style={styles.heading}>Vart jobbar du?</Text>
        <Text style={styles.fineprint}>
          Fyll i din arbetsplats i rutan nedan
        </Text>

        <TextInput
          style={[styles.input, errorMessage && styles.error]}
          placeholder={DEFAULT_WORKSPACE}
          keyboardType="email-address"
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          value={workspace}
          onFocus={() => !workspace && setWorkspace(DEFAULT_WORKSPACE)}
          onBlur={onBlur}
          onChangeText={inputHandler}
          selection={selection}
          onSelectionChange={cursorPosition}
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
    paddingTop: 120,
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
