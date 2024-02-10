import { Dialog, Text } from "@rneui/themed";
import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";

type Props = {
  isVisible: boolean;
  isLoading: boolean;
  isError: boolean;
  title: string;
  information?: string;
  onBackdropPress: () => void;
  onPressError: () => void;
  onPressSuccess: () => void;
};

const RequestResultDialog = ({
  isVisible,
  isLoading,
  isError,
  title,
  information,
  onPressError,
  onPressSuccess,
  onBackdropPress,
}: Props) => {
  if (isLoading)
    return (
      <Dialog isVisible={true}>
        <Dialog.Loading />
      </Dialog>
    );

  return (
    <Dialog isVisible={isVisible} onBackdropPress={onBackdropPress}>
      {isError ? (
        <>
          <Dialog.Title title="요청 실패" titleStyle={styles.dialogTitle} />
          <Text style={styles.information}>서버에 대한 요청 실패</Text>
          <Text style={styles.information}>
            구글 플레이스토어에 오류 제보 부탁드립니다.
          </Text>
          <Dialog.Actions>
            <Dialog.Button
              title="확인"
              titleStyle={styles.buttonTitle}
              onPress={onPressError}
            />
          </Dialog.Actions>
        </>
      ) : (
        <>
          <Dialog.Title title={title} titleStyle={styles.dialogTitle} />
          <Text style={styles.information}>{information}</Text>
          <Dialog.Actions>
            <Dialog.Button
              title="확인"
              titleStyle={styles.buttonTitle}
              onPress={onPressSuccess}
            />
          </Dialog.Actions>
        </>
      )}
    </Dialog>
  );
};

export default RequestResultDialog;

const styles = StyleSheet.create({
  dialogTitle: {
    fontFamily: "Pretendard 600",
    fontWeight: "600",
  },

  information: {
    fontFamily: "Pretendard 600",
    fontWeight: "600",
    color: "#979797",
  },

  buttonTitle: {
    fontFamily: "Pretendard 500",
    fontWeight: "500",
  },
});
