import { checkDuplicate, signup } from "@api/auth";
import RequestResultDialog from "@components/RequestResultDialog";
import { useNavigation } from "@react-navigation/native";
import { Button, Input } from "@rneui/base";
import axios from "axios";
import { produce } from "immer";
import format from "pretty-format";
import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
type FormData = {
  userId: string;
  password: string;
  passwordConfirm: string;
  nickname: string;

  userIdValidated: boolean;
  nicknameValidated: boolean;
};

/**
 * 폼 데이터 외 validation 데이터
 */
type AdditionalValidationData = {
  userId: boolean;
  nickname: boolean;
};

type AdditionalValidationDataKeys = keyof AdditionalValidationData;

const SignUpForm = () => {
  const { goBack } = useNavigation();

  /**
   * 아이디 중복확인, 닉네임 중복확인 여부
   */
  const initalState: AdditionalValidationData = {
    userId: false,
    nickname: false,
  };

  const [duplicateChecked, setDuplicateChecked] = useState(initalState);

  /**
   * 회원가입 요청, 중복확인 요청 관련 state
   */
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { control, setError, handleSubmit, getValues, trigger, reset } =
    useForm<FormData>({
      defaultValues: {
        userId: "",
        password: "",
        passwordConfirm: "",
        nickname: "",
      },
      mode: "all",
    });

  /**
   *
   * @param valueName input type -> userId or nickname
   * @param text      input text
   * @param onChange  callback from useForm's Controller
   *
   * 아이디, 닉네임 중복확인은 input 값이 기존과 달라질 경우 다시 진행해야 하므로
   * 해당 함수가 호출될 때마다 valueName에 해당하는 duplicateCheck 값을 false로 전환
   */
  const onChangeCheckDuplicateText = (
    valueName: AdditionalValidationDataKeys,
    text: string,
    onChange: (value: any) => void
  ) => {
    setDuplicateChecked(
      produce((draft) => {
        draft[valueName] = false;
      })
    );
    onChange(text);
  };

  /**
   * @param valueName input type -> 중복확인을 진행할 input의 타입
   *
   * 중복확인 전 해당 input의 value가 공백이 아닌지 검증
   * 이후 중복확인 요청 진행
   */
  const onSubmitCheckDuplicate = async (
    valueName: AdditionalValidationDataKeys
  ) => {
    if (getValues(valueName) === "") {
      setError(valueName, { type: "required" });
      return;
    }

    try {
      setIsLoading(true);
      const response = await checkDuplicate(valueName, getValues(valueName));
      console.log(format(response));

      setDuplicateChecked((prev) => ({ ...prev, [valueName]: true }));
      trigger(valueName);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        switch (valueName) {
          case "userId":
            setError("userId", {
              type: "duplicatedUserId",
              message: "중복된 아이디입니다.",
            });
            break;
          case "nickname":
            setError("nickname", {
              type: "duplicatedNickname",
              message: "중복된 닉네임입니다.",
            });
            break;
          default:
            break;
        }
      } else {
        // 서버 오류로 인할경우
        setIsError(true);
        setDialogVisible(true);
      }
      setDuplicateChecked((prev) => ({ ...prev, [valueName]: false }));
    }
    setIsLoading(false);
  };

  const onSubmit = async (data: FormData) => {
    setDialogVisible(true);
    const { passwordConfirm, ...signupRequest } = data;
    try {
      setIsLoading(true);
      await signup(signupRequest);
      setIsError(false);
    } catch (err) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const onPressSuccess = useCallback(() => {
    setDialogVisible(false);
    goBack();
  }, []);

  const onPressError = useCallback(() => {
    setDialogVisible(false);
    setDuplicateChecked(initalState);
    reset();
  }, []);

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <Controller
          name="userId"
          control={control}
          rules={{
            required: "아이디를 입력해주세요.",
            pattern: {
              value: /^[a-z0-9_-]{5,20}$/,
              message:
                "아이디는 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.",
            },
            validate: {
              duplicateCheckRequired: () =>
                duplicateChecked.userId
                  ? true
                  : "아이디 중복확인이 필요합니다.",
            },
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              value={value}
              onChangeText={(text) =>
                onChangeCheckDuplicateText("userId", text, onChange)
              }
              maxLength={20}
              inputContainerStyle={styles.input}
              inputStyle={styles.inputText}
              label="아이디 *"
              labelStyle={styles.inputLabel}
              errorMessage={error?.message}
              rightIcon={
                <Button
                  title={duplicateChecked.userId ? "확인완료" : "중복확인"}
                  buttonStyle={styles.duplicateButton}
                  titleStyle={styles.duplicateButtonTitle}
                  onPress={() => onSubmitCheckDuplicate("userId")}
                  disabled={duplicateChecked.userId}
                  disabledStyle={styles.disabledButton}
                  disabledTitleStyle={styles.disabledButtonTitle}
                />
              }
            />
          )}
        />
        <Controller
          name="nickname"
          control={control}
          rules={{
            required: "닉네임을 입력해주세요. 닉네임은 2~12자 허용됩니다.",
            minLength: {
              value: 2,
              message: "닉네임은 최소 2자입니다.",
            },
            validate: {
              duplicateCheckRequired: () =>
                duplicateChecked.nickname
                  ? true
                  : "닉네임 중복확인이 필요합니다.",
            },
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              value={value}
              onChangeText={(text) =>
                onChangeCheckDuplicateText("nickname", text, onChange)
              }
              maxLength={12}
              inputContainerStyle={styles.input}
              inputStyle={styles.inputText}
              label="닉네임 *"
              labelStyle={styles.inputLabel}
              errorMessage={error?.message}
              rightIcon={
                <Button
                  title={duplicateChecked.nickname ? "확인완료" : "중복확인"}
                  buttonStyle={styles.duplicateButton}
                  titleStyle={styles.duplicateButtonTitle}
                  onPress={() => onSubmitCheckDuplicate("nickname")}
                  disabled={duplicateChecked.nickname}
                  disabledStyle={styles.disabledButton}
                  disabledTitleStyle={styles.disabledButtonTitle}
                />
              }
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: "비밀번호를 입력해주세요.",
            maxLength: 20,
            pattern: {
              value:
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':",./<>?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':",./<>?]{8,16}$/,
              message:
                "8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.",
            },
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              maxLength={16}
              inputContainerStyle={styles.input}
              inputStyle={styles.inputText}
              label="비밀번호 *"
              secureTextEntry={true}
              labelStyle={styles.inputLabel}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="passwordConfirm"
          control={control}
          rules={{
            required: "비밀번호 확인이 필요합니다.",
            validate: {
              isEqualWithPassword: (value, formValues) =>
                value === formValues.password
                  ? true
                  : "비밀번호와 일치하지 않습니다.",
            },
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              secureTextEntry={true}
              value={value}
              placeholder="비밀번호 확인"
              onChangeText={onChange}
              maxLength={16}
              inputContainerStyle={styles.input}
              inputStyle={styles.inputText}
              errorMessage={error?.message}
            />
          )}
        />
      </View>
      <Button
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        title={"회원가입"}
        titleStyle={styles.buttonTitle}
        onPress={handleSubmit(onSubmit)}
      />

      <RequestResultDialog
        isVisible={dialogVisible}
        isLoading={isLoading}
        isError={isError}
        title="회원가입 완료"
        information="회원가입 성공, 확인을 누르면 로그인 화면으로 이동합니다."
        onPressError={onPressError}
        onPressSuccess={onPressSuccess}
        onBackdropPress={() => setDialogVisible(false)}
      />
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  inputContainer: { width: "100%" },
  input: {
    height: hp("6%"),
    borderWidth: 0,
    borderRadius: 4,
    borderColor: "#E4E4E4",

    backgroundColor: "#F5F5F5",

    paddingLeft: 8,
  },
  inputLabel: {
    paddingBottom: 4,

    fontFamily: "Pretendard 600",
    color: "#BDBDBD",
  },
  inputText: {
    fontFamily: "Pretendard 600",
    fontSize: 16,
  },
  buttonContainer: {
    width: "95%",
    marginTop: "auto",
    marginBottom: hp("4%"),
    borderRadius: 4,
  },
  duplicateButton: {
    backgroundColor: "#E0E0E0",
  },
  duplicateButtonTitle: {
    fontFamily: "Pretendard 600",
    color: "#9E9E9E",
  },
  button: {
    backgroundColor: "#979797",
  },
  buttonTitle: {
    fontFamily: "Pretendard 600",
  },
  disabledButton: {
    backgroundColor: "#263238",
  },
  disabledButtonTitle: {
    color: "#F5F5F5",
  },
});
